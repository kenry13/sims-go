package controllers

import (
	"sims/dto"
	"sims/services"
	"sims/utils"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	service *services.AuthService
}

func NewAuthController(service *services.AuthService) *AuthController {
	return &AuthController{service: service}
}

func (ctrl *AuthController) Login(c *gin.Context) {
	var req dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}

	result, err := ctrl.service.Login(req)
	if err != nil {
		utils.Unauthorized(c, err.Error())
		return
	}

	utils.OK(c, "Login berhasil", result)
}

func (ctrl *AuthController) Register(c *gin.Context) {
	var req dto.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}

	result, err := ctrl.service.Register(req)
	if err != nil {
		utils.BadRequest(c, err.Error())
		return
	}

	utils.Created(c, "Registrasi berhasil", result)
}