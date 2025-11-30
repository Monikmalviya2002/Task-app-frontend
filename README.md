# Task Management App - Frontend

## Overview
This is the frontend of the Task Management Application. It is built using **React**, **TailwindCSS**, **Redux Toolkit**, and **React Hook Form/Zod** for form validation. The app communicates with a backend API to provide secure user authentication and task management features.

---

## **Technology Stack**
- **React** (Vite/Webpack)
- **TailwindCSS** for styling
- **Redux Toolkit** for state management
- **Axios** for API requests
- **React Hook Form + Zod** for form validation
- **Jest + React Testing Library** for testing (Optional)

---

## **Features**
1. **Authentication**
   - User Registration
   - User Login with JWT
   - Secure token storage in `localStorage`
   - Logout functionality
   - Protected routes that require a valid JWT

2. **Task Management**
   - View tasks for the logged-in user
   - Create new tasks
   - Update existing tasks
   - Delete tasks
   - Each task includes:
     - `title` (string)
     - `description` (optional)
     - `status` (pending, completed)
   - Users can only manage their own tasks

3. **Form Validation**
   - Frontend validation using **React Hook Form + Zod**

---

## **Getting Started**

### **Prerequisites**
- Node.js >= 18
- npm or yarn installed
- Backend API running locally or remotely

### **Installation**
```bash
git clone <repository-url>
cd frontend
npm install
# or
yarn install
