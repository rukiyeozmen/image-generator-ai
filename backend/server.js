const express = require('express');
const { Client } = require('pg');
const cors = require('cors'); //security system 
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();
const app = express();
app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//AI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


// Database connection
const client = new Client({
  user: 'labber',
  host: 'localhost',
  database: 'final',
  password: 'labber',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((error) => console.error('Error connecting to PostgreSQL database:', error));

// Routes
app.get('/api/images', (req, res) => {
  const query = 'SELECT * FROM images';

  client.query(query)
    .then((result) => {
      const images = result.rows;
      res.json(images);
    })
    .catch((error) => {
      console.error('Error fetching images from database:', error);
      res.status(500).json({ error: 'An error occurred while fetching images' });
    });
});


// SERVER PART
app.get('/', (req, res) => {
  return res.status(200).send('Server is up');
});


//AI 
app.post('/generate', async (req, res) => {
  const { prompt, size } = req.body;
  // validation
  if(!prompt || !size){
    return res.status(400).send('Bad request');
  }
  try {
    const response = await openai.createImage({
      prompt,
      size,
      n: 1,
    });
   const image_url =response.data[0].url;
    return response.status(200).send({
      src: image_url,
    });
  } catch (error) {
      return response.status(500).send({error});
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
