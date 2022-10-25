import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
export const  notify = (msg) => {
    return toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
}