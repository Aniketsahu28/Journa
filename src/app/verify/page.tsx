import React from "react";
import VerificationSuccessfull from "./components/VerificationSuccessfull";
import VerificationFailed from "./components/VerificationFailed";
import Image from "next/image";
import journaSquareLogo from "@/assets/Images/Logo/JournaSquareLogo.svg";
import axiosInstance from "@/lib/axios";

export default async function Verify(props: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const searchParams = await props.searchParams;
  let verificationStatus = false;

  try {
    const response = await axiosInstance.post("/api/auth/verify-email", {
      token: searchParams.token,
      email: searchParams.email,
    });

    verificationStatus = response.status == 200 ? true : false;
  } catch (error: any) {
    verificationStatus = false;
  }

  return (
    <div
      className={`${
        verificationStatus ? "bg-green/40" : "bg-red/40"
      } w-full h-[100vh] flex flex-col gap-10 items-center justify-center`}
    >
      <span className="flex gap-2 items-center">
        <Image src={journaSquareLogo} alt="journa logo" className="w-10" />
        <h1 className="font-serifDisplay text-4xl">Journa</h1>
      </span>

      {verificationStatus ? (
        <VerificationSuccessfull />
      ) : (
        <VerificationFailed email={searchParams.email as string} />
      )}
    </div>
  );
}
