import Image from "next/image";
import React from "react";

import loginBackground from "@/assets/Images/Backgrounds/LoginBackground.png";
import journaSquareLogo from "@/assets/Images/Logo/JournaSquareLogo.svg";
import LoginOtherOptions from "../../../components/LoginOtherOptions";
import SignupRedirect from "./components/SignupRedirect";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <div className="flex h-[100vh] w-full bg-white">
      <Image
        src={loginBackground}
        alt="Flight"
        className="w-[60%] object-cover"
      />
      <div className="w-[40%] flex items-center justify-center p-20">
        <div className="flex flex-col gap-8">
          <span className="flex gap-2 items-center">
            <Image src={journaSquareLogo} alt="journa logo" className="w-10" />
            <h1 className="font-serifDisplay text-4xl">Journa</h1>
          </span>
          <span className="flex flex-col gap-1">
            <h2 className="font-serifDisplay text-3xl">Login</h2>
            <p className="font-nunito text-lg">
              Welcome back. Enter your credentials to access your account
            </p>
          </span>
          <LoginForm />
          <LoginOtherOptions type="login" />
          <SignupRedirect />
        </div>
      </div>
    </div>
  );
};

export default Login;
