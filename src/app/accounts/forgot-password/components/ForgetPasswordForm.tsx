"use client";
import HotToast from "@/components/utils/HotToast";
import React, { useState } from "react";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import ResetPasswordForm from "./ResetPasswordForm";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("getEmail");

  return (
    <>
      {status == "getEmail" ? (
        <EmailForm
          loading={loading}
          setLoading={setLoading}
          setStatus={setStatus}
          setEmail={setEmail}
        />
      ) : status == "getOtp" ? (
        <OtpForm
          loading={loading}
          setLoading={setLoading}
          setStatus={setStatus}
          email={email}
        />
      ) : (
        <ResetPasswordForm
          loading={loading}
          setLoading={setLoading}
          email={email}
        />
      )}
      <HotToast />
    </>
  );
};

export default ForgetPasswordForm;
