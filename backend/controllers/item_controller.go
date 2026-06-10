package controllers

import (
	"strconv"

	"sims/dto"
	"sims/services"
	"sims/utils"

	"github.com/gin-gonic/gin"
)

type ItemController struct {
	service *services.ItemService
}

func NewItemController(service *services.ItemService) *ItemController {
	return &ItemController{service: service}
}

// GET /api/items
func (ctrl *ItemController) GetAll(c *gin.Context) {
	items, err := ctrl.service.GetAll()
	if err != nil {
		utils.InternalError(c, "Gagal mengambil data item")
		return
	}
	utils.OK(c, "Data item", items)
}

// GET /api/items/:id
func (ctrl *ItemController) GetByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		utils.BadRequest(c, "ID tidak valid")
		return
	}
	item, err := ctrl.service.GetByID(uint(id))
	if err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Detail item", item)
}

// POST /api/items
func (ctrl *ItemController) Create(c *gin.Context) {
	var req dto.ItemRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}
	item, err := ctrl.service.Create(req)
	if err != nil {
		utils.InternalError(c, err.Error())
		return
	}
	utils.Created(c, "Item berhasil ditambahkan", item)
}

// PUT /api/items/:id
func (ctrl *ItemController) Update(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		utils.BadRequest(c, "ID tidak valid")
		return
	}
	var req dto.ItemRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}
	item, err := ctrl.service.Update(uint(id), req)
	if err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Item berhasil diupdate", item)
}

// DELETE /api/items/:id
func (ctrl *ItemController) Delete(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		utils.BadRequest(c, "ID tidak valid")
		return
	}
	if err := ctrl.service.Delete(uint(id)); err != nil {
		utils.NotFound(c, err.Error())
		return
	}
	utils.OK(c, "Item berhasil dihapus", nil)
}