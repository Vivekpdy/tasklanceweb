# Tasklance Backend - Golang API

A RESTful API backend for the Tasklance freelancing platform built with Go, Gin framework, and MongoDB.

## Tech Stack

- **Language**: Go 1.21+
- **Web Framework**: Gin
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

## Project Structure

```
backend/
├── config/              # Configuration files
│   └── database.go      # MongoDB connection and initialization
├── controllers/         # Request handlers
│   ├── auth_controller.go
│   ├── user_controller.go
│   ├── task_controller.go
│   ├── bid_controller.go
│   ├── review_controller.go
│   └── payment_controller.go
├── middleware/          # Middleware functions
│   ├── auth.go          # JWT authentication middleware
│   └── cors.go          # CORS middleware
├── models/              # Database models
│   ├── user.go
│   ├── task.go
│   ├── bid.go
│   ├── review.go
│   └── payment.go
├── routes/              # Route definitions
│   └── routes.go
├── utils/               # Utility functions
│   ├── jwt.go           # JWT token generation and validation
│   └── password.go      # Password hashing utilities
├── .env.example         # Environment variables template
├── .gitignore
├── go.mod               # Go module dependencies
├── main.go              # Application entry point
└── README.md
```

## Features

- User authentication (Register/Login) with JWT
- Role-based access control (Client/Freelancer)
- Task management (CRUD operations)
- Bidding system for tasks
- Review and rating system
- Payment tracking
- MongoDB with indexes
- RESTful API design
- CORS support for frontend integration

## Prerequisites

- Go 1.21 or higher
- MongoDB 5.0 or higher
- Git

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   go mod download
   ```

3. **Set up MongoDB**
   
   Install MongoDB:
   - **macOS**: `brew install mongodb-community`
   - **Linux**: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)
   - **Windows**: Download from [MongoDB website](https://www.mongodb.com/try/download/community)
   
   Start MongoDB:
   ```bash
   # macOS/Linux
   brew services start mongodb-community
   # or
   mongod --dbpath /path/to/data/directory
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

5. **Run the application**
   ```bash
   go run main.go
   ```

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Users (Protected)
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update current user profile
- `GET /api/v1/users/:id` - Get user by ID

### Tasks (Protected)
- `GET /api/v1/tasks` - Get all tasks (with filters)
- `GET /api/v1/tasks/:id` - Get task by ID
- `POST /api/v1/tasks` - Create new task (Client only)
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Bids (Protected)
- `GET /api/v1/bids/task/:taskId` - Get all bids for a task
- `POST /api/v1/bids` - Create new bid (Freelancer only)
- `PUT /api/v1/bids/:id` - Update bid
- `POST /api/v1/bids/:id/accept` - Accept bid (Client only)

### Reviews (Protected)
- `GET /api/v1/reviews/user/:userId` - Get all reviews for a user
- `POST /api/v1/reviews` - Create new review

### Payments (Protected)
- `GET /api/v1/payments/task/:taskId` - Get all payments for a task
- `POST /api/v1/payments` - Create new payment
- `PUT /api/v1/payments/:id` - Update payment status

## Database Collections

### users
- ObjectID, Email (unique), Password (hashed)
- FirstName, LastName, UserType (client/freelancer)
- ProfileImage, Bio, Skills (array)
- Rating, IsVerified

### tasks
- ObjectID, Title, Description, Budget, Deadline
- Status (open/in_progress/completed/cancelled)
- Category, RequiredSkills (array), Attachments (array)
- ClientID, FreelancerID (optional)

### bids
- ObjectID, Amount, ProposedDeadline, CoverLetter
- Status (pending/accepted/rejected)
- TaskID, FreelancerID

### reviews
- ObjectID, Rating (1-5), Comment
- TaskID, ReviewerID, ReviewedUserID

### payments
- ObjectID, Amount, Status, PaymentMethod
- TransactionID, PaymentGateway
- TaskID, ClientID, FreelancerID

## Development

### Run with hot reload (using Air)
```bash
# Install Air
go install github.com/cosmtrek/air@latest

# Run with hot reload
air
```

### Run tests
```bash
go test ./...
```

### Build for production
```bash
go build -o tasklance-api
./tasklance-api
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 8080 |
| GIN_MODE | Gin mode (debug/release) | debug |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017 |
| DB_NAME | Database name | tasklance |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRY | JWT token expiry | 24h |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

## MongoDB Indexes

The application automatically creates indexes on:
- `users.email` (unique)
- `tasks.client_id`, `tasks.freelancer_id`, `tasks.status`, `tasks.category`
- `bids.task_id`, `bids.freelancer_id`
- `reviews.task_id`, `reviews.reviewed_user_id`
- `payments.task_id`, `payments.transaction_id`

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected routes with middleware
- CORS configuration for frontend
- Input validation on all endpoints
- MongoDB indexes for performance

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Project Structure

```
backend/
├── config/              # Configuration files
│   └── database.go      # Database connection and initialization
├── controllers/         # Request handlers
│   ├── auth_controller.go
│   ├── user_controller.go
│   ├── task_controller.go
│   ├── bid_controller.go
│   ├── review_controller.go
│   └── payment_controller.go
├── middleware/          # Middleware functions
│   ├── auth.go          # JWT authentication middleware
│   └── cors.go          # CORS middleware
├── models/              # Database models
│   ├── user.go
│   ├── task.go
│   ├── bid.go
│   ├── review.go
│   └── payment.go
├── routes/              # Route definitions
│   └── routes.go
├── utils/               # Utility functions
│   ├── jwt.go           # JWT token generation and validation
│   └── password.go      # Password hashing utilities
├── .env.example         # Environment variables template
├── .gitignore
├── go.mod               # Go module dependencies
├── main.go              # Application entry point
└── README.md
```

## Features

- User authentication (Register/Login) with JWT
- Role-based access control (Client/Freelancer)
- Task management (CRUD operations)
- Bidding system for tasks
- Review and rating system
- Payment tracking
- PostgreSQL database with GORM
- RESTful API design
- CORS support for frontend integration

## Prerequisites

- Go 1.21 or higher
- PostgreSQL 12 or higher
- Git

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   go mod download
   ```

3. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb tasklance
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret
   ```

5. **Run the application**
   ```bash
   go run main.go
   ```

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Users (Protected)
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update current user profile
- `GET /api/v1/users/:id` - Get user by ID

### Tasks (Protected)
- `GET /api/v1/tasks` - Get all tasks (with filters)
- `GET /api/v1/tasks/:id` - Get task by ID
- `POST /api/v1/tasks` - Create new task (Client only)
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Bids (Protected)
- `GET /api/v1/bids/task/:taskId` - Get all bids for a task
- `POST /api/v1/bids` - Create new bid (Freelancer only)
- `PUT /api/v1/bids/:id` - Update bid
- `POST /api/v1/bids/:id/accept` - Accept bid (Client only)

### Reviews (Protected)
- `GET /api/v1/reviews/user/:userId` - Get all reviews for a user
- `POST /api/v1/reviews` - Create new review

### Payments (Protected)
- `GET /api/v1/payments/task/:taskId` - Get all payments for a task
- `POST /api/v1/payments` - Create new payment
- `PUT /api/v1/payments/:id` - Update payment status

## Database Models

### User
- Email, Password, FirstName, LastName
- UserType (client/freelancer)
- ProfileImage, Bio, Skills
- Rating, IsVerified

### Task
- Title, Description, Budget, Deadline
- Status (open/in_progress/completed/cancelled)
- Category, RequiredSkills
- ClientID, FreelancerID (optional)

### Bid
- Amount, ProposedDeadline, CoverLetter
- Status (pending/accepted/rejected)
- TaskID, FreelancerID

### Review
- Rating (1-5), Comment
- TaskID, ReviewerID, ReviewedUserID

### Payment
- Amount, Status, PaymentMethod
- TransactionID, PaymentGateway
- TaskID, ClientID, FreelancerID

## Development

### Run with hot reload (using Air)
```bash
# Install Air
go install github.com/cosmtrek/air@latest

# Run with hot reload
air
```

### Run tests
```bash
go test ./...
```

### Build for production
```bash
go build -o tasklance-api
./tasklance-api
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 8080 |
| GIN_MODE | Gin mode (debug/release) | debug |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | tasklance |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRY | JWT token expiry | 24h |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected routes with middleware
- CORS configuration for frontend
- Input validation on all endpoints

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
