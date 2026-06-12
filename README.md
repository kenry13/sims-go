# 📦 SIMS — Stock Inventory Management System

Sistem manajemen inventaris berbasis REST API yang dibangun dengan **Golang + Gin Framework**, hasil migrasi dari Laravel. Dirancang dengan arsitektur berlapis (Layered Architecture) untuk memisahkan tanggung jawab tiap komponen.

Frontend dibangun dengan **Vite + React**, terhubung ke backend melalui REST API.

---

## 🛠️ Tech Stack

### Backend
| Layer | Teknologi |
|---|---|
| Language | Go (Golang) |
| Framework | Gin |
| ORM | GORM |
| Database | MySQL (Laragon) |
| Auth | JWT (JSON Web Token) |
 
### Frontend
| Kebutuhan | Library |
|---|---|
| Build Tool | Vite 8 |
| UI Library | React 19 + React DOM |
| Routing | React Router DOM 7 |
| HTTP Client | Axios |
| Styling | Tailwind CSS 4 |
| UI Headless | Headless UI (React) |
| Chart | Recharts |

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
│
└── frontend/
    ├── public/
    └── src/
        ├── assets/             # Gambar & aset statis
        ├── Components/         # Reusable UI components
        │   ├── ApplicationLogo.jsx
        │   ├── Checkbox.jsx
        │   ├── DangerButton.jsx
        │   ├── Dropdown.jsx
        │   ├── InputError.jsx
        │   ├── InputLabel.jsx
        │   ├── Modal.jsx
        │   ├── NavLink.jsx
        │   ├── PrimaryButton.jsx
        │   ├── ResponsiveNavLink.jsx
        │   ├── SecondaryButton.jsx
        │   └── TextInput.jsx
        ├── Layouts/            # Layout wrapper
        │   ├── AuthenticatedLayout.jsx
        │   └── GuestLayout.jsx
        ├── Pages/              # Halaman utama aplikasi
        │   ├── Dashboard.jsx
        │   ├── Welcome.jsx
        │   ├── Auth/
        │   │   ├── Login.jsx
        │   │   ├── Register.jsx
        │   │   ├── ConfirmPassword.jsx
        │   │   ├── ForgotPassword.jsx
        │   │   ├── ResetPassword.jsx
        │   │   └── VerifyEmail.jsx
        │   ├── Categories/
        │   │   ├── Index.jsx
        │   │   ├── Create.jsx
        │   │   └── Edit.jsx
        │   ├── Items/
        │   │   ├── Index.jsx
        │   │   ├── Create.jsx
        │   │   └── Edit.jsx
        │   ├── Suppliers/
        │   │   ├── Index.jsx
        │   │   ├── Create.jsx
        │   │   └── Edit.jsx
        │   ├── StockIns/
        │   │   ├── Index.jsx
        │   │   └── Create.jsx
        │   ├── StockOuts/
        │   │   ├── Index.jsx
        │   │   └── Create.jsx
        │   ├── Reports/
        │   │   └── Index.jsx
        │   └── Profile/
        │       ├── Edit.jsx
        │       └── Partials/
        │           ├── DeleteUserForm.jsx
        │           ├── UpdatePasswordForm.jsx
        │           └── UpdateProfileInformationForm.jsx
        ├── services/
        │   └── api.js          # Axios instance & API calls ke backend
        ├── App.jsx
        ├── App.css
        └── main.jsx
```

---

## ⚙️ Cara Menjalankan

### Prasyarat
- Go 1.21+
- Node.js 18+
- MySQL (Laragon / XAMPP)
- Git

---

### 🔧 Backend

#### 1. Clone repository

```bash
git clone https://github.com/kenry13/sims-go.git
cd SIMS/backend
```

#### 2. Install dependencies

```bash
go mod tidy
```

#### 3. Setup environment

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

#### 4. Buat database

Buat database `sims_db` di MySQL, lalu import file SQL:

```bash
mysql -u root sims_db < sims_db.sql
```

#### 5. Jalankan server

```bash
go run main.go
```

Server berjalan di `http://localhost:8000`

---

### 🎨 Frontend

#### 1. Masuk ke direktori frontend

```bash
cd SIMS/frontend
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Jalankan development server

```bash
npm run dev
```

Frontend berjalan di `http://localhost:5173`

> Pastikan backend sudah berjalan sebelum menjalankan frontend.

---

## 🔐 Autentikasi

API ini menggunakan **JWT Bearer Token**. Login terlebih dahulu untuk mendapatkan token, lalu sertakan di setiap request ke endpoint yang protected.

```
Authorization: Bearer <token>
```

Token disimpan di sisi frontend dan disertakan otomatis oleh `api.js` pada setiap request.

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