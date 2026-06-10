package main

import (
	"log"

	"sims/config"
	"sims/controllers"
	"sims/database"
	"sims/repositories"
	"sims/routes"
	"sims/services"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()
	db := database.Connect(cfg)

	// Auth
	userRepo := repositories.NewUserRepository(db)
	authService := services.NewAuthService(userRepo, cfg)
	authCtrl := controllers.NewAuthController(authService)

	// Item
	itemRepo := repositories.NewItemRepository(db)
	itemService := services.NewItemService(itemRepo)
	itemCtrl := controllers.NewItemController(itemService)

	// Category
	categoryRepo := repositories.NewCategoryRepository(db)
	categoryService := services.NewCategoryService(categoryRepo)
	categoryCtrl := controllers.NewCategoryController(categoryService)

	// Supplier
	supplierRepo := repositories.NewSupplierRepository(db)
	supplierService := services.NewSupplierService(supplierRepo)
	supplierCtrl := controllers.NewSupplierController(supplierService)

	// Stock
	stockInRepo := repositories.NewStockInRepository(db)
	stockOutRepo := repositories.NewStockOutRepository(db)
	stockService := services.NewStockService(stockInRepo, stockOutRepo, itemRepo)
	stockCtrl := controllers.NewStockController(stockService)

	// Report
	reportRepo := repositories.NewReportRepository(db)
	reportService := services.NewReportService(reportRepo)
	reportCtrl := controllers.NewReportController(reportService)

	r := gin.Default()
	routes.Setup(r, cfg, authCtrl, itemCtrl, categoryCtrl, supplierCtrl, stockCtrl, reportCtrl)

	log.Println("🚀 Server jalan di http://localhost:" + cfg.AppPort)
	r.Run(":" + cfg.AppPort)
}