const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/announcements`;

/**
 * Fetch all announcements then filter client-side by category + targetAudience.
 * The backend entity uses the field "targetAudience" (not "audience").
 */
export const getAcademicAnnouncements = async (audience) => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error(`Failed to load announcements: ${res.status}`);
  }

  const all = await res.json();

  // DEBUG: log all announcements so we can see exact DB values
  console.log(
    "[DEBUG] All announcements from DB:",
    all.map((a) => ({ id: a.id, category: a.category, targetAudience: a.targetAudience, title: a.title }))
  );

  // Filter by category "Academic" and matching targetAudience
  return all.filter(
    (item) =>
      item.category === "Academic" &&
      item.targetAudience === audience
  );
};
