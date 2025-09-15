"use client";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import IconRenderer from "@/components/IconRenderer/page";
import { signIn } from "next-auth/react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { errorMessageMap } from "@/lib/utils/oAuthErrorMessageMap";
import HotToast from "./HotToast";
import toast from "react-hot-toast";

const LoginOtherOptions = ({ type }: { type: string }) => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error) {
    toast.error(errorMessageMap[error] || errorMessageMap["default"]);
  }

  return (
    <>
      <span className="flex flex-col gap-4 font-nunito">
        <span className="flex gap-2 items-center justify-center relative">
          <hr className="w-[80%] absolute" />
          <p className="z-10 bg-white px-4">
            or {type === "login" ? "login" : "sign up"} with
          </p>
        </span>
        <SecondaryButton
          type="button"
          className="w-[80%] mx-auto flex gap-2 justify-center items-center text-lg"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <IconRenderer name="google" />
          <span>Google</span>
        </SecondaryButton>
      </span>
      <HotToast />
    </>
  );
};

export default LoginOtherOptions;
