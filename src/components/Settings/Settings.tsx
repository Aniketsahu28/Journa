"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Security from "./Security";
import TertiaryButton from "../Buttons/TertiaryButton";
import IconRenderer from "../IconRenderer/page";

const Settings = () => {
  const [active, setActive] = useState<string>("Profile");
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="flex w-screen h-screen sm:w-[90vw] lg:w-[65vw] sm:h-[80vh] z-50">
      <Sidebar
        active={active}
        setActive={setActive}
        open={open}
        setOpen={setOpen}
      />
      <div className="p-3 w-full flex flex-col gap-2">
        <span className="flex gap-1 items-center">
          {/* NavigationBar toggle */}
          <TertiaryButton
            className="p-1 sm:hidden"
            style={{
              left: open ? `10px` : "0.5rem",
            }}
            onClick={() => setOpen(!open)}
          >
            <IconRenderer name="SideBar" />
          </TertiaryButton>
          <h2 className="pl-1 text-lg font-nunito font-medium">{active}</h2>
        </span>
        <hr className="text-black/15" />
        {active === "Profile" && <Profile />}
        {active === "Security" && <Security />}
      </div>
    </div>
  );
};

export default Settings;
