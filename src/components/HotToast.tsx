import React from "react";
import { Toaster } from "react-hot-toast";

const HotToast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        className: "font-nunito",
        duration: 4000,
      }}
    />
  );
};

export default HotToast;
