import axios from "axios";

export const getAllProducts = async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/productos");
        return response.data;  
    } catch (error) {
        console.log(error);
    }
    
}

export const getProductByName = async (name) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/productos/${name}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}