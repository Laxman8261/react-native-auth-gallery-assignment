import axios from 'axios';

const API_BASE_URL = 'https://mock-api-1-4nsz.onrender.com';

export const checkEmailExists = async (email) => {
    const response = await axios.get(`${API_BASE_URL}/users`, {
        params: { email },
    });
    return response.data.length > 0;
};

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
};

export const loginUser = async ({ email, password }) => {
    const response = await axios.get(`${API_BASE_URL}/users`, {
        params: {
            email: email,
            password
        }
    });

    if (response.data.length === 0) {
        throw new Error('Invalid credentials');
    }

    return response.data[0]; // return user object
};