import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import "./styles/tailwind.output.css";
import ChatMain from "./pages/ChatMain";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import { createContext, useState } from "react";
import Gun from "gun";
import Delete from "./pages/Delete";
import LoginSignupPage from "./pages/Login";

export const WalletContext = createContext();
export const GunContext = createContext();

const gun = Gun({
  peers: ["http://localhost:5050/gun"],
});

const App = () => {
  const [wAddress, setWAddress] = useState(
    localStorage.getItem("walletAddress")
  );

  const gun = Gun({
    peers: ["http://localhost:5000/gun"],
  });

  return (
    <GunContext.Provider value={{ gun }}>
      <WalletContext.Provider
        value={{ walletAddress: wAddress, setWalletAddress: setWAddress }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="chat" element={<Layout />}>
              <Route index element={<ChatMain />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="login" element={<LoginSignupPage />} />
            <Route path="delete" element={<Delete />} />
            <Route index element={<Navigate to="chat" />} />
          </Routes>
        </BrowserRouter>
      </WalletContext.Provider>
    </GunContext.Provider>
  );
};

export default App;
