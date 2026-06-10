package controllers

import (
	"strconv"

	"sims/dto"
	"sims/services"
	"sims/utils"

	"github.com/gin-gonic/gin"
)

type StockController struct {
	service *services.StockService
}

func NewStockController(service *services.StockService) *StockController {
	return &StockController{service: service}
}

// --- Stock In ---
func (ctrl *StockController) GetAllStockIn(c *gin.Context) {
	data, err := ctrl.service.GetAllStockIn()
	if err != nil {
		utils.InternalError(c, "Gagal mengambil data")
		return
	}
	utils.OK(c, "Data stock in", data)
}

func (ctrl *StockController) CreateStockIn(c *gin.Context) {
	var req dto.StockInRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}
	userID := c.GetUint("user_id")
	data, err := ctrl.service.CreateStockIn(userID, req)
	if err != nil {
		utils.BadRequest(c, err.Error())
		return
	}
	utils.Created(c, "Stock in berhasil dicatat", data)
}

func (ctrl *StockController) DeleteStockIn(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := ctrl.service.DeleteStockIn(uint(id)); err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Stock in berhasil dihapus", nil)
}

// --- Stock Out ---
func (ctrl *StockController) GetAllStockOut(c *gin.Context) {
	data, err := ctrl.service.GetAllStockOut()
	if err != nil {
		utils.InternalError(c, "Gagal mengambil data")
		return
	}
	utils.OK(c, "Data stock out", data)
}

func (ctrl *StockController) CreateStockOut(c *gin.Context) {
	var req dto.StockOutRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}
	userID := c.GetUint("user_id")
	data, err := ctrl.service.CreateStockOut(userID, req)
	if err != nil {
		utils.BadRequest(c, err.Error())
		return
	}
	utils.Created(c, "Stock out berhasil dicatat", data)
}

func (ctrl *StockController) DeleteStockOut(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := ctrl.service.DeleteStockOut(uint(id)); err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Stock out berhasil dihapus", nil)
}