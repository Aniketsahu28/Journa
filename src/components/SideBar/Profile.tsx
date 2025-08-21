"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import IconRenderer from "../IconRenderer/page";
import UserAvatar from "@/assets/Images/User/UserAvatar.jpg";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import { setUserInfo } from "@/lib/features/user/userInfoSlice";

const Profile = () => {
  const { data: session } = useSession();
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

  const userInfo = useAppSelector((state) => state.userInfo.userInfo);

  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <Image
          src={userInfo?.image ?? UserAvatar}
          alt="User Avatar"
          className="w-9 object-contain rounded-full"
          width={40}
          height={40}
        />
        <span className="flex items-center gap-2">
          <p className="text-lg">{userInfo?.name}</p>
          <IconRenderer name="Arrow" size={20} />
        </span>
      </span>
    </div>
  );
};

export default Profile;
