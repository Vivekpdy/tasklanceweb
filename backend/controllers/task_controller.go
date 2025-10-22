package controllers

import (
	"net/http"

	"github.com/Vivekpdy/tasklanceweb/backend/config"
	"github.com/Vivekpdy/tasklanceweb/backend/models"
	"github.com/gin-gonic/gin"
)

func GetTasks(c *gin.Context) {
	var tasks []models.Task
	
	query := config.DB.Preload("Client").Preload("Freelancer")
	
	// Filter by status
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	
	// Filter by category
	if category := c.Query("category"); category != "" {
		query = query.Where("category = ?", category)
	}

	if err := query.Find(&tasks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch tasks"})
		return
	}

	c.JSON(http.StatusOK, tasks)
}

func GetTask(c *gin.Context) {
	id := c.Param("id")

	var task models.Task
	if err := config.DB.Preload("Client").Preload("Freelancer").Preload("Bids").First(&task, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	c.JSON(http.StatusOK, task)
}

type CreateTaskInput struct {
	Title          string  `json:"title" binding:"required"`
	Description    string  `json:"description" binding:"required"`
	Budget         float64 `json:"budget" binding:"required,gt=0"`
	Deadline       string  `json:"deadline" binding:"required"`
	Category       string  `json:"category"`
	RequiredSkills string  `json:"required_skills"`
}

func CreateTask(c *gin.Context) {
	userID := c.GetUint("userID")
	userType := c.GetString("userType")

	if userType != "client" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only clients can create tasks"})
		return
	}

	var input CreateTaskInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	task := models.Task{
		Title:          input.Title,
		Description:    input.Description,
		Budget:         input.Budget,
		Category:       input.Category,
		RequiredSkills: input.RequiredSkills,
		ClientID:       userID,
		Status:         "open",
	}

	if err := config.DB.Create(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create task"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Task created successfully",
		"task":    task,
	})
}

func UpdateTask(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetUint("userID")

	var task models.Task
	if err := config.DB.First(&task, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	if task.ClientID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only update your own tasks"})
		return
	}

	var input CreateTaskInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	task.Title = input.Title
	task.Description = input.Description
	task.Budget = input.Budget
	task.Category = input.Category
	task.RequiredSkills = input.RequiredSkills

	if err := config.DB.Save(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Task updated successfully",
		"task":    task,
	})
}

func DeleteTask(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetUint("userID")

	var task models.Task
	if err := config.DB.First(&task, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	if task.ClientID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only delete your own tasks"})
		return
	}

	if err := config.DB.Delete(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete task"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task deleted successfully"})
}
