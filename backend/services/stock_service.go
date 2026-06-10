package services

import (
	"errors"

	"sims/dto"
	"sims/models"
	"sims/repositories"

	"gorm.io/gorm"
)

type StockService struct {
	stockInRepo  *repositories.StockInRepository
	stockOutRepo *repositories.StockOutRepository
	itemRepo     *repositories.ItemRepository
}

func NewStockService(
	stockInRepo *repositories.StockInRepository,
	stockOutRepo *repositories.StockOutRepository,
	itemRepo *repositories.ItemRepository,
) *StockService {
	return &StockService{stockInRepo: stockInRepo, stockOutRepo: stockOutRepo, itemRepo: itemRepo}
}

// --- Stock In ---

func (s *StockService) GetAllStockIn() ([]models.StockIn, error) {
	return s.stockInRepo.FindAll()
}

func (s *StockService) CreateStockIn(userID uint, req dto.StockInRequest) (*models.StockIn, error) {
	item, err := s.itemRepo.FindByID(req.ItemID)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("item tidak ditemukan")
	}

	stockIn := &models.StockIn{
		ItemID:   req.ItemID,
		UserID:   userID,
		Quantity: req.Quantity,
		Date:     req.Date,
		Note:     req.Note,
	}

	if err := s.stockInRepo.Create(stockIn); err != nil {
		return nil, err
	}

	// Update stock item
	item.Stock += req.Quantity
	s.itemRepo.Update(item)

	return stockIn, nil
}

func (s *StockService) DeleteStockIn(id uint) error {
	_, err := s.stockInRepo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("data tidak ditemukan")
	}
	return s.stockInRepo.Delete(id)
}

// --- Stock Out ---

func (s *StockService) GetAllStockOut() ([]models.StockOut, error) {
	return s.stockOutRepo.FindAll()
}

func (s *StockService) CreateStockOut(userID uint, req dto.StockOutRequest) (*models.StockOut, error) {
	item, err := s.itemRepo.FindByID(req.ItemID)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("item tidak ditemukan")
	}

	if item.Stock < req.Quantity {
		return nil, errors.New("stok tidak mencukupi")
	}

	stockOut := &models.StockOut{
		ItemID:   req.ItemID,
		UserID:   userID,
		Quantity: req.Quantity,
		Date:     req.Date,
		Note:     req.Note,
	}

	if err := s.stockOutRepo.Create(stockOut); err != nil {
		return nil, err
	}

	// Kurangi stock item
	item.Stock -= req.Quantity
	s.itemRepo.Update(item)

	return stockOut, nil
}

func (s *StockService) DeleteStockOut(id uint) error {
	_, err := s.stockOutRepo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("data tidak ditemukan")
	}
	return s.stockOutRepo.Delete(id)
}