package models

import "time"

type Item struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Code        string    `gorm:"uniqueIndex" json:"code"`
	Name        string    `json:"name"`
	CategoryID  uint      `json:"category_id"`
	SupplierID  uint      `json:"supplier_id"`
	Stock       int       `json:"stock"`
	MinStock    int       `json:"min_stock"`
	Unit        string    `json:"unit"`
	Description *string   `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	Category Category `gorm:"foreignKey:CategoryID" json:"category,omitempty"`
	Supplier Supplier `gorm:"foreignKey:SupplierID" json:"supplier,omitempty"`
}