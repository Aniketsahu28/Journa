import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputBox from "@/components/Form/InputBox";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import React, { Dispatch, SetStateAction, useRef } from "react";
import toast from "react-hot-toast";

const EmailForm = ({
  loading,
  setLoading,
  setStatus,
  setEmail,
}: {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setStatus: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
}) => {
  const emailRef = useRef<HTMLInputElement>(null);

  const getOtpForEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/auth/forgot-password/generate-otp",
        {
          email: emailRef.current?.value,
        }
      );

      if (response.status == 200) {
        setEmail(emailRef.current?.value as string);
        setStatus("getOtp");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.error || "Something went wrong", {
          duration: 4000,
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-12">
      <p className="font-nunito text-lg mx-auto text-center">
        Enter the email to receive the OTP
      </p>
      <form className="flex flex-col gap-10" onSubmit={getOtpForEmail}>
        <InputBox
          name="Email"
          label="Email"
          type="email"
          placeholder="johndoe@gmail.com"
          ref={emailRef}
          required={true}
        />
        <PrimaryButton className="w-full" type="submit" disable={loading}>
          {loading ? <Loader className="mx-auto" /> : "Get OTP"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default EmailForm;
