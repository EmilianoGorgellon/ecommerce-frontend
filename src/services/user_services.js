import axios from "axios";
import SweetAlert from "../components/SweetAlert/SweetAlert";


export const getDataUser = async (token) => {
    try {
        const response = await axios.get("http://localhost:4000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.user_data;
    } catch (error) {
        return SweetAlert("Error!", "Email y/o contraseña inexistentes", "error", "Exit")
    }
}

export const updateUser = async (data, token) => {
    try {
        const response = await axios.put("http://localhost:4000/api/user", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("veo respuesta")
        console.log(response.data);
    } catch (error) {
        return SweetAlert("Error!", "No se pudo actualizar el usuario", "error", "Exit")
    }
}

export const userToAdmin = async (email, token) => {
    try {
        const response = await axios.put("http://localhost:4000/api/user/toAdmin", email, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return SweetAlert("Bien!", `${response.data}`, "success", "Ok");
    } catch (error) {
        return SweetAlert("Error!", `${error}`, "error", "Ok");
    }
}

export const userToModerator = async (email, token) => {
    try {
        const response = await axios.put("http://localhost:4000/api/user/toModerator", email, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return SweetAlert("Bien!", `${response.data}`, "success", "Ok");
    } catch (error) {
        return SweetAlert("Error!", `${error}`, "error", "Ok");
    }
}

export const getRoleView = async (token) => {
    try {
        const response = await axios.get("http://localhost:4000/api/user/roleView", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        return SweetAlert("Error!", "No se pudo obtener los roles view", "error", "Ok");
    }
}

export const forgetPassword = async (email) => {
    try {
        const response = await axios.post("http://localhost:4000/api/user/forget_password", {"email": email});
        SweetAlert("Bien!", `${response.data.response}`, "success", "Ok");
        return response.status;
    } catch (error) {
        SweetAlert("Error!", `${error.response.data.response}`, "error", "Ok");
        return error.response.status;
    }
}

export const recovery_password = async (email, code, new_password) => {
    try {
        const response = await axios.post("http://localhost:4000/api/user/recovery_password", {email, code, new_password});
        SweetAlert("Bien!", `${response.data.response}`, "success", "Ok");
        return true;
    } catch (error) {
        SweetAlert("Error!", `${error.response.data.response}`, "error", "Ok");
        return false;
    }
} 