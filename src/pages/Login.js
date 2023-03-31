import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Heading from "../components/Heading";
import TextInput from "../components/TextInput";
import departments from "../utils/Departments";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleClick = () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    if (!email.endsWith("@psgtech.ac.in")) {
      toast.error("Please enter your college email address");
      return;
    }

    if (!isLogin && !name && !dept) {
      toast.error("Please enter all the details");
      return;
    }

    if (isLogin) {
      toast.promise(
        axios.post("https://kriya-convenor.psgtech.ac.in/api/login", {
          email: email,
          password: password,
        }),
        {
          loading: "Logging In",
          success: () => {
            navigate("/chat");
            localStorage.setItem("email", email);
            return "Login Successful";
          },
          error: (err) => {
            console.log(err);
            return `Error: ${err.message}`
          }
        },
        {
          style: {
            minWidth: "200px",
          },
        }
      );
    } else {
      if (password === confirmPassword) {
        toast.promise(
          axios.post("https://kriya-convenor.psgtech.ac.in/api/signup", {
            email: email,
            password: password,
            name: name,
            dept: dept,
          }),
          {
            loading: "Signing Up",
            success: () => {
              navigate("/chat");
              localStorage.setItem("email", email);
              return "Signup Successful";
            },
            error: (err) => {
              console.log(err);
              return `Error: ${err.message}`
            }
          },
          {
            style: {
              minWidth: "200px",
            },
          }
        );
      } else {
        toast.error("Passwords do not match");
      }
    }
  };

  const LOGO =
    "https://res.cloudinary.com/msprojects5/image/upload/v1674152420/isgjx8vrd96sesvn65m3.png";

  return (
    <main className="w-screen h-screen bg-gradient-to-t from-purple-200 flex flex-col items-center justify-center">
      <img
        src={LOGO}
        alt="3845696"
        border="0"
        width="96"
        className="relative origin-center scale-150 pb-10 drop-shaow-xl"
      />
      <div className="w-[90%] lg:w-[400px] max-h-[38rem] lg:max-h-fit bg-white rounded-xl shadow-lg">
        <Heading className="px-6 lg:px-8 pt-8">{isLogin ? "Login" : "Signup"}</Heading>
        <div className="overflow-y-auto max-h-[60%] lg:max-h-fit px-6 lg:px-8">
          <TextInput
            className="mt-8"
            valueState={[email, setEmail]}
            placeholder="Enter Email"
            title="Email"
          />
          {
            !isLogin &&
            <div>
              <TextInput
                className="mt-4"
                valueState={[name, setName]}
                placeholder="Enter Name"
                title="Name"
              />
              <Dropdown
                className="mt-4"
                title="Department"
                options={departments}
                placeholder="Select Department"
                valueState={[dept, setDept]}
              />
            </div>
          }
          <TextInput
            className="mt-4"
            valueState={[password, setPassword]}
            placeholder="Enter Password"
            title="Password"
            type="password"
          />
          {
            !isLogin &&
            <TextInput
              className="mt-4"
              valueState={[confirmPassword, setConfirmPassword]}
              placeholder="Enter password again"
              title="Confirm Password"
              type="password"
            />
          }
        </div>
        <div className={`flex flex-col-reverse lg:flex-row mt-4 gap-4 items-center px-12 lg:px-8 pt-4 pb-8 ${!isLogin && "border-t-2 border-purple-600 lg:border-0"}`}>
          <Button text={isLogin ? "Switch to Signup" : "Switch to Login"} handleClick={() => setIsLogin(!isLogin)} outlined className="w-full lg:w-2/3" />
          <Button text={isLogin ? "Login" : "Signup"} handleClick={handleClick} className="w-full lg:w-1/3" />
        </div>
      </div>
    </main>
  );
};

export default Login;
