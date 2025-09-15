"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const HotToast = () => {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      toastOptions={{
        className: "font-nunito",
        duration: 4000,
        style: {
          boxShadow : "0 0 6px 0px rgba(0, 0, 0, 0.05)"
        }
      }}
    />
  );
};

export default HotToast;
