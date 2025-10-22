package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Task struct {
	ID             primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	Title          string              `bson:"title" json:"title"`
	Description    string              `bson:"description" json:"description"`
	Budget         float64             `bson:"budget" json:"budget"`
	Deadline       time.Time           `bson:"deadline" json:"deadline"`
	Status         string              `bson:"status" json:"status"` // open, in_progress, completed, cancelled
	Category       string              `bson:"category" json:"category"`
	RequiredSkills []string            `bson:"required_skills,omitempty" json:"required_skills,omitempty"`
	Attachments    []string            `bson:"attachments,omitempty" json:"attachments,omitempty"`
	ClientID       primitive.ObjectID  `bson:"client_id" json:"client_id"`
	FreelancerID   *primitive.ObjectID `bson:"freelancer_id,omitempty" json:"freelancer_id,omitempty"`
	CreatedAt      time.Time           `bson:"created_at" json:"created_at"`
	UpdatedAt      time.Time           `bson:"updated_at" json:"updated_at"`
}
