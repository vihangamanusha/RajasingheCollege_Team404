import axios from "axios";

const API = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/documents`;

export const getDocuments = async () => {
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};