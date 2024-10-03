require("dotenv").config();
const { Pool } = require("pg");

// Directly using your Render database details in the connection string
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false, // Set this to false if you're using self-signed certificates
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
