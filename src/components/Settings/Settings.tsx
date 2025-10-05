"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Security from "./Security";

const Settings = () => {
  const [active, setActive] = useState<string>("Profile");

  return (
    <div className="flex w-[85vw] sm:w-[60vw] lg:w-[65vw] min-h-[80vh]">
      <Sidebar active={active} setActive={setActive} />
      <div className="p-3 w-full flex flex-col gap-2">
        <h2 className="pl-1 text-lg font-nunito font-medium">{active}</h2>
        <hr className="text-black/15" />
        {active === "Profile" && <Profile />}
        {active === "Security" && <Security />}
      </div>
    </div>
  );
};

export default Settings;
