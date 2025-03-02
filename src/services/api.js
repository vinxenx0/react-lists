const API_URL = "http://localhost:8000";

export const fetchLists = async () => {
  const response = await fetch(`${API_URL}/lists`);
  return response.json();
};

export const createList = async (title) => {
  const response = await fetch(`${API_URL}/lists`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
