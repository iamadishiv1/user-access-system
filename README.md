# User Access Management System

A system for managing software access requests with role-based permissions.

## Features

- User registration and login with JWT authentication
- Role-based access control (Employee, Manager, Admin)
- Software management (Admin only)
- Access request submission (Employee)
- Request approval/rejection (Manager)

## Technologies

- Backend: Node.js, Express, TypeORM
- Frontend: React, Material-UI
- Database: PostgreSQL
- Authentication: JWT

## Setup

### Backend

1. Install PostgreSQL and create a database
2. Clone the repository
3. Navigate to the backend folder: `cd backend`
4. Install dependencies: `npm install`
5. Create a `.env` file based on `.env.example`
6. Run the server: `npm run dev`

### Frontend

1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## API Endpoints

### Authentication
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login

### Software (Admin only)
- POST `/api/software` - Create new software
- GET `/api/software` - Get all software

### Requests
- POST `/api/requests` - Create access request (Employee)
- GET `/api/requests/pending` - Get pending requests (Manager)
- PATCH `/api/requests/:id` - Update request status (Manager)
- GET `/api/requests/my-requests` - Get user's requests (Employee)