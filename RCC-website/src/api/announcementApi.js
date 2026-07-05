const BASE_URL = "http://localhost:8080/api/announcements";

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

  // Filter by category "Academic" and matching targetAudience
  return all.filter(
    (item) =>
      item.category === "Academic" &&
      item.targetAudience === audience
  );
};
