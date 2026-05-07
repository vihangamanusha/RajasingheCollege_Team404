import axios from "axios";

// Backend base URL
const API_URL = "http://localhost:8080";

// Login API call
export const loginUser = (data) => {
    return axios.post(`${API_URL}/user/login`, data);
};