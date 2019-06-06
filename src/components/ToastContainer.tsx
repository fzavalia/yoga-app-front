import { ToastContainer, toast as _toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ToastOptions {
  type: "info" | "warning" | "error" | "success" | "default";
}

export const toast = (message: string, options: ToastOptions) =>
  _toast(message, options);

export default ToastContainer;
