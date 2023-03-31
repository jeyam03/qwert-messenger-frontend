import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { faker } from "@faker-js/faker";
import ChatWindow from "../components/ChatWindow";
import ChatList from "../components/ChatList";



const ChatMain = () => {
  const [username, setUsername] = useState(localStorage.getItem("email"));
  const [avatar, setAvatar] = useState(faker.image.avatar());

  return (
    <section className="w-full flex flex-col">
      <Header title="Chats" className="h-24" />
      <div className="w-full flex">
        <ChatList className="hidden lg:block" />
        <ChatWindow username={username} avatar={avatar} className={"flex"} />
      </div>
    </section>
  );
};  
export default ChatMain;
