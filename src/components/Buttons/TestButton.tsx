"use client";
import { signOut } from "next-auth/react";
import SecondaryButton from "./SecondaryButton";

export default function Button() {
  return (
    <SecondaryButton
      onClick={() => signOut({ callbackUrl: "/accounts/login" })}
    >
      Logout
    </SecondaryButton>
  );
}
