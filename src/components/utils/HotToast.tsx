"use client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const HotToast = ({
  message,
  type,
  duration,
}: {
  message: string;
  type: string;
  duration?: number;
}) => {
  if (type == "success") {
    toast.success(message);
  } else if (type == "error") {
    toast.error(message);
  } else if (type == "info") {
    toast(message);
  }

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        className: "font-nunito",
        duration: duration ?? 4000,
      }}
    />
  );
};

export default HotToast;
