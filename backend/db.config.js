require("dotenv").config();
const { Pool } = require("pg");

// Create a connection pool using the DB_URL environment variable
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
