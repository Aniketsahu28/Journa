"use client";
import { signOut } from "next-auth/react";

export default function Button() {
  return <button onClick={() => signOut()}>signOut</button>;
}
