import React from "react";
import JournaLogo from "../utils/JournaLogo";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";

const HelpAndFeedback = () => {
  return (
    <div className="mt-auto flex items-center justify-between">
      <JournaLogo className="scale-[60%] origin-left" />
      <TertiaryButton className={`p-1 rounded-md hover:bg-yellow_400`}>
        <IconRenderer name="Question" />
      </TertiaryButton>
    </div>
  );
};

export default HelpAndFeedback;
