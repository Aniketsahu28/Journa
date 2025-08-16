"use client";

import TertiaryButton from "@/components/Buttons/TertiaryButton";
import { redirect } from "next/navigation";
import React from "react";

const SignupRedirect = () => {
  const redirectToSignup = () => {
    redirect("/accounts/signup");
  };

  return (
    <p className="font-nunito sm:text-lg text-center">
      Don't have an account ?{" "}
      <TertiaryButton
        className="font-semibold hover:underline hover:underline-offset-2"
        onClick={redirectToSignup}
      >
        Sign up
      </TertiaryButton>
    </p>
  );
};

export default SignupRedirect;
