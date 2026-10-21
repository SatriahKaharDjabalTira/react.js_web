# Fullstack App: React (frontend) + Node.js/Express (backend)

```
fullstack-app/
├── backend/    -> API Express (port 5000)
└── frontend/   -> React + Vite (port 5173)
```

## Menjalankan

Terminal 1 (backend):
```
cd backend
npm install
npm run dev
```

Terminal 2 (frontend):
```
cd frontend
npm install
npm run dev
```

Buka http://localhost:5173

## Endpoint API
| Method | URL | Keterangan |
|---|---|---|
| GET | /api/tasks | Daftar tugas |
| POST | /api/tasks | Tambah tugas `{ "title": "..." }` |
| PUT | /api/tasks/:id | Ubah tugas `{ "title"?, "done"? }` |
| DELETE | /api/tasks/:id | Hapus tugas |

## Database
Menggunakan **SQLite** (file `backend/data/app.db`). File dan tabel `tasks` dibuat otomatis saat backend pertama kali dijalankan, tanpa instalasi server database. Untuk reset data, hapus folder `backend/data`.

Konfigurasi: `backend/.env` (PORT, CLIENT_URL, DB_FILE) dan `frontend/.env` (VITE_API_URL).
