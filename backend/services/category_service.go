package services

import (
	"errors"

	"sims/dto"
	"sims/models"
	"sims/repositories"

	"gorm.io/gorm"
)

type CategoryService struct {
	repo *repositories.CategoryRepository
}

func NewCategoryService(repo *repositories.CategoryRepository) *CategoryService {
	return &CategoryService{repo: repo}
}

func (s *CategoryService) GetAll() ([]models.Category, error) {
	return s.repo.FindAll()
}

func (s *CategoryService) GetByID(id uint) (*models.Category, error) {
	c, err := s.repo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("kategori tidak ditemukan")
	}
	return c, err
}

func (s *CategoryService) Create(req dto.CategoryRequest) (*models.Category, error) {
	category := &models.Category{Name: req.Name, Description: req.Description}
	if err := s.repo.Create(category); err != nil {
		return nil, err
	}
	return category, nil
}

func (s *CategoryService) Update(id uint, req dto.CategoryRequest) (*models.Category, error) {
	category, err := s.repo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("kategori tidak ditemukan")
	}
	category.Name = req.Name
	category.Description = req.Description
	if err := s.repo.Update(category); err != nil {
		return nil, err
	}
	return category, nil
}

func (s *CategoryService) Delete(id uint) error {
	_, err := s.repo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("kategori tidak ditemukan")
	}
	return s.repo.Delete(id)
}