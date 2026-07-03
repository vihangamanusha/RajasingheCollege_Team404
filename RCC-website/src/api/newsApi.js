const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/news`;

export const getNews = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
};