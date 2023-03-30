import React, { useEffect, useReducer } from "react";
import { FiSend } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ChatWindow = ({
  className,
  avatar,
  username,
  messageState = ["", (v) => {}],
  sendMessage = () => {},
  messages = [],
}) => {
  const [messageText, setMessageText] = messageState;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log("MESSAGES", messages);
  }, [messages]);

  return (
    <div
      className={`${className} flex flex-1 h-[calc(100vh-9rem)] lg:h-[calc(100vh-6rem)] flex-col relative`}
    >
      <header className="flex h-fit items-center justify-between p-4 relative z-30 shadow-lg w-full">
        <div className="flex items-center space-x-2">
          <button
            className="lg:hidden text-3xl"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoIosArrowBack />
          </button>
          <div
            style={{
              background: `url(${avatar || "https://picsum.photos/200"})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="rounded-full aspect-square w-12 group-hover:scale-125 transition-all"
          />
          <div className="space-y-2 ">
            <h1 className="text-2xl font-semibold">{username || "John Doe"}</h1>
            <h2 className="text-gray-400 text-sm">
              0xb4be687f70319b847590fd6a4d9d853fd5b1e8ac
            </h2>
          </div>
        </div>
      </header>
      <main className="bg-gray-100 overflow-y-auto h-[calc(100vw78rem)] flex-1 w-full px-4 py-4 relative z-0">
        <section className="w-full space-y-2">
          {messages.map((chat) =>
            username !== chat.name ? (
              <div className="flex w-full items-center space-x-2">
                <div className="max-w-[400px] w-fit bg-gray-300 text-black rounded-r-full rounded-tl-full px-4 py-2">
                  {chat.text}
                </div>
                <p className="text-sm text-gray-400">{chat.timestamp}</p>
                <div className="flex-1"></div>
              </div>
            ) : (
              <div className="flex w-full items-center space-x-2">
                <div className="flex-1"></div>
                <p className="text-sm text-gray-400">{chat.timestamp}</p>
                <div className="max-w-[500px] w-fit  bg-purple-600 text-white rounded-l-full rounded-tr-full px-4 py-2">
                  {chat.text}
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
  );
};

export default ChatWindow;
