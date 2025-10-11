'use client'
import React from "react";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";
import { quickAccess } from "./utils/quickAccess";
import { IconName } from "../IconRenderer/Icons/page";
import { usePathname, useRouter } from "next/navigation";

const QuickAccess = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="-mt-2">
      {quickAccess.map((item, index) => (
        <TertiaryButton
          key={index}
          className={`flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400 text-[15px] ${pathname == '/' && "bg-yellow_300"}`}
          onClick={()=>router.push('/')}
        >
          <IconRenderer name={item.icon as IconName} />
          <p>{item.name}</p>
        </TertiaryButton>
      ))}
    </div>
  );
};

export default QuickAccess;
