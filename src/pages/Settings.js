import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { BiCamera, BiPencil, BiShare } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Settings = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/login");
    } else {
      axios.get(`http://localhost:4600/api/user/${localStorage.getItem("email")}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        }
        );
    }
  }, []);


  return (
    <section className="w-full flex flex-col">
      <Header title="Dashboard" className="px-8 lg:px-12 py-8" />
      <div className="w-full flex flex-col items-center justify-center gap-16 mt-12 lg:mt-48">
        <div
          className="rounded-full h-48 w-48 shadow-lg shadow-purple-500 relative"
          style={{
            background: `url(https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <BiPencil className="text-4xl bg-gray-300 text-white-500 rounded-full p-2 w-12 h-12 absolute bottom-0 right-0" />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-semibold text-center">{data?.name}</h1>
          <h1 className="text-xl font-semibold text-center">{data?.email}</h1>
          <h1 className="text-lg font-semibold text-center">{data?.dept}</h1>
          <h1 className="text-lg font-semibold text-center">2020 - 2024</h1>
          <Button text="Logout" className="w-1/2 lg:w-1/4 mt-4" handleClick={() => {
            localStorage.removeItem("email");
            navigate("/login");
          }} />
        </div>
      </div>
    </section>
  );
};

export default Settings;
