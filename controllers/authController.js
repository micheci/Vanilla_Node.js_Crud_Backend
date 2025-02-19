const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

async function registerUser(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    const { username, password } = JSON.parse(body);
    if (!username || !password) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Missing credentials" }));
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, hashedPassword]
      );
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User registered successfully" }));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Error registering user" }));
    }
  });
}

async function loginUser(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    const { username, password } = JSON.parse(body);

    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (result.rows.length === 0) throw new Error("User not found");

      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ token }));
    } catch (error) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error.message }));
    }
  });
}

module.exports = { registerUser, loginUser };
