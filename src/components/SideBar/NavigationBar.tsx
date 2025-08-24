"use client";
import React, { useState } from "react";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";
import QuickAccess from "./QuickAccess";
import Profile from "./Profile";
import Categories from "./Categories";
import HelpAndFeedback from "./HelpAndFeedback";

const NavigationBar = () => {
  const [openNavigation, setOpenNavigation] = useState<boolean>(true);
  const toggleNavigationBar = () => {
    setOpenNavigation((openNavigation) => !openNavigation);
  };

  return (
    <div className="relative">
      {/* NavigationBar */}
      <div
        className={`bg-yellow_500 h-screen p-5 font-poppins flex flex-col gap-8 duration-300 transition-all ${
          openNavigation ? "translate-x-0 w-72" : "-translate-x-72 w-0"
        }`}
      >
        <Profile />
        <QuickAccess />
        <Categories />

        <HelpAndFeedback />
      </div>

      {/* NavigationBar toggle */}
      <TertiaryButton
        className={`p-1 rounded-md hover:bg-yellow_400 absolute top-6 transition-all duration-300
          ${openNavigation ? "left-60" : "left-2"}`}
        onClick={toggleNavigationBar}
      >
        <IconRenderer name="SideBar" />
      </TertiaryButton>
    </div>
  );
};

export default NavigationBar;
