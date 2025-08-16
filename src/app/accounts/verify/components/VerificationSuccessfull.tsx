"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import IconRenderer from "@/components/IconRenderer/page";
import { useRouter } from "next/navigation";
import React from "react";

const VerificationSuccessfull = () => {
  const router = useRouter();

  const redirectToLoginPage = () => {
    router.push("/accounts/login");
  };

  return (
    <div className="w-full sm:w-[75%] lg:w-[50%] sm:h-[50%] lg:h-[60%] bg-white rounded-xl flex flex-col gap-8 items-center justify-center verification-successfull-glow px-4 py-10 sm:p-0">
      <IconRenderer
        name="Verified"
        size={52}
        className="text-green sm:hidden"
      />
      <IconRenderer
        name="Verified"
        size={80}
        className="text-green hidden sm:block"
      />
      <span className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl sm:text-3xl font-serifDisplay">Verified!</h2>
        <p className="sm:text-lg font-nunito">
          Your have succesfully verified your account
        </p>
      </span>
      <PrimaryButton className="px-6" onClick={redirectToLoginPage}>
        Login
      </PrimaryButton>
    </div>
  );
};

export default VerificationSuccessfull;
