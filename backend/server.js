const express = require("express");
const { Client } = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Database connection
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

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).send("Bad Request!!!");
  }

  // Check the login credentials against the database
  const query = "SELECT * FROM Users WHERE email = $1 AND password = $2";
  const values = [email, password];
  const result = await client.query(query, values);

  if (result.rowCount === 1) {
    // Login successful
    return res.status(200).send("Login successful");
  } else {
    // Login failed
    return res.status(401).send("Unauthorized");
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
    // Email is available, proceed with registration
    const insertQuery = "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)";
    const insertValues = [username, email, password];
    await client.query(insertQuery, insertValues);

    return res.status(201).send("Registration successful");
  } else {
    // Email is already registered
    return res.status(409).send("Email already exists");
  }
});

// AI
app.get("/generate", (req, res) => {
  return res.status(405).send("Method Not Allowed");
});

// Themes
app.get('/themes', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM Themes;');
    return res.status(200).send(result.rows);
  } catch (error) {
    console.error('Error fetching themes:', error);
    return res.status(500).send({ error: 'An error occurred while fetching the themes' });
  }
});

// get images based on user email 

app.get("/user/favorite", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send("Missing Email!");
  }

  // Get user_id from Users table
  const user = await client.query('SELECT id FROM Users WHERE email = $1', [email]);

  if (user.rows.length === 0) {
    return res.status(404).send("User not found!");
  }

  const userId = user.rows[0].id;

  // Get favorite images from Images table
  const favorites = await client.query('SELECT image_url FROM Images WHERE user_id = $1 AND is_favorite = true', [userId]);

  res.status(200).json(favorites.rows);
});


//post for saving image urls to favorites by email

app.post("/user/favorite", async (req, res) => {
  const { url, email } = req.body;

  if (!url || !email) {
    return res.status(400).send("Missing URL or Email!");
  }

  // Get user_id from Users table
  const user = await client.query('SELECT id FROM Users WHERE email = $1', [email]);

  if (user.rows.length === 0) {
    return res.status(404).send("User not found!");
  }

  const userId = user.rows[0].id;

  // Update Images table
  await client.query('UPDATE Images SET is_favorite = true WHERE image_url = $1 AND user_id = $2', [url, userId]);

  res.status(200).send("Image saved to favorites!");
});


app.post("/generate", async (req, res) => {
  const { prompt, size } = req.body;

  // Validation
  if (!prompt || !size) {
    return res.status(400).send("Bad Request!!!");
  }

  const response = await openai.createImage({
    prompt,
    size,
    n: 1,
  });
  const image_url = response.data.data[0].url;

  return res.status(200).send({
    src: image_url,
  });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
