import axios from "axios";
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
// const response = await axios.post("http://localhost:4000/api/auth/signup", user, {
//     headers: {
//         authorization: `Bearer token`
//     }
// });
const cookies = new Cookies();
// const token = cookies.get("token");
// console.log("leo token")
// console.log(token)
export const saveUser = async (user) => {
    try {
        const response = await axios.post("http://localhost:4000/api/auth/register", user);
        // console.log(response)
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Ya existe una cuenta con ese email',
            icon: 'error',
            confirmButtonText: 'Exit'
          })
    }
}

export const loginUser = async (data) => {
    try {
        const response = await axios.post("http://localhost:4000/api/auth/login", data);      
        cookies.set('token', response.data, { path: '/' });
        return response.data;
    } catch (error) {
        return Swal.fire({
            title: 'Error!',
            text: 'Email y/o contraseña inexistentes',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
}