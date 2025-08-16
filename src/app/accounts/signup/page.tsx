import Image from "next/image";
import React from "react";

import signupBackground from "@/assets/Images/Backgrounds/SignupBackground.png";
import LoginOtherOptions from "../../../components/LoginOtherOptions";
import LoginRedirect from "./components/LoginRedirect";
import SignupForm from "./components/SignupForm";
import JournaLogo from "@/components/JournaLogo";

const Signup = () => {
  return (
    <div className="flex py-6 sm:py-0 sm:h-[100vh] w-full bg-white">
      <Image
        src={signupBackground}
        alt="Flight"
        className="w-[55%] object-cover hidden lg:block"
      />
      <div className="w-full lg:w-[45%] flex items-start sm:items-center lg:items-start custom_item_center justify-center p-4 sm:p-20 lg:p-10 2xl:px-20 overflow-y-auto">
        <div className="flex flex-col gap-8 w-full">
          <JournaLogo />
          <span className="flex flex-col gap-1">
            <h2 className="font-serifDisplay text-2xl sm:text-3xl">Sign up</h2>
            <p className="font-nunito leading-5 sm:leading-7 sm:text-lg">
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
