"use client";
import React, { useState } from "react";
import JournaLogo from "../utils/JournaLogo";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const HelpAndFeedback = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const router = useRouter();

  const handleTermsAndPrivacy = () => {
    setOpenPopover(false);
    router.push("/termsandprivacy");
  };

  const handleGetSupport = () => {
    setOpenPopover(false);
    router.push("/getsupport");
  };

  return (
    <div className="mt-auto flex items-center justify-between text-normal">
      <JournaLogo className="scale-[60%] origin-left" />
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger
          className={`p-1 hover:bg-yellow_400 flex rounded-md cursor-pointer`}
        >
          <IconRenderer name="Question" />
        </PopoverTrigger>
        <PopoverContent
          className="bg-white p-1 border-0 custom_shadow w-64 animate-fade-in-zoom font-poppins text-normal"
          side="bottom"
          align="end"
        >
          <TertiaryButton className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400">
            <IconRenderer name="Bug" />
            <p>Report Bug</p>
          </TertiaryButton>
          <TertiaryButton className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400">
            <IconRenderer name="Star" />
            <p>Recommend Feature</p>
          </TertiaryButton>
          <hr className="text-black/25 m-1" />
          <TertiaryButton
            className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400"
            onClick={handleTermsAndPrivacy}
          >
            <IconRenderer name="Protect" size={20} />
            <p>Terms & Privacy</p>
          </TertiaryButton>
          <TertiaryButton
            className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400"
            onClick={handleGetSupport}
          >
            <IconRenderer name="Support" size={20} />
            <p>Get Support</p>
          </TertiaryButton>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HelpAndFeedback;
