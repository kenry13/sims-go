package controllers

import (
	"sims/dto"
	"sims/services"
	"sims/utils"

	"github.com/gin-gonic/gin"
)

type ReportController struct {
	service *services.ReportService
}

func NewReportController(service *services.ReportService) *ReportController {
	return &ReportController{service: service}
}

// GET /api/reports?start_date=2026-01-01&end_date=2026-06-10
func (ctrl *ReportController) Index(c *gin.Context) {
	var filter dto.ReportFilter
	if err := c.ShouldBindQuery(&filter); err != nil {
		utils.BadRequest(c, err.Error())
		return
	}

	result, err := ctrl.service.GetReport(filter)
	if err != nil {
		utils.InternalError(c, "Gagal mengambil data report")
		return
	}

	utils.OK(c, "Data report", result)
}