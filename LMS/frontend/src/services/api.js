import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

// ======================
// LOGIN API
// ======================
export const loginUser = (data) => API.post("/user/login", data);

// ======================
// ATTACH TOKEN AUTOMATICALLY
// ======================
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;