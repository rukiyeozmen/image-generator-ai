const express = require('express');
const { Client } = require('pg');
const cors = require('cors'); //security system 

const app = express();
app.use(cors()); 

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

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
