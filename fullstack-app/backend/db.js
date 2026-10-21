require("dotenv").config();
const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const file = process.env.DB_FILE || "./data/app.db";
fs.mkdirSync(path.dirname(file), { recursive: true });

const db = new Database(file);
db.pragma("journal_mode = WAL");

// Buat tabel jika belum ada
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

// Data awal (hanya jika tabel kosong)
const { total } = db.prepare("SELECT COUNT(*) AS total FROM tasks").get();
if (total === 0) {
  const insert = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");
  insert.run("Belajar React", 0);
  insert.run("Belajar Express", 1);
}

module.exports = db;
