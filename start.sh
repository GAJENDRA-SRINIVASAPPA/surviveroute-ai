#!/bin/bash

# SurviveRoute AI - Startup Script
# This script starts the complete application stack

set -e

echo "🚀 Starting SurviveRoute AI..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker is not installed. Please install Docker first.${NC}"
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker Compose is not installed. Please install Docker Compose first.${NC}"
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Environment file not found. Creating from template...${NC}"
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✅ Created backend/.env file${NC}"
    echo -e "${YELLOW}⚠️  Please edit backend/.env with your configuration before continuing.${NC}"
    echo ""
    read -p "Press Enter to continue after editing .env file..."
fi

echo -e "${BLUE}📦 Building Docker images...${NC}"
docker-compose build

echo ""
echo -e "${BLUE}🚀 Starting services...${NC}"
docker-compose up -d

echo ""
echo -e "${GREEN}✅ Services started successfully!${NC}"
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo -e "${GREEN}🌐 Application URLs:${NC}"
echo -e "  Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "  Backend:  ${BLUE}http://localhost:5000${NC}"
echo -e "  API Docs: ${BLUE}http://localhost:5000/api/health${NC}"
echo ""
echo -e "${GREEN}📝 Useful Commands:${NC}"
echo "  View logs:        docker-compose logs -f"
echo "  Stop services:    docker-compose down"
echo "  Restart services: docker-compose restart"
echo "  View status:      docker-compose ps"
echo ""
echo -e "${GREEN}🎉 SurviveRoute AI is now running!${NC}"
echo ""

# Made with Bob
