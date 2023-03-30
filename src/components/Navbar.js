import React, { useState } from "react";
import { BsFillChatTextFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar = ({ profileImage }) => {
  const LOGO =
    "https://res.cloudinary.com/msprojects5/image/upload/v1674152420/isgjx8vrd96sesvn65m3.png";
  const navigate = useNavigate();
  const [chat, setChat] = useState(true);
  const [idk, setIdk] = useState(false);
  const [settings, setSettings] = useState(false);

  return (
    <nav className="lg:h-full w-full lg:w-fit border-r-2 border-r-gray-200 flex flex-row lg:flex-col justify-center lg:justify-between px-4 lg:px-0 py-0 lg:py-8 lg:pb-16 bg-gray-200 shadow-xl shadow-gray-400">
      <div className="hidden lg:flex justify-center items-center">
        <div
          className="rounded-full h-12 w-12 aspect-square shadow-lg shadow-purple-500"
          style={{
            background: `url(${profileImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div className="flex flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 items-center w-full justify-evenly lg:justify-center pb-4 lg:pb-0">
        <button className="p-4 lg:hover:bg-purple-300 rounded-xl group transition-all"
          onClick={() => {
            navigate("/chat")
            setChat(true)
            setIdk(false)
            setSettings(false)
          }}
        >
          <BsFillChatTextFill
            className={`${chat ? "text-purple-600" : "text-gray-600"} group-hover:text-purple-600 transition-all`}
            size={28}
          />
        </button>
        <button className="p-4 lg:hover:bg-purple-300 rounded-xl group transition-all"
          onClick={() => {
            navigate("/chat")
            setChat(false)
            setIdk(true)
            setSettings(false)
          }}
        >
          <MdPayments
            className={`${idk ? "text-purple-600" : "text-gray-600"} group-hover:text-purple-600 transition-all`}
            size={28}
          />
        </button>
        <button className="p-4 lg:hover:bg-purple-300 rounded-xl group transition-all"
          onClick={() => {
            navigate("/chat/settings")
            setChat(false)
            setIdk(false)
            setSettings(true)
          }}
        >
          <AiOutlineSetting
            className={`${settings ? "text-purple-600" : "text-gray-600"} group-hover:text-purple-600 transition-all`}
            size={28}
          />
        </button>
      </div>
      <img
        src={LOGO}
        alt="3845696"
        border="0"
        width="96"
        className="hidden lg:block relative origin-center -rotate-90 scale-150 "
      />
    </nav>
  );
};

export default Navbar;
