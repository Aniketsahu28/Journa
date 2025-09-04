"use client";
import { updateBucketItem } from "@/actions/updateBucketItem";
import Checkbox from "@/components/Buttons/Checkbox";
import IconRenderer from "@/components/IconRenderer/page";
import HotToast from "@/components/utils/HotToast";
import RealisticConfetti from "@/components/utils/RealisticPopper";
import { TBucketItem } from "@/types/bucketlist/TBucketItem";
import React, { useState } from "react";

const BucketItem = ({ bucketItem }: { bucketItem: TBucketItem }) => {
  const [trigger, setTrigger] = useState<boolean>(false);

  const handleComplete = async () => {
    if (!bucketItem.isComplete) {
      setTrigger(true);
      setTimeout(() => setTrigger(false), 1000);
    }

    const updatedBucketItem = await updateBucketItem({
      id: bucketItem.id,
      isComplete: !bucketItem.isComplete,
    });
    if (updatedBucketItem.success) {
      return <HotToast type="success" message="Bucket Item udpated" />;
    } else {
      return (
        <HotToast type="error" message="Something went wrong, try again" />
      );
    }
  };

  return (
    <>
      <div className="bg-white p-3 rounded-lg border hover:border-black/25 border-black/10 flex flex-1 gap-4 items-start min-w-[350px] max-w-[420px]">
        <Checkbox
          name={`${bucketItem.id}`}
          id={`${bucketItem.id}`}
          checked={bucketItem.isComplete}
          onChange={handleComplete}
        />
        <div className="flex flex-col gap-3 h-full w-full">
          <h3 className="font-poppins">{bucketItem.title}</h3>
          <div className="flex gap-3">
            <span className="flex gap-2 items-center border-[1.5px] border-yellow_100 rounded-md p-[5px]">
              <IconRenderer name="Calender" />
              {bucketItem.date ? (
                <p>{JSON.stringify(bucketItem.date)}</p>
              ) : (
                "Add Date"
              )}
            </span>
            <span className="flex gap-2 items-center border-[1.5px] border-red rounded-md p-[5px]">
              <IconRenderer name="Clock" />
              {bucketItem.reminder ? (
                <p>{JSON.stringify(bucketItem.reminder)}</p>
              ) : (
                "Add Reminder"
              )}
            </span>
          </div>
          <div className="flex flex-col gap-3 mt-auto">
            {bucketItem.tags.length > 0 && (
              <hr className="w-full text-black/20" />
            )}
            <span className="flex flex-wrap gap-3 font-nunito">
              {bucketItem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-black/8 px-2 py-1 rounded-md text-black/75"
                >
                  #{tag}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
      <RealisticConfetti trigger={trigger} />
    </>
  );
};

export default BucketItem;
