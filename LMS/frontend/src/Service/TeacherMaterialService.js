import API from "../services/api";
import axios from "axios";

export const getTeacherMaterials = (teacherId) => {
    return API.get(`/api/v1/materials/teacher/${teacherId}`);
};

export const saveMaterial = (data) => {
    return API.post("/api/v1/materials", data);
};

export const deleteMaterial = (id) => {
    return API.delete(`/api/v1/materials/${id}`);
};

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post("http://localhost:8080/api/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};
