import axios from "axios";
import SweetAlert from "../components/SweetAlert/SweetAlert";

export const generate_payment_mercadopago = async (products, token) => {
    try {
        const response = await axios.post("http://localhost:4000/api/payment/mp", products, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return SweetAlert("Error!", `${error}`, "error", "Exit");
    }
}