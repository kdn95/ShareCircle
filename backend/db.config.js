require("dotenv").config();
const { Pool } = require("pg");

// Directly using your Render database details in the connection string
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Ensure to set this if your database requires SSL
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
