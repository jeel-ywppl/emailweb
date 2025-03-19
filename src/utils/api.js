import axios from "axios";
import {config} from "./util";
import {getItem} from "./localStorage";

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

export {api, setAuthToken};
