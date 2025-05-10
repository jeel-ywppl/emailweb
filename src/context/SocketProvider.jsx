import {io} from "socket.io-client";

// const SOCKET_SERVER = "https://tushal.fun";
const SOCKET_SERVER = import.meta.env.VITE_APP_BASE_URL ?? "";

const socket = io(SOCKET_SERVER, {
    transports: ["websocket"],
});

export default socket;
