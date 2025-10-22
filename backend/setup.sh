#!/bin/bash

# Tasklance Backend MongoDB Setup Script

echo "🚀 Setting up Tasklance Backend with MongoDB..."
echo ""

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go 1.21 or higher."
    exit 1
fi

echo "✅ Go is installed: $(go version)"

# Check if MongoDB is running
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.version()" &> /dev/null; then
        echo "✅ MongoDB is running: $(mongosh --quiet --eval 'db.version()')"
    else
        echo "⚠️  MongoDB is installed but not running. Starting MongoDB..."
        if command -v brew &> /dev/null; then
            brew services start mongodb-community
        else
            echo "Please start MongoDB manually: mongod --dbpath /path/to/data"
        fi
    fi
else
    echo "❌ MongoDB is not installed. Please install MongoDB 5.0 or higher."
    echo "   macOS: brew install mongodb-community"
    echo "   Ubuntu: https://docs.mongodb.com/manual/installation/"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists"
fi

# Install Go dependencies
echo ""
echo "📦 Installing Go dependencies..."
go mod download
go mod tidy

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Edit .env file with your MongoDB URI and JWT secret"
echo "   2. Run: go run main.go"
echo "   3. The server will start on http://localhost:8080"
echo ""
echo "📚 MongoDB Collections that will be created:"
echo "   - users"
echo "   - tasks"
echo "   - bids"
echo "   - reviews"
echo "   - payments"
echo ""
