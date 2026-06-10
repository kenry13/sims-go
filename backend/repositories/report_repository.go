package repositories

import (
	"sims/models"

	"gorm.io/gorm"
)

type ReportRepository struct {
	db *gorm.DB
}

func NewReportRepository(db *gorm.DB) *ReportRepository {
	return &ReportRepository{db: db}
}

func (r *ReportRepository) GetStockInsByDateRange(start, end string) ([]models.StockIn, error) {
	var stockIns []models.StockIn
	err := r.db.Preload("Item").Preload("User").
		Where("date BETWEEN ? AND ?", start, end).
		Order("created_at DESC").
		Find(&stockIns).Error
	return stockIns, err
}

func (r *ReportRepository) GetStockOutsByDateRange(start, end string) ([]models.StockOut, error) {
	var stockOuts []models.StockOut
	err := r.db.Preload("Item").Preload("User").
		Where("date BETWEEN ? AND ?", start, end).
		Order("created_at DESC").
		Find(&stockOuts).Error
	return stockOuts, err
}

func (r *ReportRepository) GetAllItemsWithCategory() ([]models.Item, error) {
	var items []models.Item
	err := r.db.Preload("Category").Find(&items).Error
	return items, err
}

func (r *ReportRepository) SumStockInByItem(itemID uint) int {
	var total int64
	r.db.Model(&models.StockIn{}).
		Where("item_id = ?", itemID).
		Select("COALESCE(SUM(quantity), 0)").
		Scan(&total)
	return int(total)
}

func (r *ReportRepository) SumStockOutByItem(itemID uint) int {
	var total int64
	r.db.Model(&models.StockOut{}).
		Where("item_id = ?", itemID).
		Select("COALESCE(SUM(quantity), 0)").
		Scan(&total)
	return int(total)
}