package repositories

import (
	"sims/models"

	"gorm.io/gorm"
)

type StockInRepository struct {
	db *gorm.DB
}

func NewStockInRepository(db *gorm.DB) *StockInRepository {
	return &StockInRepository{db: db}
}

func (r *StockInRepository) FindAll() ([]models.StockIn, error) {
	var stockIns []models.StockIn
	err := r.db.Preload("Item").Preload("User").Find(&stockIns).Error
	return stockIns, err
}

func (r *StockInRepository) FindByID(id uint) (*models.StockIn, error) {
	var stockIn models.StockIn
	err := r.db.Preload("Item").Preload("User").First(&stockIn, id).Error
	return &stockIn, err
}

func (r *StockInRepository) Create(stockIn *models.StockIn) error {
	return r.db.Create(stockIn).Error
}

func (r *StockInRepository) Delete(id uint) error {
	return r.db.Delete(&models.StockIn{}, id).Error
}