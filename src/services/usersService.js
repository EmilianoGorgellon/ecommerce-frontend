import axios from "axios";
import SweetAlert from "../components/SweetAlert/SweetAlert";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const saveUser = async (user) => {
    try {
        const response = await axios.post("http://localhost:4000/api/auth/register", user);
        return SweetAlert("Bien!", "Su usuario ya fue creado, confirme su email en su casilla de correo e intente iniciar sesion", "success", "Ok");
    } catch (error) {
        return SweetAlert("Error!", "Ya existe una cuenta con ese gmail", "error", "Exit")
    }
}

export const loginUser = async (data) => {
    try {
        const response = await axios.post("http://localhost:4000/api/auth/login", data);      
        cookies.set('token', response.data, { path: '/' });
        return response.data;
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
        return SweetAlert("Bien!", "Se actualizo su perfil vuelva a refrescar la pagina para ver los cambios", "success", "Ok");
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
        return SweetAlert("Bien!", `${response.data.response}`, "success", "Ok");
    } catch (error) {
        return SweetAlert("Error!", "No se pudo actualizar el usuario", "error", "Ok");
    }
}

export const getUsers = async (token) => {
    try {
        return await axios.get("http://localhost:4000/api/user/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return SweetAlert("Error!", "No se pudo actualizar el usuario", "error", "Ok");
    }   
}

export const forgetPassword = async (email) => {
    try {
        const response = await axios.post("http://localhost:4000/api/user/forget_password", {"email": email});
        SweetAlert("Bien!", `${response.data.response}`, "success", "Ok");
        return response.status;
    } catch (error) {
        SweetAlert("Error!", "No se pudo mandar email para recuperar contraseña", "error", "Ok");
        return 400;
    }
}

export const recovery_password = async (email, code, new_password) => {
    try {
        await axios.post("http://localhost:4000/api/user/recovery_password", {email, code, new_password});
        return await SweetAlert("Bien!", `Se creo nueva contraseña para ${email}`, "success", "Ok")
    } catch (error) {
        return SweetAlert("Error!", `No se pudo crear una nueva contraseña para ${email}`, "error", "Ok");
    }
} 