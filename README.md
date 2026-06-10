# 📦 SIMS — Stock Inventory Management System

Sistem manajemen inventaris berbasis REST API yang dibangun dengan **Golang + Gin Framework**, hasil migrasi dari Laravel. Dirancang dengan arsitektur berlapis (Layered Architecture) untuk memisahkan tanggung jawab tiap komponen.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Language | Go (Golang) |
| Framework | Gin |
| ORM | GORM |
| Database | MySQL (Laragon) |
| Auth | JWT (JSON Web Token) |
| Frontend *(coming soon)* | Vite + React |

---

## 📁 Struktur Project

```
SIMS/
├── backend/
│   ├── config/             # Konfigurasi app & database
│   ├── controllers/        # Handler HTTP request & response
│   ├── database/           # Koneksi database
│   ├── dto/                # Struktur request & response
│   ├── middleware/         # JWT Auth middleware
│   ├── models/             # Struct representasi tabel database
│   ├── repositories/       # Query database (GORM)
│   ├── routes/             # Definisi endpoint API
│   ├── services/           # Business logic
│   ├── utils/              # Helper (response formatter, dll)
│   ├── main.go             # Entry point
│   ├── go.mod
│   └── .env.example
└── frontend/               # Coming soon (Vite + React)
```

---

## ⚙️ Cara Menjalankan

### Prasyarat
- Go 1.21+
- MySQL (Laragon / XAMPP)
- Git

### 1. Clone repository

```bash
git clone https://github.com/kenry13/sims-go.git
cd SIMS/backend
```

### 2. Install dependencies

```bash
go mod tidy
```

### 3. Setup environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Sesuaikan isi `.env`:

```env
APP_PORT=8000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=sims_db

JWT_SECRET=your-secret-key
```

### 4. Buat database

Buat database `sims_db` di MySQL, lalu import file SQL:

```bash
mysql -u root sims_db < sims_db.sql
```

### 5. Jalankan server

```bash
go run main.go
```

Server berjalan di `http://localhost:8000`

---

## 🔐 Autentikasi

API ini menggunakan **JWT Bearer Token**. Login terlebih dahulu untuk mendapatkan token, lalu sertakan di setiap request ke endpoint yang protected.

```
Authorization: Bearer <token>
```

---

## 📡 API Endpoints

### Auth (Public)

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/register` | Register user baru |

### Items 🔒

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/items` | Ambil semua item |
| GET | `/api/items/:id` | Ambil item by ID |
| POST | `/api/items` | Tambah item baru |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Hapus item |

### Categories 🔒

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/categories` | Ambil semua kategori |
| GET | `/api/categories/:id` | Ambil kategori by ID |
| POST | `/api/categories` | Tambah kategori |
| PUT | `/api/categories/:id` | Update kategori |
| DELETE | `/api/categories/:id` | Hapus kategori |

### Suppliers 🔒

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/suppliers` | Ambil semua supplier |
| GET | `/api/suppliers/:id` | Ambil supplier by ID |
| POST | `/api/suppliers` | Tambah supplier |
| PUT | `/api/suppliers/:id` | Update supplier |
| DELETE | `/api/suppliers/:id` | Hapus supplier |

### Stock In 🔒

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/stock-in` | Ambil semua data masuk |
| POST | `/api/stock-in` | Catat stok masuk |
| DELETE | `/api/stock-in/:id` | Hapus data stok masuk |

### Stock Out 🔒

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/stock-out` | Ambil semua data keluar |
| POST | `/api/stock-out` | Catat stok keluar |
| DELETE | `/api/stock-out/:id` | Hapus data stok keluar |

### Reports 🔒

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/reports` | Laporan lengkap (default 30 hari terakhir) |
| GET | `/api/reports?start_date=2026-01-01&end_date=2026-06-10` | Laporan dengan filter tanggal |

> 🔒 = Membutuhkan token JWT

---

## 📬 Contoh Request

### Login
```json
POST /api/auth/login
{
  "email": "admin@sims.com",
  "password": "password"
}
```

### Tambah Item
```json
POST /api/items
{
  "code": "ELK-003",
  "name": "Keyboard Wireless",
  "category_id": 1,
  "supplier_id": 1,
  "stock": 10,
  "min_stock": 3,
  "unit": "unit"
}
```

### Catat Stok Masuk
```json
POST /api/stock-in
{
  "item_id": 1,
  "quantity": 5,
  "date": "2026-06-10",
  "note": "Restock bulanan"
}
```

---

## 🏗️ Arsitektur

Project ini menggunakan **Layered Architecture**:

```
Request → Routes → Middleware → Controller → Service → Repository → Database
                                    ↑              ↑
                                   DTO           Model
```

| Layer | Tanggung Jawab |
|---|---|
| Routes | Mendaftarkan endpoint & arahkan ke controller |
| Middleware | Validasi token JWT sebelum request diproses |
| Controller | Terima request, validasi input, kembalikan response |
| Service | Business logic (cek stok, kalkulasi, dll) |
| Repository | Query database, tidak ada logic bisnis |
| Model | Representasi struktur tabel database |
| DTO | Definisi bentuk data request & response |

---

## 👥 Default Users

| Email | Password | Role |
|---|---|---|
| admin@sims.com | password | admin |
| user@sims.com | password | user |

---

## 📄 License

MIT License — bebas digunakan untuk keperluan akademik.