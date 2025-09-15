"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import PasswordInputBox from "@/components/FormElements/PasswordInputBox";
import Loader from "@/components/utils/Loader";
import axiosInstance from "@/lib/axios";
import { TResetPasswordError } from "../types/TResetPasswordError";
import { ZResetPassword } from "@/zod/AuthUI/ZResetPassword";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import z from "zod";
import HotToast from "@/components/utils/HotToast";
import toast from "react-hot-toast";

const ResetPasswordForm = ({
  loading,
  setLoading,
  email,
}: {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  email: string;
}) => {
  const router = useRouter();
  const newPasswordRef = useRef<HTMLInputElement | null>(null);
  const confirmNewPasswordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<TResetPasswordError>({
    newPassword: [],
    confirmNewPassword: [],
  });

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = ZResetPassword.safeParse({
        newPassword: newPasswordRef.current?.value,
        confirmNewPassword: confirmNewPasswordRef.current?.value,
      });

      if (result.success) {
        const resposne = await axiosInstance.patch("/api/auth/reset-password", {
          email: email,
          newPassword: result.data.newPassword,
        });

        if (resposne.status == 200) {
          toast.success("Your password has been reset successfully");
          router.push("/accounts/login");
        }
      } else {
        setError(
          z.flattenError(result.error).fieldErrors as TResetPasswordError
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.error || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <p className="font-nunito sm:text-lg mx-auto text-center">
        Please reset password
      </p>
      <form className="flex flex-col gap-6" onSubmit={resetPassword}>
        <PasswordInputBox
          name="newPassword"
          label="New Password"
          placeholder="New password"
          ref={newPasswordRef}
          error={error?.newPassword}
          required
        />
        <PasswordInputBox
          name="confirmNewPassword"
          label="Confirm New Password"
          placeholder="Confirm new password"
          ref={confirmNewPasswordRef}
          error={error?.confirmNewPassword}
          required
        />
        <PrimaryButton className="w-full mt-4" type="submit" disable={loading}>
          {loading ? <Loader className="mx-auto" /> : "Submit"}
        </PrimaryButton>
      </form>
      <HotToast />
    </div>
  );
};

export default ResetPasswordForm;
