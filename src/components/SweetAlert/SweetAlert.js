import Swal from "sweetalert2";

const SweetAlert = (title, text, icon, confirmButtonText) => {
    return Swal.fire({
        title,
        text,
        icon,
        confirmButtonText
      })
}

export default SweetAlert;