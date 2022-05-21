import axios from "axios";
import SweetAlert from "../components/SweetAlert/SweetAlert";

export const getAllProducts = async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/productos");
        return response.data;  
    } catch (error) {
        return SweetAlert("Error!", "No se pudo obtener los productos", "error", "Ok!");
    }
    
}

export const getProductByName = async (name) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/productos/${name}`);
        return response.data;
    } catch (error) {
        return SweetAlert("Error!", "No se pudo obtener el producto", "error", "Ok!")
    }
}

export const saveProduct = async (data, token) => {
    try {
        console.log(token);
        console.log(data)
        const response = await axios.post("http://localhost:4000/api/productos", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response);
        return SweetAlert("Bien!", "Se guardo el producto", "success", "Ok!");
    } catch (error) {
        console.log("veo error desde service: ", error)
        return SweetAlert("Error!", "No se pudo guardar el producto", "error", "Ok!")
    }
}