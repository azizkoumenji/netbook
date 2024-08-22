import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./authContext";

export const OnlineContext = createContext();

export const OnlineContextProvider = ({ children }) => {
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_LINK);
    socket.current.emit("add new user", currentUser.id);
    socket.current.on("get users", (activeUsers) => {
      setOnlineUsers(activeUsers);
    });
  }, []);

  return (
    <OnlineContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </OnlineContext.Provider>
  );
};
