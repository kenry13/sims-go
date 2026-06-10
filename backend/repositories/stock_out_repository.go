package repositories

import (
	"sims/models"

	"gorm.io/gorm"
)

type StockOutRepository struct {
	db *gorm.DB
}

func NewStockOutRepository(db *gorm.DB) *StockOutRepository {
	return &StockOutRepository{db: db}
}

func (r *StockOutRepository) FindAll() ([]models.StockOut, error) {
	var stockOuts []models.StockOut
	err := r.db.Preload("Item").Preload("User").Find(&stockOuts).Error
	return stockOuts, err
}

func (r *StockOutRepository) FindByID(id uint) (*models.StockOut, error) {
	var stockOut models.StockOut
	err := r.db.Preload("Item").Preload("User").First(&stockOut, id).Error
	return &stockOut, err
}

func (r *StockOutRepository) Create(stockOut *models.StockOut) error {
	return r.db.Create(stockOut).Error
}

func (r *StockOutRepository) Delete(id uint) error {
	return r.db.Delete(&models.StockOut{}, id).Error
}