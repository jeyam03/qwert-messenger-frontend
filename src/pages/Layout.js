import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router";



const Layout = () => {
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const LOGO =
    "https://res.cloudinary.com/msprojects5/image/upload/v1674152420/isgjx8vrd96sesvn65m3.png";
  const navigate = useNavigate();

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#F8F8F9] flex flex-col-reverse lg:flex-row">
      <Navbar profileImage={profileImage} />
      <div className="w-full h-full">
        <Outlet />
      </div>
      <div className="lg:hidden flex flex-row justify-between items-center px-6 py-3 bg-gray-100 shadow-xl">
        <div className="flex justify-center items-center">
          <div
            className="rounded-full h-12 w-12 aspect-square shadow-lg shadow-purple-500"
            style={{
              background: `url(${profileImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <img
          src={LOGO}
          alt="3845696"
          border="0"
          width="96"
          className="relative origin-center"
        />
      </div>
    </main>
  );
};
export default Layout;
