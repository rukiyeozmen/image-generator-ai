import express from "express";
import pg from 'pg';
import dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Client } = pg;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Database connection
/* const client = new Client({
  user: 'labber',
  host: 'localhost',
  database: 'final',
  password: 'labber',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((error) => console.error('Error connecting to PostgreSQL database:', error));

*/

// Set Content Security Policy (CSP)
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "img-src 'self' data:; default-src 'self'");
  next();
});

// Routes
app.get('/', (req, res) => {
  return res.status(200).send('Server is up');
});

// AI
app.get('/generate', (req, res) => {
  return res.status(405).send('Method Not Allowed');
});

app.post("/generate", async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).send({ error: 'An error occurred while generating the image' });
  }
});

// Start the server
const port = process.env.PORT || 8300;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
