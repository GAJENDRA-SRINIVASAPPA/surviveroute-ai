#!/bin/bash

# SurviveRoute AI - Professional Startup Script
# This script ensures proper dependency installation and server startup

set -e  # Exit on error

echo "🚀 SurviveRoute AI - Professional Startup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "ℹ️  $1"
}

# Check Node.js version
print_info "Checking Node.js version..."
NODE_VERSION=$(node -v)
print_success "Node.js version: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm -v)
print_success "npm version: $NPM_VERSION"

echo ""
print_info "Step 1: Installing Backend Dependencies..."
echo "----------------------------------------"

cd backend

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_warning "Backend node_modules already exists"
    read -p "Reinstall? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf node_modules package-lock.json
        npm install
    fi
else
    npm install
fi

# Verify critical packages
if [ -d "node_modules/dotenv" ]; then
    print_success "dotenv installed"
else
    print_error "dotenv not found, installing..."
    npm install dotenv
fi

if [ -d "node_modules/express" ]; then
    print_success "express installed"
else
    print_error "express not found, installing..."
    npm install express
fi

print_success "Backend dependencies ready!"

cd ..

echo ""
print_info "Step 2: Installing Frontend Dependencies..."
echo "----------------------------------------"

cd frontend

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_warning "Frontend node_modules already exists"
    read -p "Reinstall? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf node_modules package-lock.json
        npm install
    fi
else
    npm install
fi

print_success "Frontend dependencies ready!"

cd ..

echo ""
print_info "Step 3: Verifying Environment Configuration..."
echo "----------------------------------------"

if [ -f "backend/.env" ]; then
    print_success "Backend .env file exists"
else
    print_warning "Backend .env not found, creating from example..."
    cp backend/.env.example backend/.env
    print_success "Created backend/.env"
fi

echo ""
print_info "Step 4: Starting Services..."
echo "----------------------------------------"

# Kill any existing processes on ports 5000 and 3000
print_info "Checking for existing processes..."

if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Port 5000 is in use, killing process..."
    lsof -ti:5000 | xargs kill -9 2>/dev/null || true
    sleep 1
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Port 3000 is in use, killing process..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    sleep 1
fi

print_success "Ports are clear!"

echo ""
print_success "=========================================="
print_success "🎉 Setup Complete! Starting servers..."
print_success "=========================================="
echo ""

print_info "Backend will start on: http://localhost:5000"
print_info "Frontend will start on: http://localhost:3000"
echo ""

# Start backend in background
print_info "Starting Backend Server..."
cd backend
node server.js &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Check if backend is running
if ps -p $BACKEND_PID > /dev/null; then
    print_success "Backend server started (PID: $BACKEND_PID)"
else
    print_error "Backend server failed to start"
    exit 1
fi

# Start frontend
print_info "Starting Frontend Server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
sleep 3

# Check if frontend is running
if ps -p $FRONTEND_PID > /dev/null; then
    print_success "Frontend server started (PID: $FRONTEND_PID)"
else
    print_error "Frontend server failed to start"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

echo ""
print_success "=========================================="
print_success "✨ SurviveRoute AI is now running!"
print_success "=========================================="
echo ""
print_info "Access the application:"
echo "  🌐 Frontend: http://localhost:3000"
echo "  🔌 Backend API: http://localhost:5000"
echo "  ❤️  Health Check: http://localhost:5000/health"
echo ""
print_info "To stop the servers:"
echo "  Press Ctrl+C or run: kill $BACKEND_PID $FRONTEND_PID"
echo ""
print_success "Happy navigating! 🚗💨"

# Keep script running
wait

# Made with Bob
