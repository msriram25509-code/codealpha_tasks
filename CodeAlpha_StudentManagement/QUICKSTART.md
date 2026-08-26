# 🚀 Quick Start Guide - Windows

## Step 1: PostgreSQL Database Setup

### Create Database
```powershell
# Open PowerShell and connect to PostgreSQL
psql -U postgres

# In psql terminal, run:
CREATE DATABASE studentdb;
\c studentdb
\i 'C:/Users/shyam/Desktop/CodeAlpha_StudentManagement/database/schema.sql'

# Verify tables
\dt
SELECT * FROM students;

# Exit psql
\q
```

## Step 2: Backend Setup

```powershell
# Navigate to backend
cd C:\Users\shyam\Desktop\CodeAlpha_StudentManagement\backend

# Install dependencies
npm install

# Update .env file with your PostgreSQL password if needed
# Then start development server
npm run dev
```

**Expected Output:**
```
========================================
Server is running on http://localhost:5000
API Documentation:
  GET    http://localhost:5000/api/students
  POST   http://localhost:5000/api/students
  PUT    http://localhost:5000/api/students/:id
  DELETE http://localhost:5000/api/students/:id
========================================
```

## Step 3: Frontend Setup

### Option A: Live Server (Recommended)
1. Open VS Code
2. Install extension: "Live Server" by Ritwick Dey
3. Navigate to: `C:\Users\shyam\Desktop\CodeAlpha_StudentManagement\frontend`
4. Right-click on `index.html`
5. Select "Open with Live Server"
6. Browser opens automatically at `http://127.0.0.1:5500`

### Option B: Python HTTP Server
```powershell
cd C:\Users\shyam\Desktop\CodeAlpha_StudentManagement\frontend
python -m http.server 8000
```
Then open browser: `http://localhost:8000`

### Option C: Node.js HTTP Server
```powershell
npm install -g http-server
http-server C:\Users\shyam\Desktop\CodeAlpha_StudentManagement\frontend
```

## Step 4: Login

1. Open frontend URL in browser
2. **Username:** `admin`
3. **Password:** `admin123`
4. Click Login

## ✅ Troubleshooting

### PostgreSQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:**
```powershell
# Check if PostgreSQL is running
# On Windows Services (Services.msc), search for PostgreSQL
# Make sure "postgresql-x64-xx" is Running

# Or restart PostgreSQL:
net start PostgreSQL14
# (Replace 14 with your version)
```

### Port Already in Use (Port 5000)
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with the number)
taskkill /PID <PID> /F

# Then restart backend
npm run dev
```

### CORS Error in Frontend
- Ensure backend is running on http://localhost:5000
- Check browser console for exact error
- Verify .env DATABASE variables

### Database Error
```powershell
# Verify database exists
psql -U postgres -c "SELECT datname FROM pg_database WHERE datname='studentdb';"

# If not exists, run schema.sql again
psql -U postgres studentdb -f C:\Users\shyam\Desktop\CodeAlpha_StudentManagement\database\schema.sql
```

## 📊 API Testing

### Using PowerShell
```powershell
# Get all students
Invoke-RestMethod -Uri "http://localhost:5000/api/students" -Method GET

# Create student
$body = @{
    name = "Test Student"
    roll_no = "CS999"
    email = "test@college.com"
    department = "Computer Science"
    year = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/students" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

## 🎯 Features to Test

1. **Login Page**
   - Try admin/admin123 ✓
   - Try wrong credentials ✗

2. **Dashboard**
   - View statistics
   - Check database connection status

3. **Add Student**
   - Add new student
   - Try duplicate roll number
   - Try duplicate email

4. **View Students**
   - List all students
   - Search by name
   - Search by roll number

5. **Edit Student**
   - Click edit button
   - Modify details
   - Save changes

6. **Delete Student**
   - Delete a student
   - Confirm deletion

## 📝 Project Structure Verification

```
C:\Users\shyam\Desktop\CodeAlpha_StudentManagement\
├── frontend\
│   ├── index.html ✓
│   ├── dashboard.html ✓
│   ├── add.html ✓
│   ├── students.html ✓
│   ├── edit.html ✓
│   ├── style.css ✓
│   └── script.js ✓
├── backend\
│   ├── config\db.js ✓
│   ├── controllers\studentController.js ✓
│   ├── routes\studentRoutes.js ✓
│   ├── server.js ✓
│   ├── package.json ✓
│   └── .env ✓
├── database\
│   └── schema.sql ✓
├── README.md ✓
└── QUICKSTART.md ✓
```

## 🔧 Common Commands

```powershell
# Backend
cd C:\Users\shyam\Desktop\CodeAlpha_StudentManagement\backend
npm install          # Install dependencies
npm start            # Production mode
npm run dev          # Development mode (with auto-reload)

# Database
psql -U postgres                    # Connect to PostgreSQL
psql -U postgres -c "CREATE DATABASE studentdb;"  # Create DB
psql -U postgres studentdb          # Connect to studentdb
```

## 📱 Test Data

The schema.sql includes sample data:
- Rahul Kumar (CS001) - Computer Science, Year 1
- Priya Singh (CS002) - Computer Science, Year 1
- Amit Patel (EC001) - Electronics, Year 2
- Neha Verma (ME001) - Mechanical, Year 3
- Ajay Sharma (CE001) - Civil, Year 4

## 💡 Pro Tips

1. Keep backend terminal open while testing frontend
2. Use browser DevTools (F12) to check network requests
3. Check browser console for JavaScript errors
4. Check backend terminal for server errors
5. Use Postman or Insomnia for API testing

## 🎓 Learning Resources

- Node.js: https://nodejs.org/docs/
- Express.js: https://expressjs.com/
- PostgreSQL: https://www.postgresql.org/docs/
- REST APIs: https://restfulapi.net/

---

**Everything is ready! Start with Step 1 and follow sequentially.** 🎉
