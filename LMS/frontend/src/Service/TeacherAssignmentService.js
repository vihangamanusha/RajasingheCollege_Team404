import axios from "axios";

const API_URL = "http://localhost:8080/api/assignment";

export const uploadAssignment = async (formData) => {
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

export const getAssignments = async () => {
    return await axios.get(`${API_URL}/all`);
};

export const deleteAssignment = async (id) => {
    return await axios.delete(`${API_URL}/delete/${id}`);
};
