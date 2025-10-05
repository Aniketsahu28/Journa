"use client";
import React, { Dispatch, SetStateAction } from "react";
import TertiaryButton from "../Buttons/TertiaryButton";
import IconRenderer from "../IconRenderer/page";

const Sidebar = ({
  active,
  setActive,
}: {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="bg-yellow_500 min-w-48 p-3 flex flex-col gap-6 font-poppins">
      <h2 className="pl-1 text-xl font-nunito font-medium">Settings</h2>
      <div className="flex flex-col">
        <TertiaryButton
          onClick={() => setActive("Profile")}
          className={`flex gap-2 w-full rounded-md cursor-pointer hover:bg-yellow_400 text-normal p-2 ${
            active === "Profile" && "bg-yellow_300"
          }`}
        >
          <IconRenderer name="Profile" size={21} />
          <p>Profile</p>
        </TertiaryButton>
        <TertiaryButton
          onClick={() => setActive("Security")}
          className={`flex gap-2 w-full rounded-md cursor-pointer hover:bg-yellow_400 text-normal p-2 ${
            active === "Security" && "bg-yellow_300"
          }`}
        >
          <IconRenderer name="Lock" size={21} />
          <p>Security</p>
        </TertiaryButton>
      </div>
    </div>
  );
};

export default Sidebar;
