const BASE_URL = "http://localhost:8080/api/contact";

// GET all feedback
export const getFeedback = async () => {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return []; // IMPORTANT (no fake data)
  }
};

// DELETE feedback
export const deleteFeedback = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    // FIX: accept 200 OR 204 as success
    if (res.status === 200 || res.status === 204) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return false;
  }
};