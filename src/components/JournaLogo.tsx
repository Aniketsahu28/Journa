import Image from "next/image";
import React from "react";
import journaSquareLogo from "@/assets/Images/Logo/JournaSquareLogo.svg";

const JournaLogo = () => {
  return (
    <span className="flex gap-2 items-center">
      <Image src={journaSquareLogo} alt="journa logo" className="w-8 sm:w-10" />
      <h1 className="font-serifDisplay text-3xl sm:text-4xl">Journa</h1>
    </span>
  );
};

export default JournaLogo;
