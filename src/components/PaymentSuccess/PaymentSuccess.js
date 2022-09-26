import { useJwt } from "react-jwt";
import SweetAlert from "../SweetAlert/SweetAlert";
const PaymentSuccess = () => {
    const url = window.location.href;
    const token = url.split("Bearer%20")[1];
    const { decodedToken } = useJwt(token);
    if (decodedToken !== null) SweetAlert("Felicidades por su compra!", `${decodedToken.name.name} su compra fue un exito, en breve les llegara un email con los detalles de la compra`, "success", "Ok")
    return (
        <main>
            <div class="goodbye-container">
                <div class="bye-message">👋 Adios!</div>
                <div class="exit-text">Ahora podes salir de esta pagina.</div>
            </div>
        </main>
    )
}

export default PaymentSuccess;