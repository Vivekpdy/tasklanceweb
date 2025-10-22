package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Email        string             `bson:"email" json:"email"`
	Password     string             `bson:"password" json:"-"`
	FirstName    string             `bson:"first_name" json:"first_name"`
	LastName     string             `bson:"last_name" json:"last_name"`
	UserType     string             `bson:"user_type" json:"user_type"` // client, freelancer, admin
	ProfileImage string             `bson:"profile_image,omitempty" json:"profile_image,omitempty"`
	Bio          string             `bson:"bio,omitempty" json:"bio,omitempty"`
	Skills       []string           `bson:"skills,omitempty" json:"skills,omitempty"`
	Rating       float64            `bson:"rating" json:"rating"`
	IsVerified   bool               `bson:"is_verified" json:"is_verified"`
	CreatedAt    time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt    time.Time          `bson:"updated_at" json:"updated_at"`
}

type UserResponse struct {
	ID           string    `json:"id"`
	Email        string    `json:"email"`
	FirstName    string    `json:"first_name"`
	LastName     string    `json:"last_name"`
	UserType     string    `json:"user_type"`
	ProfileImage string    `json:"profile_image,omitempty"`
	Bio          string    `json:"bio,omitempty"`
	Skills       []string  `json:"skills,omitempty"`
	Rating       float64   `json:"rating"`
	IsVerified   bool      `json:"is_verified"`
	CreatedAt    time.Time `json:"created_at"`
}

func (u *User) ToResponse() UserResponse {
	return UserResponse{
		ID:           u.ID.Hex(),
		Email:        u.Email,
		FirstName:    u.FirstName,
		LastName:     u.LastName,
		UserType:     u.UserType,
		ProfileImage: u.ProfileImage,
		Bio:          u.Bio,
		Skills:       u.Skills,
		Rating:       u.Rating,
		IsVerified:   u.IsVerified,
		CreatedAt:    u.CreatedAt,
	}
}
