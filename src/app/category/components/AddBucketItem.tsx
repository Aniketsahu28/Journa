"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import InputBox from "@/components/FormElements/InputBox";
import TextAreaBox from "@/components/FormElements/TextAreaBox";
import IconRenderer from "@/components/IconRenderer/page";
import Loader from "@/components/utils/Loader";
import React, { useEffect, useRef, useState } from "react";
import AddTags from "./AddTags";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import { addBucketItem } from "@/actions/addBucketItem";
import HotToast from "@/components/utils/HotToast";

const AddBucketItem = ({
  setOpenAddBucketItemDialogBox,
  categoryId,
}: {
  setOpenAddBucketItemDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId: number;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const [reminder, setReminder] = useState<Date>();
  const userId = useAppSelector((state) => state.userInfo.userInfo?.id);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleAddBucketItem = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    try {
      const bucketItem = await addBucketItem({
        userId: Number(userId),
        title: titleRef.current?.value!,
        description: descriptionRef.current?.value,
        tags: tags,
        date,
        reminder,
        categoryId,
      });

      if(bucketItem.success){
        setOpenAddBucketItemDialogBox(false)
        return <HotToast type="success" message="New bucket item add" />
      }
    } catch (error) {
      return <HotToast type="error" message="Something went wront, please try again" />
    }
    setLoading(false)
  };

  return (
    <form
      className="flex flex-col gap-6 w-[85vw] sm:w-[60vw] lg:w-[30vw]"
      onSubmit={handleAddBucketItem}
    >
      <span className="flex flex-col">
        <InputBox
          name="title"
          placeholder="Climb Mount Everest"
          ref={titleRef}
          required={true}
          borderLess={true}
          className="text-xl font-semibold"
        />
        <TextAreaBox
          name="description"
          placeholder="Add more details..."
          ref={descriptionRef}
          borderLess={true}
          className="outline-none"
        />
      </span>

      <div className="flex gap-3">
        <span className="flex gap-2 items-center border-[1.5px] border-yellow_100 rounded-md p-[5px]">
          <IconRenderer name="Calender" />
          Add Date
        </span>
        <span className="flex gap-2 items-center border-[1.5px] border-red rounded-md p-[5px]">
          <IconRenderer name="Clock" />
          Add Reminder
        </span>
      </div>

      <AddTags tags={tags} setTags={setTags} />

      <span className="flex gap-3 w-full mt-2">
        <SecondaryButton
          className="w-full"
          onClick={() => setOpenAddBucketItemDialogBox(false)}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton className="w-full" type="submit">
          {loading ? <Loader className="mx-auto" /> : "Add Bucket Item"}
        </PrimaryButton>
      </span>
    </form>
  );
};

export default AddBucketItem;
