package controllers

import (
	"net/http"

	"github.com/Vivekpdy/tasklanceweb/backend/config"
	"github.com/Vivekpdy/tasklanceweb/backend/models"
	"github.com/gin-gonic/gin"
)

func GetUserReviews(c *gin.Context) {
	userID := c.Param("userId")

	var reviews []models.Review
	if err := config.DB.Preload("Reviewer").Preload("Task").Where("reviewed_user_id = ?", userID).Find(&reviews).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch reviews"})
		return
	}

	c.JSON(http.StatusOK, reviews)
}

type CreateReviewInput struct {
	TaskID         uint   `json:"task_id" binding:"required"`
	ReviewedUserID uint   `json:"reviewed_user_id" binding:"required"`
	Rating         int    `json:"rating" binding:"required,min=1,max=5"`
	Comment        string `json:"comment"`
}

func CreateReview(c *gin.Context) {
	userID := c.GetUint("userID")

	var input CreateReviewInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if task exists and is completed
	var task models.Task
	if err := config.DB.First(&task, input.TaskID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	if task.Status != "completed" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Can only review completed tasks"})
		return
	}

	review := models.Review{
		TaskID:         input.TaskID,
		ReviewerID:     userID,
		ReviewedUserID: input.ReviewedUserID,
		Rating:         input.Rating,
		Comment:        input.Comment,
	}

	if err := config.DB.Create(&review).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create review"})
		return
	}

	// Update user rating
	var avgRating float64
	config.DB.Model(&models.Review{}).Where("reviewed_user_id = ?", input.ReviewedUserID).Select("AVG(rating)").Scan(&avgRating)
	config.DB.Model(&models.User{}).Where("id = ?", input.ReviewedUserID).Update("rating", avgRating)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Review created successfully",
		"review":  review,
	})
}
