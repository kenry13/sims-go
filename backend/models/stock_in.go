package models

import "time"

type StockIn struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	ItemID    uint      `json:"item_id"`
	UserID    uint      `json:"user_id"`
	Quantity  int       `json:"quantity"`
	Date      string    `gorm:"type:date" json:"date"`
	Note      *string   `json:"note"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	Item Item `gorm:"foreignKey:ItemID" json:"item,omitempty"`
	User User `gorm:"foreignKey:UserID" json:"user,omitempty"`
}