"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import IconRenderer from "@/components/IconRenderer/page";
import Loader from "@/components/utils/Loader";
import React, { useState } from "react";
import { TBucketItem } from "@/types/bucketlist/TBucketItem";
import { updateBucketItem } from "@/actions/BucketList/updateBucketItem";
import toast from "react-hot-toast";

const ViewBucketItem = ({
  setViewBucketItemDialogBox,
  itemInfo,
  setTrigger,
}: {
  setViewBucketItemDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  itemInfo: TBucketItem;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleMarkComplete = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    try {
      const updatedItem = await updateBucketItem({
        id: itemInfo.id,
        isComplete: !itemInfo.isComplete,
      });
      if (updatedItem.success) {
        setViewBucketItemDialogBox(false);
        if (!itemInfo.isComplete) {
          setTrigger(true);
          setTimeout(() => setTrigger(false), 1000);
        }
        toast.success("New bucket item add");
      }
    } catch (error) {
      toast.error("Something went wront, please try again");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 w-[85vw] sm:w-[60vw] lg:w-[30vw]">
      <span className="flex flex-col gap-3">
        <h2 className="text-xl font-nunito font-medium">{itemInfo.title}</h2>
        {itemInfo.description && (
          <p className="font-nunito">{itemInfo.description}</p>
        )}
      </span>

      {(itemInfo.date || itemInfo.reminder) && (
        <div className="flex gap-3">
          {itemInfo.date && (
            <span className="flex gap-2 items-center border-[1.5px] border-yellow_100 rounded-md p-[5px]">
              <IconRenderer name="Calender" />
              {itemInfo.date?.toLocaleDateString()}
            </span>
          )}
          {/* <span className="flex gap-2 items-center border-[1.5px] border-red rounded-md p-[5px]">
            <IconRenderer name="Clock" />
            {itemInfo.reminder ? itemInfo.reminder?.toString() : "Add Reminder"}
          </span> */}
        </div>
      )}

      <div className="flex gap-3 items-center flex-wrap">
        {itemInfo.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-black/8 px-2 py-1 rounded-md text-black/75"
          >
            #{tag}
          </span>
        ))}
      </div>

      <span className="flex gap-3 w-full mt-2">
        <SecondaryButton
          className="w-full"
          onClick={() => setViewBucketItemDialogBox(false)}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          className="w-full"
          type="submit"
          onClick={handleMarkComplete}
        >
          {loading ? (
            <Loader className="mx-auto" />
          ) : itemInfo.isComplete ? (
            "Mark as Incomplete"
          ) : (
            "Mark as Complete"
          )}
        </PrimaryButton>
      </span>
    </div>
  );
};

export default ViewBucketItem;
