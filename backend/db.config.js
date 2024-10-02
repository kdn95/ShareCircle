require("dotenv").config();
const { Pool } = require("pg");

// Determine the connection string based on the environment
const connectionString =
  process.env.DB_URL || // Use the connection string from the environment variable
  'postgres://postgres:circleshare@localhost:5432/postgres'; // Fallback to local connection

// Create a new pool instance with the connection string
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
