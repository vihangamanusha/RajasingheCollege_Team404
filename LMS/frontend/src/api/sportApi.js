const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/sports`;

export async function addSportAchievement(data) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save achievement");
  }

  return response.json();
}

export async function getBySportType(type) {
  const response = await fetch(`${BASE_URL}/type/${type}`);

  if (!response.ok) {
    throw new Error("Failed to fetch achievements");
  }

  return response.json();
}

export async function updateSportAchievement(id, data) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update achievement");
  }

  return response.json();
}

export async function deleteSportAchievement(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete achievement");
  }

  return true;
}
