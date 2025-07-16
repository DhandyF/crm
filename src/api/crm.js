import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const getContactList = async (params) => {
    try {
        const response = await axios.get(`${baseUrl}/contact`, { params });
        return response?.data ?? null;
    } catch (error) {
        console.error(error?.message ?? '');
        throw error;
    }
};
