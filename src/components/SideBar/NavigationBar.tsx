"use client";
import React, { useState, useRef, useEffect } from "react";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";
import QuickAccess from "./QuickAccess";
import Profile from "./Profile";
import Categories from "./Categories";
import HelpAndFeedback from "./HelpAndFeedback";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import {
  setNavigationOpen,
  setNavigationWidth,
} from "@/lib/features/navigation/navigationSlice";

const NavigationBar = () => {
  const selector = useAppSelector((state) => state.navigation);
  const dispatch = useAppDispatch();
  const [liveWidth, setLiveWidth] = useState<number>(selector.width);
  const isResizing = useRef(false);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isResizing.current = true;
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isResizing.current) return;
      const clientX =
        (e as MouseEvent).clientX || (e as TouchEvent).touches?.[0]?.clientX;
      if (!clientX) return;

      const newWidth = Math.max(288, Math.min(clientX, 500));
      setLiveWidth(newWidth);
    };

    const handleEnd = () => {
      if (isResizing.current) {
        isResizing.current = false;
        dispatch(setNavigationWidth(liveWidth));
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [liveWidth, dispatch]);

  return (
    <div className="fixed lg:relative z-50">
      {/* NavigationBar */}
      <div
        className="bg-yellow_500 h-screen max-h-screen pt-2 sm:pt-3 p-3 font-poppins flex flex-col gap-6 transition-transform duration-300"
        style={{
          width: selector.open ? liveWidth : 0,
          transform: selector.open
            ? "translateX(0)"
            : `translateX(-${selector.width}px)`,
          transition: isResizing.current
            ? "none"
            : "width 0.3s, transform 0.3s",
        }}
      >
        <Profile />
        <QuickAccess />
        <Categories />
        <HelpAndFeedback />

        {/* Resize Handle */}
        {selector.open && (
          <div
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            className="absolute top-0 right-0 w-1 lg:w-[2px] hover:w-1 h-full cursor-col-resize bg-yellow_400 lg:bg-yellow_400/50 hover:bg-yellow_300"
          />
        )}
      </div>

      {/* NavigationBar toggle */}
      <TertiaryButton
        className="p-1 rounded-md hover:bg-yellow_400 absolute top-3 sm:top-4 transition-all duration-300"
        style={{
          left: selector.open ? `${liveWidth - 44}px` : "0.5rem",
          display: isResizing.current ? "none" : "block",
        }}
        onClick={() => dispatch(setNavigationOpen())}
      >
        <IconRenderer name="SideBar" />
      </TertiaryButton>
    </div>
  );
};

export default NavigationBar;
