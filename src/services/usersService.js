import axios from "axios";
import SweetAlert from "../components/SweetAlert/SweetAlert";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const saveUser = async (user) => {
    try {
        await axios.post("http://localhost:4000/api/auth/register", user);
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
        await axios.put("http://localhost:4000/api/user", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return SweetAlert("Bien!", "Se actualizo su perfil vuelva a refrescar la pagina para ver los cambios", "success", "Ok");
    } catch (error) {
        console.log(error)
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
        return SweetAlert("Bien!", `Se actualizo el perfil de: ${email.email}`, "success", "Ok");
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