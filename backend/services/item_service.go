package services

import (
	"errors"

	"sims/dto"
	"sims/models"
	"sims/repositories"

	"gorm.io/gorm"
)

type ItemService struct {
	repo *repositories.ItemRepository
}

func NewItemService(repo *repositories.ItemRepository) *ItemService {
	return &ItemService{repo: repo}
}

func (s *ItemService) GetAll() ([]models.Item, error) {
	return s.repo.FindAll()
}

func (s *ItemService) GetByID(id uint) (*models.Item, error) {
	item, err := s.repo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("item tidak ditemukan")
	}
	return item, err
}

func (s *ItemService) Create(req dto.ItemRequest) (*models.Item, error) {
	item := &models.Item{
		Code:        req.Code,
		Name:        req.Name,
		CategoryID:  req.CategoryID,
		SupplierID:  req.SupplierID,
		Stock:       req.Stock,
		MinStock:    req.MinStock,
		Unit:        req.Unit,
		Description: req.Description,
	}
	if err := s.repo.Create(item); err != nil {
		return nil, err
	}
	return item, nil
}

func (s *ItemService) Update(id uint, req dto.ItemRequest) (*models.Item, error) {
	item, err := s.repo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("item tidak ditemukan")
	}

	item.Code = req.Code
	item.Name = req.Name
	item.CategoryID = req.CategoryID
	item.SupplierID = req.SupplierID
	item.Stock = req.Stock
	item.MinStock = req.MinStock
	item.Unit = req.Unit
	item.Description = req.Description

	if err := s.repo.Update(item); err != nil {
		return nil, err
	}
	return item, nil
}

func (s *ItemService) Delete(id uint) error {
	_, err := s.repo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("item tidak ditemukan")
	}
	return s.repo.Delete(id)
}