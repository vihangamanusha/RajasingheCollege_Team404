const BASE_URL = "http://localhost:8080/api/news";

// GET all
export const getNews = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// POST
export const addNews = async (data) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// DELETE
export const deleteNews = async (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};