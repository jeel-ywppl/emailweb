import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@material-tailwind/react";
import {MaterialTailwindControllerProvider} from "./context/index.jsx";
import {Provider} from "react-redux";
import store from "./store/index.js";
import "react-toastify/dist/ReactToastify.css"; 
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <MaterialTailwindControllerProvider>
                <ThemeProvider>
                    <>
                        <App />
                        <ToastContainer position="top-right" autoClose={3000} />
                    </>
                </ThemeProvider>
            </MaterialTailwindControllerProvider>
        </BrowserRouter>
    </Provider>,
);
