import axios from "axios";

const API_URL = "http://localhost:8080/api/classes/summary";

export const getClasses = async () => {
    return await axios.get(API_URL);
};