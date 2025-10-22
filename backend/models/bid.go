package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Bid struct {
	ID               primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Amount           float64            `bson:"amount" json:"amount"`
	ProposedDeadline time.Time          `bson:"proposed_deadline" json:"proposed_deadline"`
	CoverLetter      string             `bson:"cover_letter" json:"cover_letter"`
	Status           string             `bson:"status" json:"status"` // pending, accepted, rejected
	TaskID           primitive.ObjectID `bson:"task_id" json:"task_id"`
	FreelancerID     primitive.ObjectID `bson:"freelancer_id" json:"freelancer_id"`
	CreatedAt        time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt        time.Time          `bson:"updated_at" json:"updated_at"`
}
