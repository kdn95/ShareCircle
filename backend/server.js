require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors'); // Import CORS
const pool = require(__dirname + '/db.config.js');

const app = express();
const PORT = process.env.PORT || 5004;

// Use CORS middleware
app.use(cors());

// Function to handle health check (fetch Categories)
const getCategories = (req, res) => {
  pool.query('SELECT * FROM "Categories"', (error, categories) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(categories.rows);
  });
};

// Route to get Categories data
app.get('/', getCategories);

// Start server
app.listen(PORT, () => console.log('Server running on port ' + PORT));
