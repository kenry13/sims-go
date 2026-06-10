package models

import "time"

type User struct {
	ID              uint       `gorm:"primaryKey" json:"id"`
	Name            string     `json:"name"`
	Email           string     `gorm:"uniqueIndex" json:"email"`
	Role            string     `gorm:"default:user" json:"role"`
	Password        string     `json:"-"`
	EmailVerifiedAt *time.Time `json:"email_verified_at"`
	RememberToken   *string    `json:"-"`
	CreatedAt       time.Time  `json:"created_at"`
	UpdatedAt       time.Time  `json:"updated_at"`
}