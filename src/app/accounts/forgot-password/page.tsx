import React from "react";
import ForgetPasswordForm from "./components/ForgetPasswordForm";
import JournaLogo from "@/components/JournaLogo";

const ForgotPassword = () => {
  return (
    <div className="bg-yellow_400 w-full h-[100vh] flex flex-col gap-10 items-center sm:justify-center px-4 pt-20 sm:p-0">
      <JournaLogo />
      <div className="w-full sm:w-[75%] lg:w-[50%] sm:h-[50%] lg:h-[65%] bg-white rounded-xl flex flex-col gap-8 items-center justify-center custom_shadow">
        <span className="flex flex-col gap-1 sm:gap-2 w-full sm:w-[70%] lg:w-[60%] 2xl:w-[50%] px-4 py-10 sm:p-0">
          <h2 className="text-2xl sm:text-3xl font-serifDisplay mx-auto">
            Forgot Password
          </h2>
          <ForgetPasswordForm />
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
