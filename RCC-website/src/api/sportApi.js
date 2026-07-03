const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/sports`;

export async function getBySportType(type) {

  const response = await fetch(
    `${BASE_URL}/type/${type}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch achievements");
  }

  return response.json();
}