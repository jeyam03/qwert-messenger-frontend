import React, { useContext, useEffect, useReducer, useState } from "react";
import Header from "../components/Header";
import { BiShare } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { GunContext, WalletContext } from "../App";
import { faker } from "@faker-js/faker";
import ChatWindow from "../components/ChatWindow";
import { useNavigate } from "react-router-dom";
import { useChat } from "./useChat";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4600");

const ChatMain = () => {
  const [messageText, setMessageText] = useState("");

  const [username, setUsername] = useState(localStorage.getItem("email"));
  const [avatar, setAvatar] = useState(faker.image.avatar());

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() && localStorage.getItem("email")) {
      socket.emit("message", {
        text: messageText,
        name: localStorage.getItem("email"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessageText("");
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return (
    <section className="w-full flex flex-col">
      <Header title="Chats" className="h-24" />
      <div className="w-full flex">
        <div className="w-full lg:w-1/4 h-[calc(100vh-15rem)] lg:h-[calc(100vh-6rem)] overflow-y-auto overflow-x-auto">
          {initialData.map((item) => {
            return (
              <ChatHandleNavItem
                handleImage={item.handleImage}
                handleName={item.handleName}
                ethAddress={item.ethAddress}
              />
            );
          })}
        </div>
        <ChatWindow
          username={username}
          avatar={avatar}
          messageState={[messageText, setMessageText]}
          className={"hidden lg:flex"}
          sendMessage={handleSendMessage}
          messages={messages}
        />
      </div>
    </section>
  );
};

const ChatHandleNavItem = ({ ethAddress, handleName, handleImage }) => {
  const navigate = useNavigate();

  return (
    <button
      className="group z-30 relative flex items-center transition-all hover:bg-gray-200 justify-center p-4 space-x-2"
      onClick={() => {
        navigate(`/chat/id`);
      }}
    >
      <div
        style={{
          background: `url(${handleImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="rounded-full aspect-square w-12 group-hover:scale-125 transition-all"
      />
      <div className="flex-1">
        <p className="text-lg font-semibold text-left">{handleName}</p>
        <p className="text-gray-400 w-[30ch] overflow-x-hidden text-ellipsis">
          {ethAddress}
        </p>
      </div>
      <div className="hidden group-hover:block right-0 top-[50%] transition-all">
        <BiShare size={24} className="-scale-x-100 text-gray-400" />
      </div>
    </button>
  );
};

const initialData = [
  {
    handleName: "Abra Pobjay",
    handleImage: "http://dummyimage.com/223x100.png/dddddd/000000",
    ethAddress: "0xb4be687f70319b847590fd6a4d9d853fd5b1e8ac",
  },
  {
    handleName: "Davita Ketcher",
    handleImage: "http://dummyimage.com/125x100.png/5fa2dd/ffffff",
    ethAddress: "0xd158a00258f0ba237670ef814dfa0aa634d09e40",
  },
  {
    handleName: "Lem Macci",
    handleImage: "http://dummyimage.com/101x100.png/ff4444/ffffff",
    ethAddress: "0xfc4db0a4004bd3f535469aaefa22fe6357e08795",
  },
  {
    handleName: "Drugi Doche",
    handleImage: "http://dummyimage.com/136x100.png/cc0000/ffffff",
    ethAddress: "0x1be9d3fbb9d7318bfcf1a083b0af6c28d78f280e",
  },
  {
    handleName: "Jamie Bausor",
    handleImage: "http://dummyimage.com/163x100.png/5fa2dd/ffffff",
    ethAddress: "0x3b2d9706c0bf465f1cb336a765024379b9dd2e26",
  },
  {
    handleName: "Adelheid Linsley",
    handleImage: "http://dummyimage.com/122x100.png/ff4444/ffffff",
    ethAddress: "0xa9960e964d9ea1c05f287dcf35280d30b3b71cbe",
  },
  {
    handleName: "Berkly Camois",
    handleImage: "http://dummyimage.com/102x100.png/dddddd/000000",
    ethAddress: "0xdef2d63c60bf0637ab2f7e30109beb53790d3d60",
  },
  {
    handleName: "Ave Lithgow",
    handleImage: "http://dummyimage.com/221x100.png/5fa2dd/ffffff",
    ethAddress: "0x3fdbf1b9477140d93dd61653ee4575c94a56661f",
  },
  {
    handleName: "Farah Sorbey",
    handleImage: "http://dummyimage.com/104x100.png/ff4444/ffffff",
    ethAddress: "0x94247f934cbd6ea503c080a0b7f62cd317373772",
  },
  {
    handleName: "Leupold Kingsly",
    handleImage: "http://dummyimage.com/138x100.png/ff4444/ffffff",
    ethAddress: "0x02dd9584a46f8e2877165f6183b5a50d226c14a3",
  },
];

const dummyChat = [
  {
    text: "Hey",
    timestamp: "06:52 PM",
    side: "left",
    message_id: 4,
  },
  {
    text: "Hey",
    timestamp: "06:56 PM",
    side: "right",
    message_id: 3,
  },
  {
    text: "Is our Application Development Project finished ?",
    timestamp: "06:58 PM",
    side: "left",
    message_id: 2,
  },
  {
    text: "Yes, we have. It's called Qwert😉!",
    timestamp: "06:58 PM",
    side: "right",
    message_id: 2,
  },
  {
    text: "Qwert???! What does it do ?",
    timestamp: "06:58 PM",
    side: "left",
    message_id: 2,
  },
  {
    text: "It's decentralized messenger app, which also has crypto based payment, for cool people like us!",
    timestamp: "06:58 PM",
    side: "right",
    message_id: 2,
  },
];

export default ChatMain;
