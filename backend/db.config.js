require("dotenv").config();
const { Pool } = require("pg");

// Directly using your Render database details in the connection string
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Set this if your database requires SSL
  }
});

// Export query and end methods for database interactions
module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
