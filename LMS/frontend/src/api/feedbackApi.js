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
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    // accept 200 OR 204 as success
    if (res.status === 200 || res.status === 204) {
      return { success: true, status: res.status };
    }

    return { success: false, status: res.status };
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return { success: false, status: 0 }; // 0 = network/CORS failure
  }
};