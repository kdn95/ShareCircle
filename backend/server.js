require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors'); // Import CORS
const pool = require(__dirname + '/db.config.js');

const app = express();
const PORT = process.env.PORT || 5004;

// Use CORS middleware
app.use(cors());

// ALL CATEGORIES - HOMEPAGE
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


// GET SPECIFIC CATEGORY - worked for Categories list
// Should show all items according to category name
app.get('/:category_name', async (req, res) => {
  const categoryName = req.params.category_name;
  console.log('Fetching items with Category_name:', categoryName);
  const query = `
    SELECT * FROM "Items"
    INNER JOIN "Categories" ON "Items"."Category_id" = "Categories"."ID"
    WHERE "Categories"."Name" = $1
  `;

  try {
    const result = await pool.query(query, [categoryName]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// GET SPECIFIC ITEM - item listing
// one item according to specified category_name and item_id
app.get('/:category_name/:itemId', async (req, res) => {
  const categoryName = req.params.category_name;
  const itemId = req.params.itemId;
  console.log('Fetching item with Item_id:', itemId);

  // Query to fetch an item by Category_id and Item_id
  const query = `
    SELECT * FROM "Items"
    INNER JOIN "Categories" ON "Items"."Category_id" = "Categories"."ID"
    WHERE "Categories"."Name" = $1 AND "Items"."Item_id" = $2
  `;
  
  try {
    const result = await pool.query(query, [categoryName, itemId]);
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