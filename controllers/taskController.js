const pool = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Unauthorized" }));
  }

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid token" }));
  }
}

async function getTasks(req, res) {
  authenticate(req, res, async () => {
    const tasks = await pool.query("SELECT * FROM tasks WHERE userId = $1", [
      req.user.userId,
    ]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks.rows));
  });
}

async function createTask(req, res) {
  authenticate(req, res, async () => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const { title, description } = JSON.parse(body);
      await pool.query(
        "INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3)",
        [title, description, req.user.userId]
      );
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Task created" }));
    });
  });
}

async function updateTask(req, res) {
  authenticate(req, res, async () => {
    const id = req.url.split("/")[2];
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const { title, description, isComplete } = JSON.parse(body);
      await pool.query(
        "UPDATE tasks SET title=$1, description=$2, isComplete=$3 WHERE id=$4 AND userId=$5",
        [title, description, isComplete, id, req.user.userId]
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Task updated" }));
    });
  });
}

async function deleteTask(req, res) {
  authenticate(req, res, async () => {
    const id = req.url.split("/")[2];
    await pool.query("DELETE FROM tasks WHERE id=$1 AND userId=$2", [
      id,
      req.user.userId,
    ]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Task deleted" }));
  });
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
