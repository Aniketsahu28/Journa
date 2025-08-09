import Image from "next/image";
import React from "react";

import signupBackground from "@/assets/Images/Backgrounds/SignupBackground.png";
import journaSquareLogo from "@/assets/Images/Logo/JournaSquareLogo.svg";
import LoginOtherOptions from "../../../components/LoginOtherOptions";
import LoginRedirect from "./components/LoginRedirect";
import SignupForm from "./components/SignupForm";

const Signup = () => {
  return (
    <div className="flex h-[100vh] w-full bg-white">
      <Image
        src={signupBackground}
        alt="Flight"
        className="w-[55%] object-cover"
      />
      <div className="w-[45%] flex items-start justify-center px-20 py-10 overflow-y-auto">
        <div className="flex flex-col gap-8 w-full">
          <span className="flex gap-2 items-center">
            <Image src={journaSquareLogo} alt="journa logo" className="w-10" />
            <h1 className="font-serifDisplay text-4xl">Journa</h1>
          </span>
          <span className="flex flex-col gap-1">
            <h2 className="font-serifDisplay text-3xl">Sign up</h2>
            <p className="font-nunito text-lg">
              Your story starts here. Let's create your account.
            </p>
          </span>
          <SignupForm />
          <LoginOtherOptions type="signup" />
          <LoginRedirect />
        </div>
      </div>
    </div>
  );
};

export default Signup;
