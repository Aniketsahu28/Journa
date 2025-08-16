import PrimaryButton from "@/components/Buttons/PrimaryButton";
import OtpInputBox from "@/components/Form/OtpInputBox";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import { TOtpInputBoxHandle } from "@/types/TOtpInputBoxHandle";
import axios from "axios";
import React, { Dispatch, SetStateAction, useRef } from "react";
import toast from "react-hot-toast";
import ResendOtp from "./ResendOtp";

const OtpForm = ({
  loading,
  setLoading,
  setStatus,
  email,
}: {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setStatus: Dispatch<SetStateAction<string>>;
  email: string;
}) => {
  const otpRef = useRef<TOtpInputBoxHandle>(null);

  const validateOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!otpRef.current?.getValue()) {
        toast.error("OTP is required");
        return;
      }

      await axiosInstance.get("/api/verify-otp", {
        params: {
          email: email,
          userEnteredOtp: otpRef.current?.getValue(),
        },
      });

      setStatus("resetPassword");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.error || "Something went wrong");
      } else {
        toast.error("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <p className="font-nunito sm:text-lg mx-auto text-center">
        Please enter the 5 digit code sent to {email}
      </p>
      <form
        className="flex flex-col gap-10 items-center"
        onSubmit={validateOtp}
      >
        <OtpInputBox length={5} ref={otpRef} />
        <PrimaryButton className="w-full" type="submit" disable={loading}>
          {loading ? <Loader className="mx-auto" /> : "Submit"}
        </PrimaryButton>
        <ResendOtp email={email} />
      </form>
    </div>
  );
};

export default OtpForm;
