const BASE_URL = "http://localhost:8080/api/events";

export const getAllEvents = async () => {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};