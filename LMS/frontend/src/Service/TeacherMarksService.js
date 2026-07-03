import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/v1/marks`;

export const saveMarks = (data) => {
    return axios.post(`${API_URL}/save`, data);
};