const http = require("http");
const handleTaskRoutes = require("./routes/taskRoutes");
const handleAuthRoutes = require("./routes/authRoutes");

const server = http.createServer((req, res) => {
  // Set headers for CORS, content-type, etc.
  res.setHeader("Content-Type", "application/json");

  // Delegate to task and auth routes based on URL
  if (req.url.startsWith("/tasks")) {
    handleTaskRoutes(req, res);
  } else if (
    req.url.startsWith("/auth/register") ||
    req.url.startsWith("/auth/login")
  ) {
    handleAuthRoutes(req, res); // Handle /auth routes
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
