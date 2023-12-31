import axios from "axios";
// const API_URL = "https://employmanagement.onrender.com/v1";
const API_URL = "http://localhost:8000/v1";


export const getAllEmployees = async (url: string, token: string) => {
    const res = await axios.get(`${API_URL}/employees/all/${url}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    // console.log(res)

    return res?.data.response;

};

export const employeeById = async (id: string, token: string) => {
    try {
        return await axios.get(`${API_URL}/employees/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};


export const deleteEmployee = async (id: string, token: string) => {
    const res = await axios.delete(`${API_URL}/employees/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return res;
};

export const UpdateEmployee = async (data: any, id: string, token: string) => {
    try {
        return await axios.patch(`${API_URL}/employees/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error: any) {
        return error?.response.data
    }
};

