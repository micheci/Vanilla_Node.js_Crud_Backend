const { registerUser, loginUser } = require("../controllers/authController");

// Handles routes for authentication
function handleAuthRoutes(req, res) {
  const urlParts = req.url.split("/");

  if (req.method === "POST" && urlParts[2] === "register") {
    // Match /auth/register
    registerUser(req, res);
  } else if (req.method === "POST" && urlParts[2] === "login") {
    // Match /auth/login
    loginUser(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
}

module.exports = handleAuthRoutes;
