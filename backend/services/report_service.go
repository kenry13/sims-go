package services

import (
	"time"

	"sims/dto"
	"sims/repositories"
)

type ReportService struct {
	repo *repositories.ReportRepository
}

func NewReportService(repo *repositories.ReportRepository) *ReportService {
	return &ReportService{repo: repo}
}

func (s *ReportService) GetReport(filter dto.ReportFilter) (*dto.ReportResponse, error) {
	// Default date range: 30 hari terakhir (sama seperti Laravel)
	if filter.StartDate == "" {
		filter.StartDate = time.Now().AddDate(0, 0, -30).Format("2006-01-02")
	}
	if filter.EndDate == "" {
		filter.EndDate = time.Now().Format("2006-01-02")
	}

	// Stock ins & outs dalam range
	stockIns, err := s.repo.GetStockInsByDateRange(filter.StartDate, filter.EndDate)
	if err != nil {
		return nil, err
	}

	stockOuts, err := s.repo.GetStockOutsByDateRange(filter.StartDate, filter.EndDate)
	if err != nil {
		return nil, err
	}

	// Item stats (sama seperti ->map() di Laravel)
	items, err := s.repo.GetAllItemsWithCategory()
	if err != nil {
		return nil, err
	}

	var itemStats []dto.ItemStatResponse
	lowStockCount := 0

	for _, item := range items {
		totalIn := s.repo.SumStockInByItem(item.ID)
		totalOut := s.repo.SumStockOutByItem(item.ID)
		isLowStock := item.Stock <= item.MinStock

		categoryName := "-"
		if item.Category.Name != "" {
			categoryName = item.Category.Name
		}

		if isLowStock {
			lowStockCount++
		}

		itemStats = append(itemStats, dto.ItemStatResponse{
			ID:         item.ID,
			Code:       item.Code,
			Name:       item.Name,
			Category:   categoryName,
			Stock:      item.Stock,
			MinStock:   item.MinStock,
			TotalIn:    totalIn,
			TotalOut:   totalOut,
			IsLowStock: isLowStock,
		})
	}

	// Summary
	totalIn := 0
	for _, s := range stockIns {
		totalIn += s.Quantity
	}
	totalOut := 0
	for _, s := range stockOuts {
		totalOut += s.Quantity
	}

	return &dto.ReportResponse{
		Filters: filter,
		Summary: dto.ReportSummary{
			TotalIn:       totalIn,
			TotalOut:      totalOut,
			TotalItems:    len(itemStats),
			LowStockItems: lowStockCount,
		},
		StockIns:  stockIns,
		StockOuts: stockOuts,
		ItemStats: itemStats,
	}, nil
}