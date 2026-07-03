import axios from "axios";

// ======================
// BASE API CONFIG
// ======================
const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:8080"}`,
});

// ======================
// ATTACH JWT TOKEN AUTOMATICALLY
// ======================
API.interceptors.request.use((config) => {

    // get token from local storage
    const token = localStorage.getItem("token");

    if (token) {
        // IMPORTANT: must include Bearer prefix
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ======================
// LOGIN API
// ======================
export const loginUser = (data) => API.post("/user/login", data);

// export API for other calls
export default API;


// ======================
// ANNOUNCEMENT APIs
// ======================

// Get all announcements
export const getAnnouncements = () => API.get("/admin/announcements");

// Create announcement
export const createAnnouncement = (data) =>
    API.post("/admin/announcements/create", data);