"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import UserAvatar from "@/assets/Images/User/UserAvatar.jpg";
import SecondaryButton from "../Buttons/SecondaryButton";
import TertiaryButton from "../Buttons/TertiaryButton";
import InputBox from "../FormElements/InputBox";
import { DatePickerBox } from "../FormElements/DatePickerBox";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import { ZUserUpdateProfile } from "@/zod/ZUserUpdateProfile";
import toast from "react-hot-toast";
import z from "zod";
import { TProfileUpdateError } from "@/types/User/TProfileUpdateError";
import Loader from "../utils/Loader";
import { useSession } from "next-auth/react";
import { updateProfile } from "@/actions/User/updateProfile";

const Profile = () => {
  const userInfo = useAppSelector((state) => state.userInfo.userInfo);
  const nameRef = useRef<HTMLInputElement>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date>(userInfo?.dateOfBirth!);
  const [loading, setLoading] = useState<boolean>(false);
  const { update, data: session, status } = useSession();
  const [error, setError] = useState<TProfileUpdateError>({
    name: [],
    dateOfBirth: [],
  });

  const handleProfileUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    const result = ZUserUpdateProfile.safeParse({
      name: nameRef.current?.value,
      dateOfBirth: new Date(dateOfBirth).toLocaleDateString(),
    });

    if (result.success) {
      setError({
        name: [],
        dateOfBirth: [],
      });

      try {
        const updatedProfile = await updateProfile({
          userId: Number(userInfo?.id),
          name: result.data.name,
          dateOfBirth: dateOfBirth,
        });

        if (updatedProfile.success) {
          toast.success("Profile updated successfully");
          await update({
            user: {
              name: updatedProfile.data?.name,
              dateOfBirth: updatedProfile.data?.dateOfBirth,
            },
          });
        }
      } catch (error) {
        toast.error("Something went wrong, please try again");
      }
    } else {
      setError(z.flattenError(result.error).fieldErrors as TProfileUpdateError);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleProfileUpdate} className="flex flex-col gap-5 py-5">
      {/* <span className="flex gap-5 items-center mb-2">
        <Image
        src={UserAvatar}
        alt="User Avatar"
        className="w-24 object-contain rounded-full"
        width={40}
        height={40}
        />
        <SecondaryButton className="px-4">Upload New Image</SecondaryButton>
        <TertiaryButton className="border py-2 px-4 border-red text-red hover:bg-red hover:text-white">
        Remove Photo
        </TertiaryButton>
        </span> */}
      <span className="w-[50%]">
        <InputBox
          name="Name"
          label="Name"
          placeholder="John Doe"
          defaultValue={userInfo?.name}
          ref={nameRef}
          error={error.name}
        />
      </span>
      <span className="w-[50%]">
        <InputBox
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          defaultValue={userInfo?.email}
          disabled={true}
          error={error.dateOfBirth}
        />
      </span>
      <span className="w-[50%]">
        <DatePickerBox
          name="dateOfBirth"
          label="Date of Birth"
          disableFutureDates={true}
          value={dateOfBirth}
          onChange={(date) => setDateOfBirth(date!)}
        />
      </span>
      <PrimaryButton type="submit" className="w-52 px-6 mt-4">
        {loading ? <Loader className="mx-auto" /> : "Save Changes"}
      </PrimaryButton>
    </form>
  );
};

export default Profile;
