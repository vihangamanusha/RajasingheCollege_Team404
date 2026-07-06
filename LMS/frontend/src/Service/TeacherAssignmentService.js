import API from "../services/api";

export const getTeacherAssignments = (teacherId) => {
    return API.get(`/api/v1/assignments/teacher/${teacherId}`);
};

export const saveAssignment = (data) => {
    return API.post("/api/v1/assignments", data);
};

export const deleteAssignment = (id) => {
    return API.delete(`/api/v1/assignments/${id}`);
};
