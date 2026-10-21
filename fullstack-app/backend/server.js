require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// SQLite menyimpan boolean sebagai 0/1, ubah ke true/false untuk frontend
const toTask = (row) => ({ ...row, done: !!row.done });

const q = {
  all: db.prepare("SELECT * FROM tasks ORDER BY id"),
  get: db.prepare("SELECT * FROM tasks WHERE id = ?"),
  insert: db.prepare("INSERT INTO tasks (title) VALUES (?)"),
  update: db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?"),
  remove: db.prepare("DELETE FROM tasks WHERE id = ?"),
};

app.get("/api/tasks", (req, res) => {
  res.json(q.all.all().map(toTask));
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Judul wajib diisi" });
  }
  const info = q.insert.run(title.trim());
  res.status(201).json(toTask(q.get.get(info.lastInsertRowid)));
});

app.put("/api/tasks/:id", (req, res) => {
  const task = q.get.get(req.params.id);
  if (!task) return res.status(404).json({ message: "Tugas tidak ditemukan" });

  const title = req.body.title !== undefined ? req.body.title : task.title;
  const done = req.body.done !== undefined ? (req.body.done ? 1 : 0) : task.done;
  q.update.run(title, done, req.params.id);
  res.json(toTask(q.get.get(req.params.id)));
});

app.delete("/api/tasks/:id", (req, res) => {
  const info = q.remove.run(req.params.id);
  if (info.changes === 0) {
    return res.status(404).json({ message: "Tugas tidak ditemukan" });
  }
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Backend berjalan di http://localhost:${PORT}`));
