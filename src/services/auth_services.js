import axios from "axios";
import SweetAlert from "../components/SweetAlert/SweetAlert";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export const loginUser = async (data) => {
    try {
        const response = await axios.post("http://localhost:4000/api/auth/login", data);
        console.log(response.response)
        cookies.set('token', response.data, { path: '/' });
        return response.data;
    } catch (error) {
        return SweetAlert("Error!", `${error.response.data}`, "error", "Exit")
    }
}

export const saveUser = async (user) => {
    try {
        const response = await axios.post("http://localhost:4000/api/auth/register", user);
        console.log(response);
        return SweetAlert("Bien!", "Su usuario ya fue creado, confirme su email en su casilla de correo e intente iniciar sesion", "success", "Ok");
    } catch (error) {
        return SweetAlert("Error!", "Ya existe una cuenta con ese gmail", "error", "Exit")
    }
}
