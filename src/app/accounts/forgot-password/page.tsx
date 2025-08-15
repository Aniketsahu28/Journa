import Image from "next/image";
import React from "react";
import journaSquareLogo from "@/assets/Images/Logo/JournaSquareLogo.svg";
import ForgetPasswordForm from "./components/ForgetPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="bg-yellow_400 w-full h-[100vh] flex flex-col gap-10 items-center justify-center">
      <span className="flex gap-2 items-center">
        <Image src={journaSquareLogo} alt="journa logo" className="w-10" />
        <h1 className="font-serifDisplay text-4xl">Journa</h1>
      </span>
      <div className="w-[50%] h-[65%] bg-white rounded-xl flex flex-col gap-8 items-center justify-center custom_shadow">
        <span className="flex flex-col gap-2 w-[60%]">
          <h2 className="text-3xl font-serifDisplay mx-auto">
            Forgot Password
          </h2>
          <ForgetPasswordForm />
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
