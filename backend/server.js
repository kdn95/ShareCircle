require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors'); // Import CORS
const pool = require(__dirname + '/db.config.js');

const { auth } = require('express-oauth2-jwt-bearer');

const stripe = require('stripe')('sk_test_wsFx86XDJWwmE4dMskBgJYrt');

const app = express();
const PORT = process.env.PORT || 5003;

// Add CORS middleware
app.use(cors({ origin: 'http://localhost:3000' }));  // Update with your frontend URL

app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:5003';

// JWT check middleware
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: 'RS256',
});


// Signup Route

// Login Route

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


// get items within a certain (e.g., 5km) radius (protected)
app.get('/items/nearby', jwtCheck, async (req, res) => {
  const { latitude, longitude, radius_km } = req.query;

  try {
    const query = `
      SELECT "Item_name", "Description", "Price_per_day", "Image_url", "Availability", "Renter_name"
      FROM "Items"
      INNER JOIN "Renters" ON "Items"."Renter_id" = "Renters"."Renter_id"
      WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint($1, $2), 4326), $3 * 1000);
    `;
    // Correct order of parameters: [longitude, latitude, radius_km]
    const result = await pool.query(query, [longitude, latitude, radius_km]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching nearby items:', error);
    res.status(500).json({ error: 'Failed to fetch nearby items' });
  }
});




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

// STRIPE PAYMENT
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

// Start server
app.listen(PORT, () => console.log('Server running on port ' + PORT));