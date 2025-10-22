package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Payment struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Amount         float64            `bson:"amount" json:"amount"`
	Status         string             `bson:"status" json:"status"` // pending, completed, failed, refunded
	PaymentMethod  string             `bson:"payment_method" json:"payment_method"`
	TransactionID  string             `bson:"transaction_id,omitempty" json:"transaction_id,omitempty"`
	PaymentGateway string             `bson:"payment_gateway,omitempty" json:"payment_gateway,omitempty"`
	TaskID         primitive.ObjectID `bson:"task_id" json:"task_id"`
	ClientID       primitive.ObjectID `bson:"client_id" json:"client_id"`
	FreelancerID   primitive.ObjectID `bson:"freelancer_id" json:"freelancer_id"`
	CreatedAt      time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt      time.Time          `bson:"updated_at" json:"updated_at"`
}
