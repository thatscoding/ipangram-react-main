import axios from "axios";

export const addDepartment = async (data: any, token: string) => {
    try {
        return await axios.post(`http://localhost:8000/v1/departments/register`, data, {
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
    try {
        return await axios.get(`http://localhost:8000/v1/departments/all`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const deptById = async (id: string, token: string) => {
    try {
        return await axios.get(`http://localhost:8000/v1/departments/${id}`, {
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
        return await axios.delete(`http://localhost:8000/v1/departments/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateDept = async (data: any, id: string, token: string) => {
    try {
        return await axios.patch(`http://localhost:8000/v1/departments/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};

