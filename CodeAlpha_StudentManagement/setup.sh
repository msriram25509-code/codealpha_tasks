#!/bin/bash

# CodeAlpha Student Management System - Setup Script
# This script helps set up the project automatically

echo "=========================================="
echo "CodeAlpha Student Management System Setup"
echo "=========================================="
echo ""

# Check Node.js
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi
echo "✓ Node.js is installed: $(node -v)"

# Check npm
echo "Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi
echo "✓ npm is installed: $(npm -v)"

# Check PostgreSQL
echo "Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi
echo "✓ PostgreSQL is installed"

# Install backend dependencies
echo ""
echo "Installing backend dependencies..."
cd backend
npm install

if [ $? -eq 0 ]; then
    echo "✓ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. Setup PostgreSQL Database:"
echo "   - Open PostgreSQL: psql -U postgres"
echo "   - Run: CREATE DATABASE studentdb;"
echo "   - Run: \i 'database/schema.sql'"
echo ""
echo "2. Start Backend Server:"
echo "   - cd backend"
echo "   - npm run dev"
echo ""
echo "3. Start Frontend:"
echo "   - Open 'frontend/index.html' with Live Server"
echo "   - Or use: python -m http.server 8000"
echo ""
echo "4. Login with:"
echo "   - Username: admin"
echo "   - Password: admin123"
echo ""
echo "=========================================="
