"use client";

import TertiaryButton from "@/components/Buttons/TertiaryButton";
import { useRouter } from "next/navigation";

const SigninRedirect = () => {
  const router = useRouter();
  const redirectToSignin = () => {
    router.push("/accounts/login");
  };

  return (
    <p className="font-nunito sm:text-lg text-center">
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
