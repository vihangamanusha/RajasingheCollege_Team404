const BASE_URL = "http://localhost:8080/api/news";

// GET all
export const getNews = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// POST
export const addNews = async (data) => {
  const options = {
    method: "POST",
    body: data instanceof FormData ? data : JSON.stringify(data),
  };

  if (!(data instanceof FormData)) {
    options.headers = { "Content-Type": "application/json" };
  }

  const res = await fetch(BASE_URL, options);
  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

// DELETE
export const deleteNews = async (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};