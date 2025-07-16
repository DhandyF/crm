import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';

// Contact

export const getContactList = async (params) => {
    try {
        const response = await axios.get(`${baseUrl}/contact`, { params });
        return response?.data ?? null;
    } catch (error) {
        console.error(error?.message ?? '');
        throw error;
    }
};

export const updateContact = async (params, id) => {
    try {
        const response = await axios.put(`${baseUrl}/contact/${id}`, params);
        return response?.data ?? null;
    } catch (error) {
        console.error(error?.message ?? '');
        throw error;
    }
}

// Call log

export const storeCallLog = async (params) => {
    try {
        const response = await axios.post(`${baseUrl}/log`, params);
        return response?.data ?? null;
    } catch (error) {
        console.error(error?.message ?? '');
        throw error;
    }
}

export const getCallLogs = async () => {
    try {
        const response = await axios.get(`${baseUrl}/log`);
        return response?.data ?? null;
    } catch (error) {
        console.error(error?.message ?? '');
        throw error;
    }
}
