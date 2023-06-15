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
    // Login successful
    const user = result.rows[0];
    return res.status(200).json({ message: "Login successful", user: { username: user.username } });
  } else {
    // Login failed
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
