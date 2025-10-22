package config

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoDB *mongo.Database

// InitDB initializes the MongoDB connection
func InitDB() {
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	dbName := os.Getenv("DB_NAME")
	if dbName == "" {
		dbName = "tasklance"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Ping the database
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	MongoDB = client.Database(dbName)
	log.Println("MongoDB connected successfully")

	// Create indexes
	createIndexes()
}

// GetDB returns the database instance
func GetDB() *mongo.Database {
	return MongoDB
}

// createIndexes creates necessary indexes for collections
func createIndexes() {
	ctx := context.Background()

	// User collection indexes
	userCollection := MongoDB.Collection("users")
	userCollection.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys:    map[string]interface{}{"email": 1},
		Options: options.Index().SetUnique(true),
	})

	// Task collection indexes
	taskCollection := MongoDB.Collection("tasks")
	taskCollection.Indexes().CreateMany(ctx, []mongo.IndexModel{
		{Keys: map[string]interface{}{"client_id": 1}},
		{Keys: map[string]interface{}{"freelancer_id": 1}},
		{Keys: map[string]interface{}{"status": 1}},
		{Keys: map[string]interface{}{"category": 1}},
	})

	// Bid collection indexes
	bidCollection := MongoDB.Collection("bids")
	bidCollection.Indexes().CreateMany(ctx, []mongo.IndexModel{
		{Keys: map[string]interface{}{"task_id": 1}},
		{Keys: map[string]interface{}{"freelancer_id": 1}},
	})

	// Review collection indexes
	reviewCollection := MongoDB.Collection("reviews")
	reviewCollection.Indexes().CreateMany(ctx, []mongo.IndexModel{
		{Keys: map[string]interface{}{"task_id": 1}},
		{Keys: map[string]interface{}{"reviewed_user_id": 1}},
	})

	// Payment collection indexes
	paymentCollection := MongoDB.Collection("payments")
	paymentCollection.Indexes().CreateMany(ctx, []mongo.IndexModel{
		{Keys: map[string]interface{}{"task_id": 1}},
		{Keys: map[string]interface{}{"transaction_id": 1}},
	})

	log.Println("MongoDB indexes created successfully")
}
