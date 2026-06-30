import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/subjects/all";

export const getSubjects = async () => {
    return await axios.get(API_URL);
};