// Logout function
function logout(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('adminUser');
        window.location.href = 'index.html';
    }
}

// Login handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorMessage = document.getElementById('errorMessage');
            
            // Check credentials
            if (username === 'admin' && password === 'admin123') {
                // Store login info in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('adminUser', username);
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Show error
                errorMessage.textContent = '✗ Invalid username or password!';
                errorMessage.style.display = 'block';
                
                // Clear password field
                document.getElementById('password').value = '';
            }
        });
    }
});

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all students
async function fetchStudents() {
    try {
        const response = await fetch(`${API_BASE_URL}/students`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}

// Fetch single student by ID
async function fetchStudent(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/students/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching student:', error);
        throw error;
    }
}

// Create new student
async function createStudent(studentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create student');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
}

// Update student
async function updateStudent(id, studentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update student');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
}

// Delete student
async function deleteStudentAPI(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/students/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete student');
        }
        return true;
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
