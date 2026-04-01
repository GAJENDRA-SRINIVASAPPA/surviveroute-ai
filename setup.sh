#!/bin/bash

# SurviveRoute AI - One-Command Setup Script
# This script sets up the entire application automatically

echo "🚀 SurviveRoute AI - Automated Setup"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${BLUE}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    echo "Please install npm"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) found${NC}"
echo -e "${GREEN}✅ npm $(npm -v) found${NC}"
echo ""

# Install backend dependencies
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
cd backend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend installation failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Backend dependencies installed${NC}"
cd ..
echo ""

# Install frontend dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend installation failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
cd ..
echo ""

# Create .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo -e "${BLUE}📝 Creating backend .env file...${NC}"
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✅ Backend .env file created${NC}"
    echo ""
fi

echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}To start the application:${NC}"
echo ""
echo -e "${BLUE}Option 1 - Use the start script:${NC}"
echo "  ./start.sh"
echo ""
echo -e "${BLUE}Option 2 - Manual start (2 terminals):${NC}"
echo "  Terminal 1: cd backend && PORT=5001 node server.js"
echo "  Terminal 2: cd frontend && npm start"
echo ""
echo -e "${YELLOW}The app will be available at:${NC}"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5001"
echo ""

# Made with Bob
