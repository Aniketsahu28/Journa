import React from "react";
import VerificationSuccessfull from "./components/VerificationSuccessfull";
import VerificationFailed from "./components/VerificationFailed";
import axiosInstance from "@/lib/axios";
import JournaLogo from "@/components/JournaLogo";

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
      } w-full h-[100vh] flex flex-col gap-10 items-center sm:justify-center px-4 pt-20 sm:p-0`}
    >
      <JournaLogo />
      {verificationStatus ? (
        <VerificationSuccessfull />
      ) : (
        <VerificationFailed email={searchParams.email as string} />
      )}
    </div>
  );
}
