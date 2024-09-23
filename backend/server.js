require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors'); // Import CORS
const pool = require(__dirname + '/db.config.js');

const app = express();
const PORT = process.env.PORT || 5004;

// Use CORS middleware
app.use(cors());

// CATEGORIES - HOMEPAGE
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


// ELECTRONICS
const getElectronics = (req, res) => {
  pool.query('SELECT * FROM "Items" WHERE "Category_id" = 1', (error, items) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(items.rows);
  });
};
// Route to get Electronics data
app.get('/Electronics', getElectronics);


// CLOTHES
const getClothes = (req, res) => {
  pool.query('SELECT * FROM "Items" WHERE "Category_id" = 2', (error, items) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(items.rows);
  });
};
// Route to get Clothes data
app.get('/Clothes', getClothes);


// TOOLS AND EQUIPMENT
const getTools = (req, res) => {
  pool.query('SELECT * FROM "Items" WHERE "Category_id" = 3', (error, items) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(items.rows);
  });
};
// Route to get Tools and equipment data
app.get('/Tools', getTools);

// FURNITURE
const getFurniture = (req, res) => {
  pool.query('SELECT * FROM "Items" WHERE "Category_id" = 4', (error, items) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(items.rows);
  });
};

// Route to get Furniture data
app.get('/Furniture', getFurniture);

// ENTERTAINMENT
const getEntertainment = (req, res) => {
  pool.query('SELECT * FROM "Items" WHERE "Category_id" = 5', (error, items) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(items.rows);
  });
};
// Route to get Entertainment data
app.get('/Entertainment', getEntertainment);

// BABY AND KIDS
const getBaby = (req, res) => {
  pool.query('SELECT * FROM "Items" WHERE "Category_id" = 6', (error, items) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(items.rows);
  });
};
// Route to get Baby data
app.get('/Baby', getBaby);

// HEALTH AND FITNESS
const getFitness = (req, res) => {
  pool.query('SELECT * FROM "Items" WHERE "Category_id" = 7', (error, items) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(items.rows);
  });
};
// Route to get Fitness data
app.get('/Fitness', getFitness);

// OUTDOOR
const getOutdoors = (req, res) => {
  pool.query('SELECT * FROM "Items" WHERE "Category_id" = 8', (error, items) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(items.rows);
  });
};

// Route to get Outdoors data
app.get('/Outdoors', getOutdoors);



app.get('/Electronics/:Item_id', async (req, res) => {
  const itemId = req.params.Item_id;
  console.log('Fetching item with Item_id:', itemId);
  const query = 'SELECT * FROM "Items" WHERE "Item_id" = $1';

  try {
    const result = await pool.query(query, [itemId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});



// Start server
app.listen(PORT, () => console.log('Server running on port ' + PORT));
