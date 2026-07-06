const BASE_URL = "http://localhost:8080/api/news";

// helper
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Request failed: ${res.status}`);
  }

  // FIX: handle empty response (204 No Content)
  const contentType = res.headers.get("content-type");

  if (res.status === 204 || !contentType) {
    return true;
  }

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
};
// GET all
export const getNews = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Failed to fetch: ${res.status}`);
  }

  return res.json();
};

// POST (create)
export const addNews = async (data) => {
  const options = {
    method: "POST",
    body: data instanceof FormData ? data : JSON.stringify(data),
  };

  if (!(data instanceof FormData)) {
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  const res = await fetch(BASE_URL, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Create failed: ${res.status}`);
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
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  const res = await fetch(`${BASE_URL}/${id}`, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Update failed: ${res.status}`);
  }

  return res.json();
};

// DELETE
export const deleteNews = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Delete failed: ${res.status}`);
  }

  return true;
};