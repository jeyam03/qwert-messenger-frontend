import React from "react";
import { useNavigate } from "react-router-dom";
import { BiShare } from "react-icons/bi";
import { FiSend } from "react-icons/fi";

const ChatList = ({ className }) => {
  return (
    <div
      className={`${className} w-full lg:w-1/4 h-[calc(100vh-15rem)] lg:h-[calc(100vh-6rem)] overflow-y-auto overflow-x-auto`}
    >
      {localStorage.getItem("email") === "20z209@psgtech.ac.in"
        ? initialDataFor20z209.map((item) => {
            return (
              <ChatHandleNavItem
                handleName={item.name}
                ethAddress={item.email}
                href={item.roomId}
              />
            );
          })
        : initialDataFor20z222.map((item) => {
            return (
              <ChatHandleNavItem
                handleName={item.name}
                ethAddress={item.email}
                href={item.roomId}
              />
            );
          })}
    </div>
  );
};

export default ChatList;

const ChatHandleNavItem = ({ ethAddress, handleName, href }) => {
  const navigate = useNavigate();

  return (
    <button
      className="group z-30 relative flex w-full items-center transition-all hover:bg-gray-200 justify-center p-4 space-x-2"
      onClick={() => {
        navigate(`/chat/${href}`);
      }}
    >
      <div
        style={{
          background: `url(https://cdn-icons-png.flaticon.com/512/3135/3135715.png)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="rounded-full aspect-square w-12 group-hover:scale-125 transition-all"
      />
      <div className="flex-1">
        <p className="text-lg font-semibold text-left">{handleName}</p>
        <p className="text-gray-400 w-[30ch] text-left overflow-x-hidden text-ellipsis">
          {ethAddress}
        </p>
      </div>
      <div className="hidden group-hover:block right-0 top-[50%] transition-all">
        <BiShare size={24} className="-scale-x-100 text-gray-400" />
      </div>
    </button>
  );
};

const initialDataFor20z222 = [
  {
    name: "Ashwin Kumar",
    email: "20z209@psgtech.ac.in",
    roomId: "room_20z209_20z222",
  },
  {
    name: "Aditya Varma",
    email: "20z205@psgtech.ac.in",
    roomId: "room_20z205_20z222",
  },
  {
    name: "Pranav P",
    email: "20z237@psgtech.ac.in",
    roomId: "room_20z237_20z222",
  },
];

const initialDataFor20z209 = [
  {
    name: "Jeyam Palaniappan",
    email: "20z222@psgtech.ac.in",
    roomId: "room_20z209_20z222",
  },
  {
    name: "Aditya Varma",
    email: "20z205@psgtech.ac.in",
    roomId: "room_20z205_20z209",
  },
  {
    name: "Pranav P",
    email: "20z237@psgtech.ac.in",
    roomId: "room_20z237_20z209",
  },
];
