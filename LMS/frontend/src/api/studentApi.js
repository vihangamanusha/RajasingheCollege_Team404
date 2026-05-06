const BASE_URL = 'http://localhost:8080/api/student';

const fetchWithData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Wrap in { data: ... } to match Axios response format expected by components
        return { data };
    } catch (error) {
        console.error("API Fetch Error:", error);
        throw error;
    }
};

export const getStudent = (id) => {
    return fetchWithData(`${BASE_URL}/${id}`);
};

export const getMarks = (id) => {
    return fetchWithData(`${BASE_URL}/${id}/marks`);
};

export const getReport = (id) => {
    return fetchWithData(`${BASE_URL}/${id}/report`);
};

export const getDocuments = () => {
    return fetchWithData(`${BASE_URL}/documents`);
};
