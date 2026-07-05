import axios from "axios";

const API = "http://localhost:8080/api/documents";

// Get all documents
export const getDocuments = async () => {
  const response = await axios.get(API);
  return response.data;
};

// Upload document
export const uploadDocument = async (formData) => {
  const response = await axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update document
export const updateDocument = async (id, formData) => {
  const response = await axios.put(`${API}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete document
export const deleteDocument = async (id) => {
  return axios.delete(`${API}/${id}`);
};