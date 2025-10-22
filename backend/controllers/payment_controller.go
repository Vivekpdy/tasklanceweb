package controllers

import (
	"net/http"

	"github.com/Vivekpdy/tasklanceweb/backend/config"
	"github.com/Vivekpdy/tasklanceweb/backend/models"
	"github.com/gin-gonic/gin"
)

func GetTaskPayments(c *gin.Context) {
	taskID := c.Param("taskId")

	var payments []models.Payment
	if err := config.DB.Preload("Client").Preload("Freelancer").Where("task_id = ?", taskID).Find(&payments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch payments"})
		return
	}

	c.JSON(http.StatusOK, payments)
}

type CreatePaymentInput struct {
	TaskID        uint    `json:"task_id" binding:"required"`
	Amount        float64 `json:"amount" binding:"required,gt=0"`
	PaymentMethod string  `json:"payment_method" binding:"required"`
}

func CreatePayment(c *gin.Context) {
	userID := c.GetUint("userID")

	var input CreatePaymentInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get task
	var task models.Task
	if err := config.DB.First(&task, input.TaskID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	if task.ClientID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only task owner can create payments"})
		return
	}

	if task.FreelancerID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Task has no assigned freelancer"})
		return
	}

	payment := models.Payment{
		TaskID:        input.TaskID,
		ClientID:      userID,
		FreelancerID:  *task.FreelancerID,
		Amount:        input.Amount,
		PaymentMethod: input.PaymentMethod,
		Status:        "pending",
	}

	if err := config.DB.Create(&payment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create payment"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Payment created successfully",
		"payment": payment,
	})
}

func UpdatePayment(c *gin.Context) {
	id := c.Param("id")

	var payment models.Payment
	if err := config.DB.First(&payment, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
		return
	}

	type UpdatePaymentInput struct {
		Status        string `json:"status" binding:"required,oneof=pending completed failed refunded"`
		TransactionID string `json:"transaction_id"`
	}

	var input UpdatePaymentInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	payment.Status = input.Status
	if input.TransactionID != "" {
		payment.TransactionID = input.TransactionID
	}

	if err := config.DB.Save(&payment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update payment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Payment updated successfully",
		"payment": payment,
	})
}
