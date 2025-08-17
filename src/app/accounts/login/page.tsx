import Image from "next/image";
import React from "react";

import loginBackground from "@/assets/Images/Backgrounds/LoginBackground.png";
import LoginOtherOptions from "@/components/utils/LoginOtherOptions";
import SignupRedirect from "./components/SignupRedirect";
import LoginForm from "./components/LoginForm";
import JournaLogo from "@/components/utils/JournaLogo";

const Login = () => {
  return (
    <div className="flex py-6 sm:py-0 sm:h-[100vh] w-full bg-white">
      <Image
        src={loginBackground}
        alt="Flight"
        className="w-[60%] object-cover hidden lg:block"
      />
      <div className="w-full lg:w-[40%] flex items-start sm:items-center lg:items-start 2xl:items-center justify-center p-4 sm:p-20 lg:p-10 2xl:px-20 overflow-y-auto">
        <div className="flex flex-col gap-8">
          <JournaLogo />
          <span className="flex flex-col gap-1">
            <h2 className="font-serifDisplay text-2xl sm:text-3xl">Login</h2>
            <p className="font-nunito leading-5 sm:leading-7 sm:text-lg">
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
