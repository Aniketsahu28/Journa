import IconRenderer from "@/components/IconRenderer/page";
import { TBucketItem } from "@/types/bucketlist/TBucketItem";
import React from "react";

const BucketItem = ({ bucketItem }: { bucketItem: TBucketItem }) => {
  return (
    <div className="p-3 rounded-md border hover:border-black/25 border-black/10 flex flex-1 gap-4 items-start">
      <input
        type="radio"
        name="Complete"
        id={`${bucketItem.id}`}
        className="w-6 h-6"
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
          <hr className="w-full text-black/20" />
          <span className="flex gap-3 font-nunito">
            {bucketItem.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black/5 px-2 py-1 rounded-md text-black/75"
              >
                #{tag}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BucketItem;
