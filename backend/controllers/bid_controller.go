package controllers

import (
	"net/http"

	"github.com/Vivekpdy/tasklanceweb/backend/config"
	"github.com/Vivekpdy/tasklanceweb/backend/models"
	"github.com/gin-gonic/gin"
)

func GetTaskBids(c *gin.Context) {
	taskID := c.Param("taskId")

	var bids []models.Bid
	if err := config.DB.Preload("Freelancer").Where("task_id = ?", taskID).Find(&bids).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch bids"})
		return
	}

	c.JSON(http.StatusOK, bids)
}

type CreateBidInput struct {
	TaskID           uint    `json:"task_id" binding:"required"`
	Amount           float64 `json:"amount" binding:"required,gt=0"`
	ProposedDeadline string  `json:"proposed_deadline" binding:"required"`
	CoverLetter      string  `json:"cover_letter" binding:"required"`
}

func CreateBid(c *gin.Context) {
	userID := c.GetUint("userID")
	userType := c.GetString("userType")

	if userType != "freelancer" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only freelancers can create bids"})
		return
	}

	var input CreateBidInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if task exists
	var task models.Task
	if err := config.DB.First(&task, input.TaskID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	// Check if bid already exists
	var existingBid models.Bid
	if err := config.DB.Where("task_id = ? AND freelancer_id = ?", input.TaskID, userID).First(&existingBid).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "You have already bid on this task"})
		return
	}

	bid := models.Bid{
		TaskID:       input.TaskID,
		FreelancerID: userID,
		Amount:       input.Amount,
		CoverLetter:  input.CoverLetter,
		Status:       "pending",
	}

	if err := config.DB.Create(&bid).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create bid"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Bid created successfully",
		"bid":     bid,
	})
}

func UpdateBid(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetUint("userID")

	var bid models.Bid
	if err := config.DB.First(&bid, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bid not found"})
		return
	}

	if bid.FreelancerID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only update your own bids"})
		return
	}

	var input CreateBidInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	bid.Amount = input.Amount
	bid.CoverLetter = input.CoverLetter

	if err := config.DB.Save(&bid).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update bid"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Bid updated successfully",
		"bid":     bid,
	})
}

func AcceptBid(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetUint("userID")

	var bid models.Bid
	if err := config.DB.Preload("Task").First(&bid, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bid not found"})
		return
	}

	// Check if user is the task owner
	if bid.Task.ClientID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only task owner can accept bids"})
		return
	}

	// Update bid status
	bid.Status = "accepted"
	if err := config.DB.Save(&bid).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to accept bid"})
		return
	}

	// Update task status and assign freelancer
	bid.Task.Status = "in_progress"
	bid.Task.FreelancerID = &bid.FreelancerID
	if err := config.DB.Save(&bid.Task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Bid accepted successfully",
		"bid":     bid,
	})
}
