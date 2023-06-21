const express = require("express");
const axios = require('axios');

const { Client } = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi, OpenAIApiAxiosParamCreator } = require("openai");
const path = require("path");

const fs = require('fs');
const https = require('https');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const configurationImage = new Configuration({
  apiKey: process.env.OPENAI_API_KEY_IMAGE,
});
const configurationText = new Configuration({
  apiKey: process.env.OPENAI_API_KEY_TEXT,
});


const openaiText = new OpenAIApi(configurationImage);
const openaiImage = new OpenAIApi(configurationText);


const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL database:", error);
  });

// Set Content Security Policy (CSP)
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "img-src 'self' data:; default-src 'self'");
  next();
});


// Routes
app.get("/", (req, res) => {
  return res.status(200).send("Server is up");
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: "Bad Request!!!" });
  }

  // Check the login credentials against the database
  const query = "SELECT * FROM Users WHERE email = $1 AND password = $2";
  const values = [email, password];
  const result = await client.query(query, values);

  if (result.rowCount === 1) {
    const user = result.rows[0];
    return res.status(200).json({ message: "Login successful", user: { username: user.username } });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.status(400).send("Bad Request!!!");
  }

  // Check if the email is already registered
  const query = "SELECT * FROM Users WHERE email = $1";
  const values = [email];
  const result = await client.query(query, values);

  if (result.rowCount === 0) {
    const insertQuery = "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)";
    const insertValues = [username, email, password];
    await client.query(insertQuery, insertValues);

    return res.status(201).send("Registration successful");
  } else {
    return res.status(409).send("Email already exists");
  }
});

// AI
app.get("/generate", (req, res) => {
  return res.status(405).send("Method Not Allowed");
});

// Themes
app.get('/themes', async (req, res) => {
  const result = await client.query('SELECT * FROM Themes;');
  return res.status(200).send(result.rows);
});

// get images based on user email 
app.get("/user/favorite", async (req, res) => {
  const { userName } = req.query;

  if (!userName) {
    return res.status(400).send("Missing username!");
  }

  const user = await client.query('SELECT id FROM Users WHERE username = $1', [userName]);

  if (user.rows.length === 0) {
    return res.status(404).send("User not found!");
  }

  const favorites = await client.query('SELECT image_url FROM Favorites WHERE username = $1', [userName]);

  res.status(200).json(favorites.rows);
});

// get ALL images by most recently generated
app.get("/explore", async (req, res) => {
  const images = await client.query('SELECT image_url FROM Images ORDER BY created_at DESC');
  res.status(200).json(images.rows);
});

//download images
app.get("/download", async (req, res) => {
  const { imageUrl } = req.query;
  const response = await axios.get(imageUrl, {
    responseType: 'blob',
  });
  res.setHeader('Content-Type', response.headers['content-type']);
  res.setHeader('Content-Disposition', 'attachment; filename="image.png"');
  res.send(response.data);
});

//post for saving image urls to favorites by email
app.post("/user/favorite", async (req, res) => {
  const { url, userName } = req.body;

  if (!url || !userName) {
    return res.status(400).send("Missing URL or username!");
  }
  const user = await client.query('SELECT id FROM Users WHERE username = $1', [userName]);

  if (user.rows.length === 0) {
    return res.status(404).send("User not found!");
  }

  const insertQuery = "INSERT INTO Favorites (image_url, username) VALUES ($1, $2)";
  const insertValues = [url, userName];
  await client.query(insertQuery, insertValues);
  res.status(200).send("Image saved to favorites!");
});

app.post("/generate", async (req, res) => {
  const { prompt, size } = req.body;

  if (!prompt || !size) {
    return res.status(400).send("Bad Request!!!");
  }
  const response = await openaiImage.createImage({
    prompt,
    size,
    n: 1,
  });
  const image_url = response.data.data[0].url;
  const filename = "test";

  https.get(image_url, (response) => {
    response.pipe(fs.createWriteStream('./public/' + filename + '.png'));
  });

  const insertQuery = "INSERT INTO Images (image_url, created_at) VALUES ($1, NOW())";
  await client.query(insertQuery, [image_url]);

  return res.status(200).send({
    src: image_url,
    image: filename + ".png"
  });
});

app.post('/hashtags', async (req, res) => {
  const { prompt, keywords } = req.body;

  const response = await openaiText.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate hashtags for ${keywords}`,
    max_tokens: 100,
  });

  const { choices } = response.data;
  const generatedText = choices[0].text.trim();

  const words = generatedText.split(' ').slice(0, 5);

  res.json(words);
});

// Serve static files in production
// if (process.env.NODE_ENV === "production") {
// Serve any static files
app.use(express.static(path.join(__dirname, "public")));

// Handle React routing, return all requests to React app
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
