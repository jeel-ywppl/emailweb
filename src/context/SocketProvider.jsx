// import { createContext, useContext, useMemo } from "react";
// import { io } from "socket.io-client";
// import PropTypes from "prop-types";

// const SocketContext = createContext(null);

// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }) => {
//   const socket = useMemo(() => io("http://localhost:5000"), []);
//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };

// SocketProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };


import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io("https://tushal.fun"), []);
    console.log("🍤 socket", socket);
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;

};