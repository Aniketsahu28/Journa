"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import HotToast from "@/components/utils/HotToast";
import IconRenderer from "@/components/IconRenderer/page";
import Loader from "@/components/utils/Loader";
import axiosInstance from "@/lib/axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const VerificationFailed = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);

  const resendVerificationEmail = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("api/auth/send-verification", {
        email,
      });

      if (response.status == 201) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full sm:w-[75%] lg:w-[50%] h-[50%] lg:h-[60%] bg-white rounded-xl flex flex-col gap-8 items-center justify-center verification-failed-glow px-4 py-10 sm:p-0">
        <IconRenderer name="Failed" size={52} className="text-red sm:hidden" />
        <IconRenderer
          name="Failed"
          size={74}
          className="text-red hidden sm:block"
        />
        <span className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl sm:text-3xl font-serifDisplay">
            Verification Failed!
          </h2>
          <p className="sm:text-lg font-nunito">
            This link may be expired or already used
          </p>
        </span>
        <PrimaryButton
          className="px-6 sm:px-0 sm:w-80"
          onClick={resendVerificationEmail}
          disable={loading}
        >
          {loading ? (
            <Loader className="mx-auto" />
          ) : (
            "Resend Verification email"
          )}
        </PrimaryButton>
      </div>
      <HotToast />
    </>
  );
};

export default VerificationFailed;
