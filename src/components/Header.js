import React, { useContext } from "react";
import { WalletContext } from "../App";

const Header = ({ title, className }) => {
  const { walletAddress, setWalletAddress } = useContext(WalletContext);

  const connectWallet = () => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((res) => {
        console.log(res);
        setWalletAddress(res[0]);
        localStorage.setItem("walletAddress", res[0]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <header
      className={`${className} p-4 px-8 flex items-center justify-between`}
    >
      <h1 className="text-4xl font-semibold">{title}</h1>
    </header>
  );
};

export default Header;
