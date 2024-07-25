import axios from 'axios';

const API_BASE_URL = "http://localhost:3333/api/ocr"; // Adjust the URL as needed

const ocrService = {
    getOcrById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    },

    getAllOcrEntities() {
        return axios.get(API_BASE_URL);
    },

    performOcr(file) {
        let formData = new FormData();
        formData.append('file', file);

        return axios.post(`${API_BASE_URL}/perform`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    analyzeAndSaveImage(file, typeDocument, numeroCompteId) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('typeDocument', typeDocument);
        formData.append('numeroCompteId', numeroCompteId);

        return axios.post(`${API_BASE_URL}/analyze`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    deleteOcrById(id) {
        return axios.delete(`${API_BASE_URL}/${id}`);
    }
};

export default ocrService;
