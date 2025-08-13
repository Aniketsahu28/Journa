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
    <div className="w-[50%] h-[60%] bg-white rounded-xl flex flex-col gap-8 items-center justify-center verification-successfull-glow">
      <IconRenderer name="Verified" size={80} className="text-green" />
      <span className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl font-serifDisplay">Verified!</h2>
        <p className="text-lg font-nunito">
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
