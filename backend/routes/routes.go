package routes

import (
	"os"

	"github.com/Vivekpdy/tasklanceweb/backend/controllers"
	"github.com/Vivekpdy/tasklanceweb/backend/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// CORS middleware
	router.Use(middleware.CORSMiddleware())

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
			"message": "Server is running",
		})
	})

	// API v1 routes
	v1 := router.Group("/api/v1")
	{
		// Public routes
		auth := v1.Group("/auth")
		{
			auth.POST("/register", controllers.Register)
			auth.POST("/login", controllers.Login)
		}

		// Protected routes
		protected := v1.Group("")
		protected.Use(middleware.AuthMiddleware())
		{
			// User routes
			users := protected.Group("/users")
			{
				users.GET("/me", controllers.GetCurrentUser)
				users.PUT("/me", controllers.UpdateUser)
				users.GET("/:id", controllers.GetUser)
			}

			// Task routes
			tasks := protected.Group("/tasks")
			{
				tasks.GET("", controllers.GetTasks)
				tasks.GET("/:id", controllers.GetTask)
				tasks.POST("", controllers.CreateTask)
				tasks.PUT("/:id", controllers.UpdateTask)
				tasks.DELETE("/:id", controllers.DeleteTask)
			}

			// Bid routes
			bids := protected.Group("/bids")
			{
				bids.GET("/task/:taskId", controllers.GetTaskBids)
				bids.POST("", controllers.CreateBid)
				bids.PUT("/:id", controllers.UpdateBid)
				bids.POST("/:id/accept", controllers.AcceptBid)
			}

			// Review routes
			reviews := protected.Group("/reviews")
			{
				reviews.GET("/user/:userId", controllers.GetUserReviews)
				reviews.POST("", controllers.CreateReview)
			}

			// Payment routes
			payments := protected.Group("/payments")
			{
				payments.GET("/task/:taskId", controllers.GetTaskPayments)
				payments.POST("", controllers.CreatePayment)
				payments.PUT("/:id", controllers.UpdatePayment)
			}
		}
	}

	// Serve uploaded files
	router.Static("/uploads", os.Getenv("UPLOAD_PATH"))

	return router
}
