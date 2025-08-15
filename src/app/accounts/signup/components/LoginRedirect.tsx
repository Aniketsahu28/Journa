"use client";

import TertiaryButton from "@/components/Buttons/TertiaryButton";
import { redirect } from "next/navigation";

const SigninRedirect = () => {
  const redirectToSignin = () => {
    redirect("/accounts/login");
  };

  return (
    <p className="font-nunito text-lg text-center">
      Already have an account ?{" "}
      <TertiaryButton
        className="font-semibold hover:underline hover:underline-offset-2"
        onClick={redirectToSignin}
      >
        Login
      </TertiaryButton>
    </p>
  );
};

export default SigninRedirect;
