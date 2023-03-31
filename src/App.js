import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import "./styles/tailwind.output.css";
import { Toaster } from "react-hot-toast";
import ChatMain from "./pages/ChatMain";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import { createContext, useEffect, useState } from "react";
import Gun from "gun";
import LoginSignupPage from "./pages/Login";
import ChatWindow from "./components/ChatWindow";
import ChatPanel from "./pages/ChatPanel";
import socketIO from "socket.io-client";

export const WalletContext = createContext();
export const SocketContext = createContext();

const gun = Gun({
  peers: ["http://localhost:5050/gun"],
});

const socket = socketIO.connect("https://kriya-convenor.psgtech.ac.in");

const App = () => {
  const [wAddress, setWAddress] = useState(
    localStorage.getItem("walletAddress")
  );

  const gun = Gun({
    peers: ["http://localhost:5000/gun"],
  });

  useEffect(() => {
    socket.emit("join-rooms", { email: localStorage.getItem("email") });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      <WalletContext.Provider
        value={{ walletAddress: wAddress, setWalletAddress: setWAddress }}
      >
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path="login" element={<LoginSignupPage />} />
            <Route path="chat" element={<Layout />}>
              <Route path="settings" element={<Settings />} />
              <Route path=":id" element={<ChatMain />} />
              <Route index element={<ChatPanel />} />
            </Route>
            <Route index element={<Navigate to="login" />} />
          </Routes>
        </BrowserRouter>
      </WalletContext.Provider>
    </SocketContext.Provider>
  );
};

export default App;
