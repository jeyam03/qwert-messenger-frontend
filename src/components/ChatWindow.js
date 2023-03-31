import React, { useContext, useEffect, useReducer, useState } from "react";
import { FiSend } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import socketIO from "socket.io-client";
import axios from "axios";
import { SocketContext } from "../App";
import FileUpload from "./FileUpload";
import { fetchUploadFile } from "../API/calls";
import { toast } from "react-hot-toast";
import ModalImage from "react-modal-image";

const ChatWindow = ({ className, avatar, username }) => {
  const { socket } = useContext(SocketContext);

  const [messageText, setMessageText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const sendMessage = async (e) => {
    e.preventDefault();

    if (photo !== null) {
      let formData = new FormData();
      formData.append("file", photo);
      await toast.promise(axios.post(`https://bogsdb.psgtech.ac.in/api/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }), {
        loading: "Uploading...",
        success: (res) => {
          setPhotoUrl(res.data.url);
          console.log(res.data.url);
          socket.emit("message", {
            text: res.data.url,
            name: localStorage.getItem("email"),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
            room: id,
            timeStamp: new Date(),
          });
          return "Uploaded";
        },
        error: "Error uploading file",
      });
    } else {
      if (messageText.trim() && localStorage.getItem("email")) {
        socket.emit("message", {
          text: messageText,
          name: localStorage.getItem("email"),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
          room: id,
          timeStamp: new Date(),
        });
      }
      setMessageText("");
    }
  };

  const [messages, setMessages] = useState([]);
  const [roomDetails, setRoomDetails] = useState(null);
  const [otherDetails, setOtherDetails] = useState(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    axios
      .get(`https://kriya-convenor.psgtech.ac.in/api/chats/${id}`)
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://kriya-convenor.psgtech.ac.in/api/room/${id}`)
      .then((res) => {
        console.log("ROOM", res.data);
        setRoomDetails(res.data);
        res.data.type === "direct"
          ? axios
            .get(
              `https://kriya-convenor.psgtech.ac.in/api/user/${fetchOtherFromDirect(
                res.data.participants
              )}`
            )
            .then((res) => {
              console.log("USER", res.data);
              setOtherDetails(res.data);
            })
            .catch((err) => {
              console.log(err);
            })
          : setOtherDetails({});
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const fetchOtherFromDirect = (arr) => {
    console.log("ROOM", arr);
    const other = arr.filter((item) => item !== localStorage.getItem("email"));
    return other[0];
  };

  return (
    <div
      className={`${className} w-full overflow-x-hidden flex flex-1 h-[calc(100vh-9rem)] lg:h-[calc(100vh-6rem)] flex-col relative`}
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
          <div className="space-y-1 ">
            <h1 className="text-2xl font-semibold">
              {roomDetails && otherDetails
                ? roomDetails.type === "direct"
                  ? otherDetails?.name
                  : roomDetails.roomId
                : "Loading..."}
            </h1>
            {
              roomDetails?.type === "group" && (
                <h2 className="text-gray-400 text-sm">
                  {
                    roomDetails?.participants?.map((item) => {
                      return item.split("@")[0] + ", ";
                    })
                  }
                </h2>
              )
            }
            <h2 className="text-gray-400 text-sm">
              {roomDetails
                ? roomDetails.type === "direct"
                  ? otherDetails?.email || "Loading..."
                  : "Group Chat"
                : "Loading..."}
            </h2>
          </div>
        </div>
      </header>
      <main className="bg-gray-100 overflow-y-auto h-[calc(100vw78rem)] flex-1 w-full px-4 py-4 relative z-0">
        <section className="w-full space-y-2">
          {messages.map((chat) =>
            username !== chat.name ? (
              <div className="">
                <p className="text-xs text-gray-400 mb-1 pl-4 hover:text-gray-600">
                  {chat.name.split("@")[0]}
                </p>
                <div className="flex w-full items-center space-x-2">
                  <div className="max-w-[400px] w-fit bg-gray-300 text-black rounded-r-full rounded-tl-full px-4 py-2">
                    {

                      /^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png)$/.test(
                        chat.text
                      ) ?
                        (
                          <a href={chat.text} target="_blank">
                            <img alt='img_path' className="w-20 h-20 rounded-full" src={chat.text} />
                          </a>
                        ) : chat.text
                    }
                  </div>
                  <p className="text-sm text-gray-400">
                    {new Date(chat.timeStamp).toLocaleString()}
                  </p>
                  <div className="flex-1"></div>
                </div>
              </div>
            ) : (
              <div className="">
                <p className="text-xs text-right text-gray-400 mb-1 pr-4 hover:text-gray-600">
                  {chat.name.split("@")[0]}
                </p>
                <div className="flex w-full items-center space-x-2">
                  <div className="flex-1"></div>
                  <p className="text-sm text-gray-400">
                    {new Date(chat.timeStamp).toLocaleString()}
                  </p>
                  <div className="max-w-[500px] w-fit  bg-purple-600 text-white rounded-l-full rounded-tr-full px-4 py-2">
                    {

                      /^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png)$/.test(
                        chat.text
                      ) ?
                        (
                          <a href={chat.text} target="_blank">
                            <img alt='img_path' className="w-20 h-20 rounded-full" src={chat.text} />
                          </a>
                        ) : chat.text
                    }
                  </div>
                </div>
              </div>
            )
          )}
        </section>
      </main>
      <section className="w-full p-4 bg-gray-200 flex space-x-4 items-center">
        <FileUpload
          fileState={[photo, setPhoto]}
          className="w-1/6 lg:w-[10%]"
          title="Upload Photo"
        />
        <input
          className="bg-white rounded-full px-6 py-3 w-5/6 flex-1 italic"
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
