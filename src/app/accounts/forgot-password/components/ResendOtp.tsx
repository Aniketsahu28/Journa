import TertiaryButton from "@/components/Buttons/TertiaryButton";
import HotToast from "@/components/utils/HotToast";
import Loader from "@/components/utils/Loader";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ResendOtp = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);

  const resendOTP = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/auth/forgot-password/generate-otp",
        {
          email,
        }
      );

      if (response.status == 200) {
        toast.success(`OTP sent to ${email}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.error || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <TertiaryButton
        type="button"
        disable={loading}
        onClick={resendOTP}
        className="-mt-4 hover:underline hover:underline-offset-2"
      >
        {loading ? <Loader className="mx-auto" /> : "Resend OTP"}
      </TertiaryButton>
      <HotToast />
    </>
  );
};

export default ResendOtp;
