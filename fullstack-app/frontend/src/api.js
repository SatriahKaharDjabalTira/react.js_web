const API = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Terjadi kesalahan");
  }
  return res.status === 204 ? null : res.json();
}

export const getTasks = () => request("/tasks");
export const addTask = (title) =>
  request("/tasks", { method: "POST", body: JSON.stringify({ title }) });
export const updateTask = (id, data) =>
  request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: "DELETE" });
