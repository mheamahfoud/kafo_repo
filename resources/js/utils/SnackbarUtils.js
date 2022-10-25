import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import store from '../Pages/store';
export const  notify = (msg) => {
    return toast.info(msg, {
        position:  "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        rtl:store.getState().lang =='ar'? true:false,
        
    });
}