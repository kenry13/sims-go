package dto

type ReportFilter struct {
	StartDate string `form:"start_date"`
	EndDate   string `form:"end_date"`
}

type ItemStatResponse struct {
	ID         uint   `json:"id"`
	Code       string `json:"code"`
	Name       string `json:"name"`
	Category   string `json:"category"`
	Stock      int    `json:"stock"`
	MinStock   int    `json:"min_stock"`
	TotalIn    int    `json:"total_in"`
	TotalOut   int    `json:"total_out"`
	IsLowStock bool   `json:"is_low_stock"`
}

type ReportSummary struct {
	TotalIn       int `json:"total_in"`
	TotalOut      int `json:"total_out"`
	TotalItems    int `json:"total_items"`
	LowStockItems int `json:"low_stock_items"`
}

type ReportResponse struct {
	Filters   ReportFilter       `json:"filters"`
	Summary   ReportSummary      `json:"summary"`
	StockIns  interface{}        `json:"stock_ins"`
	StockOuts interface{}        `json:"stock_outs"`
	ItemStats []ItemStatResponse `json:"item_stats"`
}