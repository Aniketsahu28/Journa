"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TBucketItem } from "@/types/bucketlist/TBucketItem";
import DialogBox from "@/components/utils/DialogBox";
import IconRenderer from "@/components/IconRenderer/page";
import TertiaryButton from "@/components/Buttons/TertiaryButton";
import DeleteBucketItem from "./DeleteBucketItem";
import UpdateBucketItem from "./UpdateBucketItem";
import { addBucketItem } from "@/actions/BucketList/addBucketItem";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import HotToast from "@/components/utils/HotToast";
import Loader from "@/components/utils/Loader";
import MoveBucketItem from "./MoveBucketItem";
import toast from "react-hot-toast";

const BucketItemMoreInfo = ({ bucketItem }: { bucketItem: TBucketItem }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [openDeleteBucketItemDialogBox, setOpenDeleteBucketItemDialogBox] =
    useState(false);
  const [openUpdateBucketItemDialogBox, setOpenUpdateBucketItemDialogBox] =
    useState(false);
  const [openMoveBucketItemDialogBox, setOpenMoveBucketItemDialogBox] =
    useState(false);
  const userId = useAppSelector((state) => state.userInfo.userInfo?.id);

  const handleUpdateBucketItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenPopover(false);
    setOpenUpdateBucketItemDialogBox(true);
  };

  const handleDeleteBucketItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenPopover(false);
    setOpenDeleteBucketItemDialogBox(true);
  };

  const handleDuplicateBucketItem = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoading(true);
    try {
      const duplicatedBucketItem = await addBucketItem({
        userId: Number(userId),
        title: bucketItem.title,
        description: bucketItem.description ?? "",
        tags: bucketItem.tags,
        date: bucketItem.date ?? undefined,
        reminder: bucketItem.reminder ?? undefined,
        categoryId: bucketItem.categoryId!,
      });

      if (duplicatedBucketItem.success) {
        toast.success("New bucket item add");
      }
    } catch (error) {
      toast.error("Something went wront, please try again");
    } finally {
      setLoading(false);
      setOpenPopover(false);
    }
  };

  const handleMoveBucketItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenPopover(false);
    setOpenMoveBucketItemDialogBox(true);
  };

  return (
    <>
      {/* Update bucket Item dialog box */}
      <DialogBox
        isOpen={openUpdateBucketItemDialogBox}
        onClose={() => setOpenUpdateBucketItemDialogBox(false)}
      >
        <UpdateBucketItem
          setOpenUpdateBucketItemDialogBox={setOpenUpdateBucketItemDialogBox}
          bucketItem={bucketItem}
        />
      </DialogBox>

      {/* Delete bucket Item dialog box */}
      <DialogBox
        isOpen={openDeleteBucketItemDialogBox}
        onClose={() => setOpenDeleteBucketItemDialogBox(false)}
      >
        <DeleteBucketItem
          setOpenDeleteBucketItemDialogBox={setOpenDeleteBucketItemDialogBox}
          bucketItemId={bucketItem.id}
          title={bucketItem.title}
          categoryId={bucketItem.categoryId!}
        />
      </DialogBox>

      {/* Move bucket Item dialog box */}
      <DialogBox
        isOpen={openMoveBucketItemDialogBox}
        onClose={() => setOpenMoveBucketItemDialogBox(false)}
      >
        <MoveBucketItem
          setOpenMoveBucketItemDialogBox={setOpenMoveBucketItemDialogBox}
          itemId={bucketItem.id}
          currentCategory={bucketItem.categoryId!}
        />
      </DialogBox>

      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger
          className={`p-1 hover:bg-yellow_400 flex rounded-md cursor-pointer outline-none h-fit -mr-1 -mt-1`}
          onClick={(event) => event?.stopPropagation()}
        >
          <IconRenderer
            name="MoreInfo"
            className="opacity-50 lg:opacity-0 group-hover:opacity-100"
          />
        </PopoverTrigger>
        <PopoverContent
          className="bg-white p-1 border-0 custom_shadow w-56 animate-fade-in-zoom font-poppins text-normal"
          side="right"
          align="center"
          sideOffset={10}
        >
          <TertiaryButton
            className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400"
            onClick={handleUpdateBucketItem}
          >
            <IconRenderer name="Edit" size={20} />
            <p>Edit Bucket Item</p>
          </TertiaryButton>
          <TertiaryButton
            className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400"
            onClick={handleDuplicateBucketItem}
          >
            <IconRenderer name="Duplicate" size={20} />
            {loading ? <Loader /> : "Duplicate"}
          </TertiaryButton>
          <TertiaryButton
            className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400"
            onClick={handleMoveBucketItem}
          >
            <IconRenderer name="Move" size={20} />
            <p>Move to...</p>
          </TertiaryButton>
          <hr className="text-black/25 m-1" />
          <TertiaryButton
            className="flex gap-2 w-full p-2 rounded-md hover:bg-red hover:text-white text-red"
            onClick={handleDeleteBucketItem}
          >
            <IconRenderer name="Delete" size={20} />
            <p>Delete Bucket Item</p>
          </TertiaryButton>
        </PopoverContent>
      </Popover>
      <HotToast />
    </>
  );
};

export default BucketItemMoreInfo;
