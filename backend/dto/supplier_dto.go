package dto

type SupplierRequest struct {
	Name    string  `json:"name" binding:"required"`
	Phone   *string `json:"phone"`
	Address *string `json:"address"`
}