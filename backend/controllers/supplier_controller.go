package controllers

import (
	"strconv"

	"sims/dto"
	"sims/services"
	"sims/utils"

	"github.com/gin-gonic/gin"
)

type SupplierController struct {
	service *services.SupplierService
}

func NewSupplierController(service *services.SupplierService) *SupplierController {
	return &SupplierController{service: service}
}

func (ctrl *SupplierController) GetAll(c *gin.Context) {
	data, err := ctrl.service.GetAll()
	if err != nil {
		utils.InternalError(c, "Gagal mengambil data")
		return
	}
	utils.OK(c, "Data supplier", data)
}

func (ctrl *SupplierController) GetByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	data, err := ctrl.service.GetByID(uint(id))
	if err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Detail supplier", data)
}

func (ctrl *SupplierController) Create(c *gin.Context) {
	var req dto.SupplierRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}
	data, err := ctrl.service.Create(req)
	if err != nil {
		utils.InternalError(c, err.Error())
		return
	}
	utils.Created(c, "Supplier berhasil ditambahkan", data)
}

func (ctrl *SupplierController) Update(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var req dto.SupplierRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}
	data, err := ctrl.service.Update(uint(id), req)
	if err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Supplier berhasil diupdate", data)
}

func (ctrl *SupplierController) Delete(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := ctrl.service.Delete(uint(id)); err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Supplier berhasil dihapus", nil)
}