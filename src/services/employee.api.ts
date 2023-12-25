import axios from "axios";


export const getAllEmployees = async (url: string, token: string) => {
    try {
        return await axios.get(`http://localhost:8000/v1/employees/all/${url}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const employeeById = async (id: string, token: string) => {
    try {
        return await axios.get(`http://localhost:8000/v1/employees/${id}`, {
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
    try {
        return await axios.delete(`http://localhost:8000/v1/employees/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const UpdateEmployee = async (data: any, id: string, token: string) => {
    try {
        return await axios.patch(`http://localhost:8000/v1/employees/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
};

