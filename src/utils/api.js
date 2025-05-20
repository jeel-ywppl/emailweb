import axios from "axios";
import {config} from "./util";
import {getItem, removeItem} from "./localStorage";
import {toast} from "react-toastify";
import {decrypt, encrypt} from "./IncryptDecrypt";

const baseURL = config.BASE_URL;

const api = axios.create({
    baseURL,
});

const haveToken = getItem("AUTH_KEY");

if (haveToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${haveToken}`;
}

const setAuthToken = (token) => {
    const accessToken = token || getItem("AUTH_KEY");
    if (accessToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

api.interceptors.response.use(
    (response) => {
        if (response?.data?.encrypted) {
            try {
                const decrypted = decrypt(response.data.encrypted);
                response.data = typeof decrypted === "string" ? JSON.parse(decrypted) : decrypted;
            } catch (err) {
                console.error("Response decryption failed:", err);
            }
        }
        return response;
    },
    (error) => {
        const status = error?.response?.status;

        if (status === 403) {
            removeItem("AUTH_KEY");
            delete api.defaults.headers.common["Authorization"];

            toast.error("Session expired or logged in elsewhere. Please log in again.");

            window.location.href = "/auth/sign-in";
        }

        return Promise.reject(error);
    },
);

// api.interceptors.request.use(
//     (config) => {
//         const isFormData = config.data instanceof FormData;

//         if (isFormData) {
//             const originalFormData = config.data;
//             const emailData = {};

//             for (let [key, value] of originalFormData.entries()) {
//                 if (key !== "attachments") {
//                     if (key.endsWith("[]")) {
//                         const fieldName = key.replace("[]", "");
//                         emailData[fieldName] = emailData[fieldName] || [];
//                         emailData[fieldName].push(value);
//                     } else {
//                         emailData[key] = value;
//                     }
//                 }
//             }

//             const encryptedData = encrypt(emailData);

//             const newFormData = new FormData();
//             newFormData.append("encrypted", encryptedData);

//             const attachments = originalFormData.getAll("attachments");
//             attachments.forEach((file) => {
//                 newFormData.append("attachments", file);
//             });

//             config.data = newFormData;

//             delete config.headers["Content-Type"];
//         } else if (config.data) {
//             config.data = {encrypted: encrypt(config.data)};
//             config.headers["Content-Type"] = "application/json";
//         }

//         return config;
//     },
//     (error) => Promise.reject(error),
// );

api.interceptors.request.use(
    (config) => {
        const isFormData = config.data instanceof FormData;

        if (isFormData) {
            const originalFormData = config.data;
            const emailData = {};

            // Extract all fields except 'files'
            for (let [key, value] of originalFormData.entries()) {
                if (key !== "files") {
                    if (key.endsWith("[]")) {
                        const fieldName = key.replace("[]", "");
                        emailData[fieldName] = emailData[fieldName] || [];
                        emailData[fieldName].push(value);
                    } else {
                        emailData[key] = value;
                    }
                }
            }

            // Encrypt the non-file form fields
            const encryptedData = encrypt(emailData);

            // Build new FormData
            const newFormData = new FormData();
            newFormData.append("encrypted", encryptedData);

            // Append files without encrypting them
            const files = originalFormData.getAll("files");
            files.forEach((file) => {
                newFormData.append("files", file);
            });

            config.data = newFormData;

            // Let browser handle Content-Type
            delete config.headers["Content-Type"];
        } else if (config.data) {
            config.data = {encrypted: encrypt(config.data)};
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => {
        if (response?.data?.encrypted) {
            try {
                const decrypted = decrypt(response.data.encrypted);
                response.data = typeof decrypted === "string" ? JSON.parse(decrypted) : decrypted;
            } catch (err) {
                console.error("Response decryption failed:", err);
            }
        }
        return response;
    },
    (error) => Promise.reject(error),
);

export {api, setAuthToken};
