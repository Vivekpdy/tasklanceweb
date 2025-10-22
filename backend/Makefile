.PHONY: run build test clean migrate-up migrate-down

# Run the application
run:
	go run main.go

# Build the application
build:
	go build -o bin/tasklance-api main.go

# Run tests
test:
	go test -v ./...

# Clean build artifacts
clean:
	rm -rf bin/
	rm -rf tmp/

# Install dependencies
deps:
	go mod download
	go mod tidy

# Run with hot reload (requires Air)
dev:
	air

# Format code
fmt:
	go fmt ./...

# Run linter
lint:
	golangci-lint run

# Create .env file from example
setup:
	cp .env.example .env
	@echo "Please edit .env file with your configuration"
