import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiShare } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import axios from "axios";

const ChatList = ({ className }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://kriya-convenor.psgtech.ac.in/api/rooms-for/${localStorage.getItem("email")}`
      )
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchOtherFromDirect = (arr) => {
    console.log("ROOM", arr);
    const other = arr.filter((item) => item !== localStorage.getItem("email"));
    return other[0];
  };

  return (
    <div
      className={`${className} w-full lg:w-1/4 h-[calc(100vh-15rem)] lg:h-[calc(100vh-6rem)] overflow-y-auto overflow-x-auto`}
    >
      {list.map((l) => (
        <ChatHandleNavItem
          handleName={
            l.type === "direct"
              ? fetchOtherFromDirect(l.participants).split("@")[0]
              : l.roomId
          }
          ethAddress={
            l.type === "direct"
              ? fetchOtherFromDirect(l.participants)
              : "Group Chat"
          }
          href={l.roomId}
          type={l.type}
        />
      ))}
      <div className="p-4 w-full">
        <button
          onClick={() => {
            let email = window.prompt("Enter Email address");
            axios
              .post(`https://kriya-convenor.psgtech.ac.in/api/create-room`, {
                participants: [email, localStorage.getItem("email")],
                roomId: `room_${email.split("@")[0]}_${localStorage.getItem("email").split("@")[0]
                  }`,
              })
              .then((res) => {
                console.log(res);
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          className="bg-gray-200 hover:bg-gray-400 font-semibold tracking-widest px-4 py-2 rounded-lg shadow-lg w-full"
        >
          New Handler
        </button>
      </div>
    </div>
  );
};

export default ChatList;

const ChatHandleNavItem = ({
  ethAddress,
  handleName,
  href,
  type = "direct",
}) => {
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
          background:
            type === "direct"
              ? `url(https://cdn-icons-png.flaticon.com/512/3135/3135715.png)`
              : `url(https://cdn-icons-png.flaticon.com/512/74/74577.png)`,
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
    type: "direct",
    roomId: "room_20z209_20z222",
  },
  {
    name: "Aditya Varma",
    email: "20z205@psgtech.ac.in",
    type: "direct",
    roomId: "room_20z205_20z222",
  },
  {
    name: "Pranav P",
    email: "20z237@psgtech.ac.in",
    type: "direct",
    roomId: "room_20z237_20z222",
  },
  {
    name: "ADL Dev group",
    email: "",
    type: "group",
    roomId: "ADL_DEV",
  },
];

const initialDataFor20z209 = [
  {
    name: "Jeyam Palaniappan",
    email: "20z222@psgtech.ac.in",
    type: "direct",
    roomId: "room_20z209_20z222",
  },
  {
    name: "Aditya Varma",
    email: "20z205@psgtech.ac.in",
    type: "direct",
    roomId: "room_20z205_20z209",
  },
  {
    name: "Pranav P",
    email: "20z237@psgtech.ac.in",
    type: "direct",
    roomId: "room_20z237_20z209",
  },
  {
    name: "ADL Dev group",
    email: "",
    type: "group",
    roomId: "ADL_DEV",
  },
];
