import axios from "axios";

const API_URL = "http://localhost:8080/api/material";

export const uploadMaterial = async (formData) => {
    return await axios.post(
        `${API_URL}/upload`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};