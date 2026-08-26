-- Create database
CREATE DATABASE studentdb;

-- Connect to studentdb
\c studentdb;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_no VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1 AND year <= 4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better search performance
CREATE INDEX idx_students_name ON students(name);
CREATE INDEX idx_students_roll_no ON students(roll_no);
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_department ON students(department);

-- Insert sample data (optional)
INSERT INTO students (name, roll_no, email, department, year) VALUES
('Rahul Kumar', 'CS001', 'rahul.kumar@college.com', 'Computer Science', 1),
('Priya Singh', 'CS002', 'priya.singh@college.com', 'Computer Science', 1),
('Amit Patel', 'EC001', 'amit.patel@college.com', 'Electronics', 2),
('Neha Verma', 'ME001', 'neha.verma@college.com', 'Mechanical', 3),
('Ajay Sharma', 'CE001', 'ajay.sharma@college.com', 'Civil', 4);
