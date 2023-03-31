import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useChat = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("https://kriya-convenor.psgtech.ac.in");

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
