import axios from "axios";

// const API_URL = "https://employmanagement.onrender.com/v1";
const API_URL = "http://localhost:8000/v1";


export const RegisterUser = async (data: any) => {
    try {
        console.log(API_URL);
        return await axios.post(`${API_URL}/employees/register`, data);
    } catch (error) {
        console.log(error);
    }
};

export const LoginUser = async (data: any) => {
    try {
        console.log(`${API_URL}/user/login`);
        return await axios.post(`${API_URL}/employees/login`, data);
    } catch (error) {
        console.log(error);
    }
};

export const UserProfile = async (token: string) => {
    try {
        return await axios.get(`${API_URL}/employees/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const LogoutUser = async (token: string) => {

    try {
        console.log(token)
        return await axios.get(`${API_URL}/employees/logout`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
    }
};