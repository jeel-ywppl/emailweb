import {io} from "socket.io-client";

// const SOCKET_SERVER = "https://api.innvoxx.com";
const SOCKET_SERVER = import.meta.env.VITE_APP_LIVE_URL ?? "";

const socket = io(SOCKET_SERVER, {
    transports: ["websocket"],
    autoConnect: true,
});

export default socket;
