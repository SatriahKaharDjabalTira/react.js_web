import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    getTasks().then(setTasks).catch((e) => setError(e.message));

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await addTask(title);
      setTitle("");
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggle = async (t) => {
    await updateTask(t.id, { done: !t.done });
    load();
  };

  const remove = async (id) => {
    await deleteTask(id);
    load();
  };

  return (
    <main className="container">
      <h1>Daftar Tugas</h1>
      <form onSubmit={handleAdd} className="row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tambah tugas baru..."
        />
        <button type="submit">Tambah</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <label className={t.done ? "done" : ""}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t)} />
              {t.title}
            </label>
            <button className="del" onClick={() => remove(t.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
