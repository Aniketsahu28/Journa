"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import IconRenderer from "../IconRenderer/page";
import UserAvatar from "@/assets/Images/User/UserAvatar.jpg";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import { setUserInfo } from "@/lib/features/user/userInfoSlice";
import TertiaryButton from "../Buttons/TertiaryButton";
import Loader from "../utils/Loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DialogBox from "../utils/DialogBox";
import Settings from "../Settings/Settings";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [viewSettingsDialogBox, setViewSettingsDialogBox] = useState<boolean>(false);
  const { data: session } = useSession();
  const userInfo = useAppSelector((state) => state.userInfo.userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUserInfo({
          id: session.user.id!,
          name: session.user.name!,
          email: session.user.email!,
          image: session.user.image ?? null,
          dateOfBirth: session.user.dateOfBirth ?? null,
          country: session.user.country ?? null,
        })
      );
    }
  }, [session]);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/accounts/login" });
    setLoading(false);
  };

  const handleSettings = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpenPopover(false);
    setViewSettingsDialogBox(true);
  }

  return (
    <>
      {/* Settings Dialog box */}
      <DialogBox
        isOpen={viewSettingsDialogBox}
        onClose={() => setViewSettingsDialogBox(false)}
        padding={0}
        closeButtonCSS="mt-2 mr-2 sm:m-0"
      >
        <Settings />
      </DialogBox>

      <div className="flex items-center relative text-normal">
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger
            className={`py-1 px-2 hover:bg-yellow_400 flex items-center gap-2 rounded-md cursor-pointer`}
          >
            <Image
              src={userInfo?.image ?? UserAvatar}
              alt="User Avatar"
              className="w-8 object-contain rounded-full"
              width={40}
              height={40}
            />
            <span className="flex items-center gap-2">
              <p>{userInfo?.name}</p>
              <IconRenderer name="Arrow" size={18} className="-rotate-90" />
            </span>
          </PopoverTrigger>
          <PopoverContent
            className="bg-white p-1 border-0 custom_shadow w-64 animate-fade-in-zoom font-poppins text-normal"
            side="bottom"
            align="start"
          >
            <TertiaryButton className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400" onClick={handleSettings}>
              <IconRenderer name="Settings" />
              <p>Settings</p>
            </TertiaryButton>
            <TertiaryButton
              className="flex gap-2 w-full p-2 rounded-md hover:bg-red hover:text-white text-red"
              onClick={handleSignOut}
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  <IconRenderer name="Logout" />
                  <p>Logout</p>
                </>
              )}
            </TertiaryButton>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default Profile;
