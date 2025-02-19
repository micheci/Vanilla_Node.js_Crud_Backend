require("dotenv").config();
const { Pool } = require("pg");

// Create a database pool connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in your .env file
});

async function testDBConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected successfully!");
    client.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Stop the server if the database isn't connected
  }
}

// Run the test when this file is loaded
testDBConnection();

module.exports = pool;
