import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@material-tailwind/react";
import {MaterialTailwindControllerProvider} from "./context/index.jsx";
import {Provider} from "react-redux";
import store from "./store/index.js";
import { SocketProvider } from "./context/SocketProvider";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <MaterialTailwindControllerProvider>
                <SocketProvider>
                    <App />
                    </SocketProvider>
                
                </MaterialTailwindControllerProvider>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>,
);
