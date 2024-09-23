require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const pool = require(__dirname + '/db.config.js');

const app = express();
const PORT = process.env.PORT || 5003;

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



app.get('/Electronics/:item_id', (req, res) => {
  // Correctly access the item_id from the route parameter
  const itemId = req.params.item_id;

  const query = 'SELECT * FROM "Items" WHERE "Item_id" = $1';


  pool.query(query, [itemId], (error, result) => {
    if (error) {
      // Return a 500 status with a proper error message
      return res.status(500).json({ error: 'Database query failed' });
    }

    // If no items were found, return a 404 error
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Return the found item
    res.status(200).json(result.rows[0]);
  });
});



// Start server
app.listen(PORT, () => console.log('Server running on port ' + PORT));
