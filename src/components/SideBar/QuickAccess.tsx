import React from "react";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";
import { quickAccess } from "./utils/quickAccess";
import { IconName } from "../IconRenderer/Icons/page";

const QuickAccess = () => {
  return (
    <div>
      {quickAccess.map((item, index) => (
        <TertiaryButton
          key={index}
          className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400 "
        >
          <IconRenderer name={item.icon as IconName} />
          <p>{item.name}</p>
        </TertiaryButton>
      ))}
    </div>
  );
};

export default QuickAccess;
