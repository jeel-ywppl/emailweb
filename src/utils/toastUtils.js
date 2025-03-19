import {toast} from "react-toastify";

export const successToastHandler = (message) => {
    toast.success(message);
};

export const toastHandler = (message) => {
    toast.error(message);
};
