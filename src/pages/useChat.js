import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useChat = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:4600");

    return () => {
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    console.log(`Connected with socket id: ${socketRef.current.id}`);
  }, [socketRef]);

  const getSocketID = () => socketRef?.current?.id;

  return { getSocketID };
};
