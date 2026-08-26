const db = require('../config/db');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM students ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error getting students:', error);
        res.status(500).json({ error: 'Failed to retrieve students' });
    }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM students WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error getting student:', error);
        res.status(500).json({ error: 'Failed to retrieve student' });
    }
};

// Create new student
exports.createStudent = async (req, res) => {
    try {
        const { name, roll_no, email, department, year } = req.body;
        
        // Validation
        if (!name || !roll_no || !email || !department || year === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Check if roll_no or email already exists
        const checkResult = await db.query(
            'SELECT * FROM students WHERE roll_no = $1 OR email = $2',
            [roll_no, email]
        );
        
        if (checkResult.rows.length > 0) {
            return res.status(400).json({ error: 'Roll number or email already exists' });
        }
        
        const result = await db.query(
            'INSERT INTO students (name, roll_no, email, department, year) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, roll_no, email, department, year]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Failed to create student' });
    }
};

// Update student
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, roll_no, email, department, year } = req.body;
        
        // Validation
        if (!name || !roll_no || !email || !department || year === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Check if student exists
        const checkResult = await db.query('SELECT * FROM students WHERE id = $1', [id]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        // Check if roll_no or email already exists (excluding current student)
        const duplicateCheck = await db.query(
            'SELECT * FROM students WHERE (roll_no = $1 OR email = $2) AND id != $3',
            [roll_no, email, id]
        );
        
        if (duplicateCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Roll number or email already exists' });
        }
        
        const result = await db.query(
            'UPDATE students SET name = $1, roll_no = $2, email = $3, department = $4, year = $5 WHERE id = $6 RETURNING *',
            [name, roll_no, email, department, year, id]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Failed to update student' });
    }
};

// Delete student
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if student exists
        const checkResult = await db.query('SELECT * FROM students WHERE id = $1', [id]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        await db.query('DELETE FROM students WHERE id = $1', [id]);
        
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
};
