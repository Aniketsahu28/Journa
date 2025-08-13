"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import TertiaryButton from "@/components/Buttons/TertiaryButton";
import InputBox from "@/components/Form/InputBox";
import PasswordInputBox from "@/components/Form/PasswordInputBox";
import HotToast from "@/components/HotToast";
import Loader from "@/components/Loader";
import { TLoginFormError } from "@/types/TLoginFormError";
import { ZUserLoginSchema } from "@/zod/AuthUI/ZUserLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import z from "zod";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<TLoginFormError>({
    email: [],
    password: [],
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const result = ZUserLoginSchema.safeParse({ email, password });

    if (result.success) {
      setError({ email: [], password: [] });
      const res = await signIn("credentials", {
        redirect: false,
        email: result.data.email,
        password: result.data.password,
      });

      if (res?.ok) {
        router.push("/");
      } else {
        toast.error(res?.error as string, { duration: 4000 });
      }
    } else {
      setError(z.flattenError(result.error).fieldErrors as TLoginFormError);
    }
    setLoading(false);
  };

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleLogin}>
        <InputBox
          name="Email"
          label="Email"
          type="email"
          placeholder="johndoe@gmail.com"
          ref={emailRef}
          error={error?.email}
          required
          className="w-full"
        />
        <PasswordInputBox
          name="Password"
          label="Password"
          placeholder="Enter your password"
          ref={passwordRef}
          error={error?.password}
          required
          className="w-full"
        />
        <TertiaryButton className="w-fit self-end -mt-5 text-black">
          Forgot Password?
        </TertiaryButton>
        <PrimaryButton type="submit" disable={loading}>
          {loading ? <Loader className="mx-auto" /> : "Login"}
        </PrimaryButton>
      </form>
      <HotToast />
    </>
  );
};

export default LoginForm;
