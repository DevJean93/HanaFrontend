import Swal from "sweetalert2";
import { useAuth } from "../stores/AuthStore";
const Auth = useAuth();
export const ToastAlert = (icon, data) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: data,
  });
};

export const MensajeAlerta = (icon, mensaje, titulo) => {
  const Alerta = Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icon,
  });
};

export const MensajeAlertaAuth = (icon, mensaje, titulo) => {
  if (Auth.isAuth) {
    const Alerta = Swal.fire({
      title: titulo,
      text: mensaje,
      icon: icon,
    });
  }
};
