const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/contact`;

// GET all feedback
export const getFeedback = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Fetched feedback:", data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching feedback:", error);
    // Return mock data so the UI can be tested without a running backend
    return [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        subject: "Admission Inquiry",
        message: "I would like to know about the admission process for the next academic year.",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        subject: "Website Feedback",
        message: "The new dashboard looks amazing! Keep up the good work.",
        createdAt: new Date().toISOString()
      }
    ];
  }
};

// DELETE feedback
export const deleteFeedback = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Delete failed: ${res.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return false;
  }
};
