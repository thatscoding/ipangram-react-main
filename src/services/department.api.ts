import axios from "axios";
// const API_URL = "https://employmanagement.onrender.com/v1";
const API_URL = "http://localhost:8000/v1";

export const addDepartment = async (data: any, token: string) => {
    try {
        return await axios.post(`${API_URL}/departments/register`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllDepartments = async (token: string) => {
    const res = await axios.get(`${API_URL}/departments/all`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    console.log(res)
    return res?.data.docs;
};

export const deptById = async (id: string, token: string) => {
    try {
        return await axios.get(`${API_URL}/departments/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};


export const deleteDept = async (id: string, token: string) => {
    try {
        return await axios.delete(`${API_URL}/departments/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error: any) {
        return error?.response.data
    }
};

export const updateDept = async (data: any, id: string, token: string) => {
    try {
        return await axios.patch(`${API_URL}/departments/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};

