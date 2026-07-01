const BASE_URL = "http://localhost:8080/api/teachers";

export const getAllTeachers = async () => {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch teachers");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
};