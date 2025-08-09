"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputBox from "@/components/Form/InputBox";
import PasswordInputBox from "@/components/Form/PasswordInputBox";
import HotToast from "@/components/HotToast";
import axiosInstance from "@/lib/axios";
import { TSignupFormError } from "@/types/TSignupFormError";
import { ZUserSignupSchemaUI } from "@/zod/AuthUI/ZUserSignupUI";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import z from "zod";

const SignupForm = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const dateOfBirthRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TSignupFormError>({
    name: [],
    dateOfBirth: [],
    email: [],
    password: [],
    confirmPassword: [],
  });

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const result = ZUserSignupSchemaUI.safeParse({
      name: nameRef.current?.value,
      dateOfBirth: dateOfBirthRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
    });

    if (result.success) {
      setError({
        name: [],
        dateOfBirth: [],
        email: [],
        password: [],
        confirmPassword: [],
      });

      try {
        const res = await axiosInstance.post("/api/auth/signup", {
          name: result.data.name,
          email: result.data.email,
          password: result.data.password,
          dateOfBirth: result.data.dateOfBirth,
        });

        if (res.status === 201) {
          toast("A verification email has been sent to you", {
            duration: 5000,
          });
          toast.success(res.data.message, { duration: 5000 });
          router.push("/accounts/login");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.error || "Something went wrong");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    } else {
      setError(z.flattenError(result.error).fieldErrors as TSignupFormError);
    }

    setLoading(false);
  };

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleSignup}>
        <div className="flex gap-6">
          <span className="w-[60%]">
            <InputBox
              name="name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              ref={nameRef}
              error={error?.name}
              required
            />
          </span>
          <span className="w-[40%]">
            <InputBox
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              ref={dateOfBirthRef}
              error={error?.dateOfBirth}
              required
            />
          </span>
        </div>
        <span>
          <InputBox
            name="email"
            label="Email"
            type="email"
            placeholder="johndoe@gmail.com"
            ref={emailRef}
            error={error?.email}
            required
          />
        </span>
        <div className="flex gap-6">
          <span className="w-full">
            <PasswordInputBox
              name="password"
              label="Password"
              placeholder="Password"
              ref={passwordRef}
              error={error?.password}
              required
            />
          </span>
          <span className="w-full">
            <PasswordInputBox
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              error={error?.confirmPassword}
              required
            />
          </span>
        </div>
        <PrimaryButton type="submit" className="mt-2" disable={loading}>
          Sign up
        </PrimaryButton>
      </form>
      <HotToast />
    </>
  );
};

export default SignupForm;
