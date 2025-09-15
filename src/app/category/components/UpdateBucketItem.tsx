"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import InputBox from "@/components/FormElements/InputBox";
import TextAreaBox from "@/components/FormElements/TextAreaBox";
import IconRenderer from "@/components/IconRenderer/page";
import Loader from "@/components/utils/Loader";
import React, { useRef, useState } from "react";
import AddTags from "./AddTags";
import HotToast from "@/components/utils/HotToast";
import { TBucketItem } from "@/types/bucketlist/TBucketItem";
import { updateBucketItem } from "@/actions/BucketList/updateBucketItem";
import toast from "react-hot-toast";

const UpdateBucketItem = ({
  setOpenUpdateBucketItemDialogBox,
  bucketItem,
}: {
  setOpenUpdateBucketItemDialogBox: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  bucketItem: TBucketItem;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [tags, setTags] = useState<string[]>(bucketItem.tags);
  const [date, setDate] = useState<Date | null>(bucketItem.date);
  const [reminder, setReminder] = useState<Date | null>(bucketItem.reminder);

  const handleUpdateBucketItem = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    try {
      const updatedBucketItem = await updateBucketItem({
        id: bucketItem.id,
        title: titleRef.current?.value!,
        description: descriptionRef.current?.value,
        tags: tags,
        date: date ?? undefined,
        reminder: reminder ?? undefined,
        categoryId: bucketItem.categoryId!,
      });

      if (updatedBucketItem.success) {
        setOpenUpdateBucketItemDialogBox(false);
        toast.success("Bucket item updated");
      }
    } catch (error) {
      toast.error("Something went wront, please try again");
    }
    setLoading(false);
  };

  return (
    <>
      <form
        className="flex flex-col gap-6 w-[85vw] sm:w-[60vw] lg:w-[30vw]"
        onSubmit={handleUpdateBucketItem}
      >
        <span className="flex flex-col">
          <InputBox
            name="title"
            placeholder="Climb Mount Everest"
            ref={titleRef}
            required={true}
            borderLess={true}
            defaultValue={bucketItem.title}
            className="text-xl font-medium"
          />
          <TextAreaBox
            name="description"
            placeholder="Add more details..."
            ref={descriptionRef}
            borderLess={true}
            defaultValue={bucketItem.description}
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
            onClick={() => setOpenUpdateBucketItemDialogBox(false)}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton className="w-full" type="submit">
            {loading ? <Loader className="mx-auto" /> : "Save Changes"}
          </PrimaryButton>
        </span>
      </form>
      <HotToast />
    </>
  );
};

export default UpdateBucketItem;
