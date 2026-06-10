package dto

type StockInRequest struct {
	ItemID   uint    `json:"item_id" binding:"required"`
	Quantity int     `json:"quantity" binding:"required,min=1"`
	Date     string  `json:"date" binding:"required"`
	Note     *string `json:"note"`
}

type StockOutRequest struct {
	ItemID   uint    `json:"item_id" binding:"required"`
	Quantity int     `json:"quantity" binding:"required,min=1"`
	Date     string  `json:"date" binding:"required"`
	Note     *string `json:"note"`
}