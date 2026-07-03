import API from "../services/api";

export const saveMarks = (data) => {
    return API.post("/api/v1/marks/save", data);
};

export const getMarks = (classId, subjectId, term, year) => {
    return API.get(`/api/v1/marks/class/${classId}/subject/${subjectId}/term/${term}/year/${year}`);
};