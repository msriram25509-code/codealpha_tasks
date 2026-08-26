# CodeAlpha Student Management System

A complete full-stack student management system built with HTML5, CSS3, Vanilla JavaScript, Node.js, Express.js, and PostgreSQL.

## 📋 Features

- 🔐 Admin Authentication (Login/Logout)
- 📊 Dashboard with Statistics
- ➕ Add New Students
- 👁️ View All Students
- ✏️ Edit Student Details
- 🗑️ Delete Students
- 🔍 Search Functionality
- 📱 Responsive Design
- 🎨 Modern UI with Blue Theme

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (No frameworks)

### Backend
- Node.js
- Express.js
- PostgreSQL
- REST APIs

### Tools & Libraries
- Express CORS
- dotenv for environment variables
- PostgreSQL (pg driver)
- Nodemon for development

## 📁 Folder Structure

```
CodeAlpha_StudentManagement/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── add.html
│   ├── students.html
│   ├── edit.html
│   ├── style.css
│   ├── script.js
│   └── images/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── studentController.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── database/
│   └── schema.sql
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Git (optional)

### Step 1: PostgreSQL Database Setup

1. **Open PostgreSQL Command Line:**
   ```bash
   psql -U postgres
   ```

2. **Create Database:**
   ```sql
   CREATE DATABASE studentdb;
   ```

3. **Connect to Database:**
   ```sql
   \c studentdb
   ```

4. **Run Schema File:**
   ```sql
   \i 'path/to/database/schema.sql'
   ```

5. **Verify Tables:**
   ```sql
   \dt
   SELECT * FROM students;
   ```

### Step 2: Backend Setup

1. **Navigate to Backend Directory:**
   ```bash
   cd CodeAlpha_StudentManagement/backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Edit `.env` file with your PostgreSQL credentials:
   ```
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=studentdb
   PORT=5000
   NODE_ENV=development
   ```

4. **Start Backend Server:**
   ```bash
   npm run dev
   ```
   
   Server should run on `http://localhost:5000`

### Step 3: Frontend Setup

1. **Open Frontend Folder:**
   Navigate to `CodeAlpha_StudentManagement/frontend`

2. **Option A: Using Live Server (VS Code Extension)**
   - Install "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

3. **Option B: Using Python HTTP Server**
   ```bash
   cd frontend
   python -m http.server 8000
   ```
   Then open `http://localhost:8000`

4. **Option C: Using Node.js HTTP Server**
   ```bash
   npm install -g http-server
   http-server frontend/
   ```

## 🔐 Default Credentials

- **Username:** `admin`
- **Password:** `admin123`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Students
```
GET /api/students
Response: Array of all students
```

#### Get Student by ID
```
GET /api/students/:id
Response: Single student object
```

#### Create New Student
```
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "roll_no": "CS101",
  "email": "john@college.com",
  "department": "Computer Science",
  "year": 1
}
```

#### Update Student
```
PUT /api/students/:id
Content-Type: application/json

{
  "name": "John Doe Updated",
  "roll_no": "CS101",
  "email": "john.updated@college.com",
  "department": "Computer Science",
  "year": 2
}
```

#### Delete Student
```
DELETE /api/students/:id
```

## 📄 Database Schema

### Students Table
```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_no VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1 AND year <= 4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Columns
- `id` - Unique student identifier (Auto-increment)
- `name` - Student full name
- `roll_no` - Unique roll number
- `email` - Unique email address
- `department` - Department name
- `year` - Academic year (1-4)

## 🎨 UI Pages

### 1. Login Page (`index.html`)
- Admin authentication
- Session management with localStorage
- Static credentials validation

### 2. Dashboard (`dashboard.html`)
- Statistics cards (Total Students, Departments, Year-wise Count)
- Database connection status
- Quick action buttons
- Navigation menu

### 3. Add Student (`add.html`)
- Form to add new student
- Input validation
- Success/Error messages
- Redirect to students page after adding

### 4. Students List (`students.html`)
- Display all students in table format
- Search by name or roll number
- Edit and Delete buttons
- Responsive table design

### 5. Edit Student (`edit.html`)
- Pre-filled student data
- Update functionality
- Form validation
- Redirect to students page after update

## 🔧 Troubleshooting

### Backend Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:5432
Solution: Ensure PostgreSQL is running
Command: sudo systemctl start postgresql (Linux)
         brew services start postgresql (macOS)
```

### CORS Errors
- Ensure backend is running on port 5000
- Check CORS configuration in server.js

### Database Errors
- Verify PostgreSQL credentials in .env
- Ensure database and table exist
- Run schema.sql if tables are missing

### Frontend Not Loading
- Use Live Server or any HTTP server
- Don't open HTML files directly from file system

## 📝 Environment Variables

### .env (Backend)
```
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=studentdb
PORT=5000
NODE_ENV=development
```

## 🎯 Usage Guide

1. **Start PostgreSQL**
2. **Create Database:** Run schema.sql
3. **Start Backend:** `npm run dev` in backend folder
4. **Open Frontend:** Use Live Server or HTTP server
5. **Login:** Use admin/admin123
6. **Manage Students:** Add, View, Edit, Delete operations

## 📦 Dependencies

### Frontend
- No external dependencies (Pure Vanilla JavaScript)

### Backend
```json
{
  "express": "^4.18.2",
  "pg": "^8.10.0",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "nodemon": "^3.0.1" (dev)
}
```

## 🚀 Production Build

1. Remove nodemon: `npm uninstall nodemon`
2. Update package.json: `"start": "node server.js"`
3. Set `NODE_ENV=production` in .env
4. Deploy frontend to static hosting (GitHub Pages, Netlify, Vercel)
5. Deploy backend to server (Heroku, Railway, DigitalOcean)

## 📄 License

MIT License - Free to use and modify

## 👨‍💼 Author

CodeAlpha

## 🤝 Support

For issues or questions, please refer to the troubleshooting section or create an issue.

---

**Happy Coding! 🎉**
