import { useState, useEffect } from "react";
import { io } from "socket.io-client";
const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(url); //initialize socket connection
    socketInstance.on("connect", () => {
      console.log("Connected to socket.Io server");
    });

    socketInstance.on("disconnect", (error) => {
      console.log("Disconnected from socket.Io server", error);
    });

    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect(); //clean up the socket connection when component unmounts
      console.log("Socket Disconnected");
    };
  }, [url]);
  return socket;
};
export default useSocket;
