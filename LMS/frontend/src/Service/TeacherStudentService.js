import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/students";

export const getStudents = async () => {
    return await axios.get(`${API_URL}/all`);
};

export const assignStudentToClass = async (studentId, classId, medium) => {
    return await axios.put(`${API_URL}/${studentId}/assign-class`, null, {
        params: {
            classId,
            medium
        }
    });
};