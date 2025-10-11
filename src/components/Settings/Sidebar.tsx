"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import TertiaryButton from "../Buttons/TertiaryButton";
import IconRenderer from "../IconRenderer/page";
import useDeviceType from "@/hooks/useDeviceType";

const Sidebar = ({
  active,
  setActive,
  open,
  setOpen,
}: {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const deviceType = useDeviceType();
  return (
    <div
      className="bg-yellow_500 min-w-48 p-3 fixed sm:relative flex flex-col gap-6 font-poppins h-full z-50 transition-transform duration-300 sm:rounded-l-xl"
      style={{
        transform: open ? "translateX(0)" : `translateX(-192px)`,
      }}
    >
      <span className="flex items-center justify-between">
        <h2 className="pl-1 text-xl font-nunito font-medium">Settings</h2>
        {/* Closing button */}
        <TertiaryButton
          className="text-black/70 p-1 sm:hidden"
          onClick={() => setOpen(false)}
        >
          <IconRenderer name="Plus" className="rotate-45" />
        </TertiaryButton>
      </span>
      <div className="flex flex-col">
        <TertiaryButton
          onClick={() => {
            setActive("Profile");
            deviceType == 'mobile' && setOpen(false);
          }}
          className={`flex gap-2 w-full rounded-md cursor-pointer hover:bg-yellow_400 text-normal p-2 ${
            active === "Profile" && "bg-yellow_300"
          }`}
        >
          <IconRenderer name="Profile" size={21} />
          <p>Profile</p>
        </TertiaryButton>
        <TertiaryButton
          onClick={() => {
            setActive("Security");
            deviceType == 'mobile' && setOpen(false);
          }}
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
