# TaskVault
A secure task management dashboard with authentication

It demonstrates secure authentication, protected dashboards, and user-specific task management with clean frontend–backend integration.

Users can:
- Register and log in securely
- Access a protected dashboard
- Create, view, update, and delete their own tasks
- Log out safely

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- JWT-based authentication

### Database
- MongoDB (Mongoose)

---

## Core Features

### Authentication
- User registration with validation
- Secure login using hashed passwords
- JWT-based authentication
- Protected routes for authenticated users only
- Logout functionality

### Dashboard & Tasks
- User-specific dashboard
- Fetches tasks from backend
- Task CRUD operations (Create, Read, Update, Delete)
- Tasks are visible only to the authenticated user

### Security
- Password hashing before storage
- JWT verification middleware
- Authorization checks for all task operations
- Server-side validation and structured error handling

---

## API Documentation & Testing

A Postman collection is included to test all backend APIs.

**Location:**  
`/postman/TaskVault_API.postman_collection.json`

The collection includes:
- User registration and login
- JWT-protected task APIs
- Error scenarios (invalid credentials, expired token, unauthorized access)

Steps to test:
1. Import the Postman collection
2. Run login API to get JWT
3. Use the token to test protected task routes

---

## Application Flow (High Level)

1. User registers and logs in
2. Backend returns a JWT token
3. Frontend stores the token
4. Token is sent with every protected request
5. Backend verifies token using middleware
6. Tasks are fetched and managed only for the authenticated user

---

## Project Structure (High Level)

### Backend
- Routes – API endpoints
- Controllers – Business logic
- Models – Database schemas
- Middleware – Authentication & error handling
- Config – Environment and database setup

### Frontend
- Pages – Login, Register, Dashboard
- Components – Reusable UI elements
- Services – API communication
- Auth utilities – Token handling & route protection

---

## How to Run Locally (High Level)

1. Clone the repository
2. Configure environment variables
3. Start the backend server
4. Start the frontend application
5. Access the app in the browser