package controllers

import (
	"strconv"

	"sims/dto"
	"sims/services"
	"sims/utils"

	"github.com/gin-gonic/gin"
)

type CategoryController struct {
	service *services.CategoryService
}

func NewCategoryController(service *services.CategoryService) *CategoryController {
	return &CategoryController{service: service}
}

func (ctrl *CategoryController) GetAll(c *gin.Context) {
	data, err := ctrl.service.GetAll()
	if err != nil {
		utils.InternalError(c, "Gagal mengambil data")
		return
	}
	utils.OK(c, "Data kategori", data)
}

func (ctrl *CategoryController) GetByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	data, err := ctrl.service.GetByID(uint(id))
	if err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Detail kategori", data)
}

func (ctrl *CategoryController) Create(c *gin.Context) {
	var req dto.CategoryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}
	data, err := ctrl.service.Create(req)
	if err != nil {
		utils.InternalError(c, err.Error())
		return
	}
	utils.Created(c, "Kategori berhasil ditambahkan", data)
}

func (ctrl *CategoryController) Update(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var req dto.CategoryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}
	data, err := ctrl.service.Update(uint(id), req)
	if err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Kategori berhasil diupdate", data)
}

func (ctrl *CategoryController) Delete(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := ctrl.service.Delete(uint(id)); err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Kategori berhasil dihapus", nil)
}