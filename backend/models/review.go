package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Review struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Rating         int                `bson:"rating" json:"rating"` // 1-5
	Comment        string             `bson:"comment" json:"comment"`
	TaskID         primitive.ObjectID `bson:"task_id" json:"task_id"`
	ReviewerID     primitive.ObjectID `bson:"reviewer_id" json:"reviewer_id"`
	ReviewedUserID primitive.ObjectID `bson:"reviewed_user_id" json:"reviewed_user_id"`
	CreatedAt      time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt      time.Time          `bson:"updated_at" json:"updated_at"`
}
