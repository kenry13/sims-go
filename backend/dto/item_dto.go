package dto

type ItemRequest struct {
	Code        string  `json:"code" binding:"required"`
	Name        string  `json:"name" binding:"required"`
	CategoryID  uint    `json:"category_id" binding:"required"`
	SupplierID  uint    `json:"supplier_id" binding:"required"`
	Stock       int     `json:"stock"`
	MinStock    int     `json:"min_stock"`
	Unit        string  `json:"unit" binding:"required"`
	Description *string `json:"description"`
}