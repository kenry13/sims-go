package routes

import (
	"sims/config"
	"sims/controllers"
	"sims/middleware"

	"github.com/gin-gonic/gin"
)

func Setup(
	r *gin.Engine,
	cfg *config.Config,
	authCtrl *controllers.AuthController,
	itemCtrl *controllers.ItemController,
	categoryCtrl *controllers.CategoryController,
	supplierCtrl *controllers.SupplierController,
	stockCtrl *controllers.StockController,
	reportCtrl *controllers.ReportController,
) {
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})

	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/login", authCtrl.Login)
			auth.POST("/register", authCtrl.Register)
		}

		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware(cfg))
		{
			// Items
			protected.GET("/items", itemCtrl.GetAll)
			protected.GET("/items/:id", itemCtrl.GetByID)
			protected.POST("/items", itemCtrl.Create)
			protected.PUT("/items/:id", itemCtrl.Update)
			protected.DELETE("/items/:id", itemCtrl.Delete)

			// Categories
			protected.GET("/categories", categoryCtrl.GetAll)
			protected.GET("/categories/:id", categoryCtrl.GetByID)
			protected.POST("/categories", categoryCtrl.Create)
			protected.PUT("/categories/:id", categoryCtrl.Update)
			protected.DELETE("/categories/:id", categoryCtrl.Delete)

			// Suppliers
			protected.GET("/suppliers", supplierCtrl.GetAll)
			protected.GET("/suppliers/:id", supplierCtrl.GetByID)
			protected.POST("/suppliers", supplierCtrl.Create)
			protected.PUT("/suppliers/:id", supplierCtrl.Update)
			protected.DELETE("/suppliers/:id", supplierCtrl.Delete)

			// Stock In
			protected.GET("/stock-in", stockCtrl.GetAllStockIn)
			protected.POST("/stock-in", stockCtrl.CreateStockIn)
			protected.DELETE("/stock-in/:id", stockCtrl.DeleteStockIn)

			// Stock Out
			protected.GET("/stock-out", stockCtrl.GetAllStockOut)
			protected.POST("/stock-out", stockCtrl.CreateStockOut)
			protected.DELETE("/stock-out/:id", stockCtrl.DeleteStockOut)

			// Reports
			protected.GET("/reports", reportCtrl.Index)
		}
	}
}