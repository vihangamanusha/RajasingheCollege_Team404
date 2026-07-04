import axios from "axios";

const API = "http://localhost:8080/api/documents";

export const getDocuments = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const uploadDocument = async (formData) => {
  const response = await axios.post(API, formData);
  return response.data;
};

export const deleteDocument = async (id) => {
  return axios.delete(`${API}/${id}`);
};