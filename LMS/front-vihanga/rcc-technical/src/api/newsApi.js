const BASE_URL = "http://localhost:8080/api/news";

// GET all
export const getNews = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Fetched news:", data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
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

// PUT (update)
export const updateNews = async (id, data) => {
  const options = {
    method: "PUT",
    body: data instanceof FormData ? data : JSON.stringify(data),
  };

  if (!(data instanceof FormData)) {
    options.headers = { "Content-Type": "application/json" };
  }

  const res = await fetch(`${BASE_URL}/${id}`, options);
  if (!res.ok) {
    throw new Error(`Update failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
};