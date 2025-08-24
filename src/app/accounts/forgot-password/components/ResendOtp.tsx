import TertiaryButton from "@/components/Buttons/TertiaryButton";
import HotToast from "@/components/utils/HotToast";
import Loader from "@/components/utils/Loader";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import React, { useState } from "react";

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
        return <HotToast type="success" message={`OTP sent to ${email}`} />;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return (
          <HotToast
            type="error"
            message={error?.response?.data?.error || "Something went wrong"}
          />
        );
      } else {
        return <HotToast type="error" message="An unexpected error occured" />;
      }
    }
    setLoading(false);
  };

  return (
    <TertiaryButton
      type="button"
      disable={loading}
      onClick={resendOTP}
      className="-mt-4 hover:underline hover:underline-offset-2"
    >
      {loading ? <Loader className="mx-auto" /> : "Resend OTP"}
    </TertiaryButton>
  );
};

export default ResendOtp;
