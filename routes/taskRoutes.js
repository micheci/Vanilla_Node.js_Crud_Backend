const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Handles routes for tasks
function handleTaskRoutes(req, res) {
  const urlParts = req.url.split("/");

  if (req.method === "GET" && urlParts[1] === "tasks") {
    getTasks(req, res);
  } else if (req.method === "POST" && urlParts[1] === "tasks") {
    createTask(req, res);
  } else if (req.method === "PUT" && urlParts[1] === "tasks" && urlParts[2]) {
    updateTask(req, res);
  } else if (
    req.method === "DELETE" &&
    urlParts[1] === "tasks" &&
    urlParts[2]
  ) {
    deleteTask(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
}

module.exports = handleTaskRoutes;
