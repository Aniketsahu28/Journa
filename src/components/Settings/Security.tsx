"use client";
import React, { useRef, useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import toast from "react-hot-toast";
import z from "zod";
import Loader from "../utils/Loader";
import { TUpdatePasswordError } from "@/types/User/TUpdatePasswordError";
import { ZResetPassword } from "@/zod/AuthUI/ZResetPassword";
import { updatePassword } from "@/actions/User/updatePassword";
import PasswordInputBox from "../FormElements/PasswordInputBox";

const Security = () => {
  const userInfo = useAppSelector((state) => state.userInfo.userInfo);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmNewPasswordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TUpdatePasswordError>({
    currentPassword: [],
    newPassword: [],
    confirmNewPassword: [],
  });

  const handlePasswordUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    const result = ZResetPassword.safeParse({
      newPassword: newPasswordRef.current?.value,
      confirmNewPassword: confirmNewPasswordRef.current?.value,
    });

    if (result.success) {
      setError({
        currentPassword: [],
        newPassword: [],
        confirmNewPassword: [],
      });

      try {
        const updatedPassword = await updatePassword({
          userId: Number(userInfo?.id),
          currentPassword: currentPasswordRef.current?.value!,
          newPassword: result.data.newPassword,
        });

        if (updatedPassword.success) {
          toast.success(updatedPassword.message!);
          currentPasswordRef.current!.value = "";
          newPasswordRef.current!.value = "";
          confirmNewPasswordRef.current!.value = "";
        } else {
          toast.error(updatedPassword.error!);
        }
      } catch (error) {
        toast.error("Something went wrong, please try again");
      }
    } else {
      setError(
        z.flattenError(result.error).fieldErrors as TUpdatePasswordError
      );
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-5 py-5">
      <h3 className="text-lg font-nunito font-medium">Update password</h3>
      <span className="sm:w-[50%]">
        <PasswordInputBox
          name="currentPassword"
          label="Current Password"
          placeholder="Current Password"
          ref={currentPasswordRef}
          error={error.currentPassword}
          required
        />
      </span>
      <span className="sm:w-[50%]">
        <PasswordInputBox
          name="newPassword"
          label="New Password"
          placeholder="New Password"
          ref={newPasswordRef}
          error={error.newPassword}
          required
        />
      </span>
      <span className="sm:w-[50%]">
        <PasswordInputBox
          name="confirmNewPassword"
          label="Confirm New Password"
          placeholder="Confirm New Password"
          ref={confirmNewPasswordRef}
          error={error.confirmNewPassword}
          required
        />
      </span>
      <PrimaryButton type="submit" className="sm:w-52 px-6 mt-4">
        {loading ? <Loader className="mx-auto" /> : "Save Changes"}
      </PrimaryButton>
    </form>
  );
};

export default Security;
