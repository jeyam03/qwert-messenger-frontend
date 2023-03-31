import React, { useContext, useEffect, useReducer, useState } from "react";
import Header from "../components/Header";

import { GunContext, WalletContext } from "../App";
import { faker } from "@faker-js/faker";
import ChatWindow from "../components/ChatWindow";
import { useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";

const ChatPanel = () => {
  const [username, setUsername] = useState(localStorage.getItem("email"));
  const [avatar, setAvatar] = useState(faker.image.avatar());

  return (
    <section className="w-full flex flex-col">
      <Header title="Chats" className="h-24" />
      <div className="w-full flex">
        <ChatList/>
        <ChatWindow
          username={username}
          avatar={avatar}
          className={"hidden lg:flex"}
        />
      </div>
    </section>
  );
};

export default ChatPanel;
