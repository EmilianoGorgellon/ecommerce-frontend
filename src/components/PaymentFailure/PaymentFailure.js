import { useJwt } from "react-jwt";
import SweetAlert from "../SweetAlert/SweetAlert";
const PaymentFailure = () => {
    const url = window.location.href;
    const token = url.split("Bearer%20")[1];
    const { decodedToken } = useJwt(token);
    if (decodedToken !== null) SweetAlert("Lamentablemente su compra fallo!", `${decodedToken.name.name} su compra no se pudo hacer, intente nuevamente mas tarde`, "error", "Ok")
    return (
        <main>
            <div class="goodbye-container">
                <div class="bye-message">👋 Adios!</div>
                <div class="exit-text">Ahora podes salir de esta pagina.</div>
            </div>
        </main>
    )
}

export default PaymentFailure;