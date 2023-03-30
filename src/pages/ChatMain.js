import React, { useContext, useEffect, useReducer, useState } from "react";
import Header from "../components/Header";
import { BiShare } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { GunContext, WalletContext } from "../App";
import { faker } from "@faker-js/faker";

// The messages array will hold the chat messages
const currentState = {
  messages: [],
};

// This reducer function will edit the messages array
const reducer = (state, message) => {
  return {
    messages: [message, ...state.messages],
  };
};

const ChatMain = () => {
  const { gun } = useContext(GunContext);
  const [messageText, setMessageText] = useState("");
  const [state, dispatch] = useReducer(reducer, currentState);

  const [username, setUsername] = useState(
    `${faker.name.firstName()} ${faker.name.lastName()}`
  );
  const [avatar, setAvatar] = useState(faker.image.avatar());

  // fires immediately the page loads
  useEffect(() => {
    const messagesRef = gun.get("MESSAGES_REFRESH");

    messagesRef.map().on((m) => {
      console.log("messagesRef", m);
      dispatch({
        sender: m.sender,
        avatar: m.avatar,
        content: m.content,
        timestamp: m.timestamp,
      });
    });
  }, []);

  // remove duplicate messages
  const newMessagesArray = () => {
    const formattedMessages = state.messages.filter((value, index) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        state.messages.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    return formattedMessages;
  };

  // save message to gun / send message
  const sendMessage = () => {
    // a reference to the current room
    const messagesRef = gun.get("MESSAGES_REFRESH");

    // the message object to be sent/saved
    const messageObject = {
      sender: username,
      avatar: avatar,
      content: messageText,
      timestamp: Date().substring(16, 21),
    };

    // this function sends/saves the message onto the network
    messagesRef.set(messageObject);

    // clear the text field after message has been sent
    setMessageText("");
  };

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
        <div className="hidden lg:flex flex-1 h-[calc(100vh-6rem)] flex-col relative">
          <header className="flex h-fit items-center justify-between p-4 relative z-30 shadow-lg w-full">
            <div className="flex items-center space-x-2">
              <div
                style={{
                  background: `url(${avatar})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="rounded-full aspect-square w-12 group-hover:scale-125 transition-all"
              />
              <div className="space-y-2 ">
                <h1 className="text-2xl font-semibold">{username}</h1>
                <h2 className="text-gray-400 text-sm">
                  0xb4be687f70319b847590fd6a4d9d853fd5b1e8ac
                </h2>
              </div>
            </div>
          </header>
          <main className="bg-gray-100 overflow-y-auto h-[calc(100vw78rem)] flex-1 w-full px-4 py-4 relative z-0">
            <section className="w-full space-y-2">
              {newMessagesArray().map((chat) =>
                username === chat.sender ? (
                  <div className="flex w-full items-center space-x-2">
                    <div className="max-w-[400px] w-fit bg-purple-600 text-white rounded-r-full rounded-tl-full px-4 py-2">
                      {chat.content}
                    </div>
                    <p className="text-sm text-gray-400">{chat.timestamp}</p>
                    <div className="flex-1"></div>
                  </div>
                ) : (
                  <div className="flex w-full items-center space-x-2">
                    <div className="flex-1"></div>
                    <p className="text-sm text-gray-400">{chat.timestamp}</p>
                    <div className="max-w-[500px] w-fit bg-gray-300 text-black rounded-l-full rounded-tr-full px-4 py-2">
                      {chat.content}
                    </div>
                  </div>
                )
              )}
            </section>
          </main>
          <section className="w-full p-4 bg-gray-200 flex space-x-4 items-center">
            <input
              className="bg-white rounded-full px-6 py-3 flex-1 italic"
              placeholder={"Type something here ..."}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="rounded-full bg-gradient-to-tl from-purple-700 to-purple-800 p-3 text-white"
            >
              <FiSend size={18} />
            </button>
          </section>
        </div>
      </div>
    </section>
  );
};

const ChatHandleNavItem = ({ ethAddress, handleName, handleImage }) => {
  return (
    <div className="group z-30 relative flex items-center transition-all hover:bg-gray-200 justify-center p-4 space-x-2">
      <div
        style={{
          background: `url(${handleImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="rounded-full aspect-square w-12 group-hover:scale-125 transition-all"
      />
      <div className="flex-1">
        <p className="text-lg font-semibold">{handleName}</p>
        <p className="text-gray-400 w-[30ch] overflow-x-hidden text-ellipsis">
          {ethAddress}
        </p>
      </div>
      <div className="hidden group-hover:block right-0 top-[50%] transition-all">
        <BiShare size={24} className="-scale-x-100 text-gray-400" />
      </div>
    </div>
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
