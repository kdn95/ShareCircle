require("dotenv").config();
const { Pool } = require("pg");

const database = process.env.PGDATABASE;

const connectionString = 'postgres://postgres:circleshare@localhost:5432/postgres'

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