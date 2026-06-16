// Base URL of the backend server.
// Using the laptop's LAN IP since the app runs on a physical device via Expo Go.
// Phone and laptop must be on the same Wi-Fi network.
const BASE_URL = "http://10.34.56.111:3000";

export const getAllTodos = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  return res.json();
};

export const addTodo = async (title: string) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTodo = async (id: number, title: string) => {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const deleteTodo = async (id: number) => {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  return res.json();
};