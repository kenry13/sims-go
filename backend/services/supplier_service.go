package services

import (
	"errors"

	"sims/dto"
	"sims/models"
	"sims/repositories"

	"gorm.io/gorm"
)

type SupplierService struct {
	repo *repositories.SupplierRepository
}

func NewSupplierService(repo *repositories.SupplierRepository) *SupplierService {
	return &SupplierService{repo: repo}
}

func (s *SupplierService) GetAll() ([]models.Supplier, error) {
	return s.repo.FindAll()
}

func (s *SupplierService) GetByID(id uint) (*models.Supplier, error) {
	supplier, err := s.repo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("supplier tidak ditemukan")
	}
	return supplier, err
}

func (s *SupplierService) Create(req dto.SupplierRequest) (*models.Supplier, error) {
	supplier := &models.Supplier{Name: req.Name, Phone: req.Phone, Address: req.Address}
	if err := s.repo.Create(supplier); err != nil {
		return nil, err
	}
	return supplier, nil
}

func (s *SupplierService) Update(id uint, req dto.SupplierRequest) (*models.Supplier, error) {
	supplier, err := s.repo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("supplier tidak ditemukan")
	}
	supplier.Name = req.Name
	supplier.Phone = req.Phone
	supplier.Address = req.Address
	if err := s.repo.Update(supplier); err != nil {
		return nil, err
	}
	return supplier, nil
}

func (s *SupplierService) Delete(id uint) error {
	_, err := s.repo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("supplier tidak ditemukan")
	}
	return s.repo.Delete(id)
}