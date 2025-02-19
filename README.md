Node.js Task Management API
This project is a backend API built with Node.js and PostgreSQL for managing user tasks with authentication. It supports user registration, login, and task management with JWT-based authentication. The API allows users to create, update, view, and delete their tasks, with each task linked to the specific authenticated user.

Features
User Authentication: Secure user registration and login using JWT and bcrypt for password hashing.
Task Management: CRUD operations (Create, Read, Update, Delete) for tasks.
Each task is tied to a specific user and can only be accessed or modified by the user who created it.
JWT Authentication: Protects API routes by requiring a valid token for access.
API Endpoints
Authentication
POST /auth/register
Register a new user by providing username and password.
Returns: Success message or error message.

POST /auth/login
Log in an existing user by providing username and password.
Returns: A JWT token for authentication.

Task Management
GET /tasks
Get all tasks for the authenticated user.
Requires a valid JWT token.

POST /tasks
Create a new task for the authenticated user.
Requires a valid JWT token and a request body with title and description.

PUT /tasks/:id
Update a specific task for the authenticated user.
Requires a valid JWT token and a request body with updated title, description, and isComplete.

DELETE /tasks/:id
Delete a specific task for the authenticated user.
Requires a valid JWT token.
