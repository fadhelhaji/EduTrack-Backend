# EduTrack Backend 🏫💻

This is the **backend** of EduTrack, a centralized MERN-stack school and homework management system.  
It handles authentication, authorization, and API data operations for assignments, classes, submissions, and user management.

For the frontend interface and more project details, visit https://github.com/fadhelhaji/EduTrack-Frontend.

---

## ✨ Features

- JWT-based authentication (sign up, sign in, sign out)
- Role-based authorization (Instructor/Admin vs Student)
- CRUD functionality for:
  - Users
  - Classes
  - Assignments
  - Submissions
- Secure handling of secret keys and API calls
- Email notifications via Nodemailer

---

## 📦 Setup & Installation

1. **Clone the repository**
- git clone https://github.com/fadhelhaji/EduTrack-Backend
- cd EduTrack-Backend

2. **Install dependencies**
- npm install

3. **Create a .env file with the following variables:**
- PORT=3000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- EMAIL_USER=your_email@example.com
- EMAIL_PASS=your_email_password

4. **Start the backend server**
- npm start
