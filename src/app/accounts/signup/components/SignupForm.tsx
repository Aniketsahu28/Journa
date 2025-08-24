"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { DatePickerBox } from "@/components/FormElements/DatePickerBox";
import InputBox from "@/components/FormElements/InputBox";
import PasswordInputBox from "@/components/FormElements/PasswordInputBox";
import HotToast from "@/components/utils/HotToast";
import Loader from "@/components/utils/Loader";
import axiosInstance from "@/lib/axios";
import { TSignupFormError } from "../types/TSignupFormError";
import { ZUserSignupSchemaUI } from "@/zod/AuthUI/ZUserSignupUI";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import z from "zod";

const SignupForm = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
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
      dateOfBirth: dateOfBirth?.toLocaleDateString(),
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
          router.push("/accounts/login");
          return (
            <HotToast
              type="info"
              message="A verification email has been sent to you"
              duration={5000}
            />
          );
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
          return (
            <HotToast type="error" message="An unexpected error occured" />
          );
        }
      }
    } else {
      setError(z.flattenError(result.error).fieldErrors as TSignupFormError);
    }

    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSignup}>
      <div className="flex flex-col sm:flex-row gap-6">
        <span className="sm:w-[60%]">
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
        <span className="w-full sm:w-[40%]">
          <DatePickerBox
            name="dateOfBirth"
            label="Date of Birth"
            error={error?.dateOfBirth}
            disableFutureDates={true}
            value={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
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
      <div className="flex flex-col sm:flex-row gap-6">
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
        {loading ? <Loader className="mx-auto" /> : "Sign up"}
      </PrimaryButton>
    </form>
  );
};

export default SignupForm;
