import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

export const loginUser = (data) => API.post("/user/login", data);
//export const registerUser = (data) => API.post("/auth/register", data);