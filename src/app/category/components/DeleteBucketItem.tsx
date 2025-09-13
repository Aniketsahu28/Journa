"use client";
import React, { useState } from "react";
import HotToast from "@/components/utils/HotToast";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Loader from "@/components/utils/Loader";
import { deleteBucketItem } from "@/actions/BucketList/deleteBucketItem";

const DeleteBucketItem = ({
  setOpenDeleteBucketItemDialogBox,
  bucketItemId,
  title,
  categoryId
}: {
  setOpenDeleteBucketItemDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  bucketItemId: number;
  title: string,
  categoryId: number
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await deleteBucketItem({
        itemId: bucketItemId,
        categoryId: categoryId,
      });

      if (response.success) {
        setOpenDeleteBucketItemDialogBox(false);
        return <HotToast type="success" message={response.message as string} />;
      }
    } catch (error) {
      return (
        <HotToast
          type="error"
          message="Something went wront, please try again"
        />
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-[85vw] sm:w-[60vw] lg:w-[30vw]"
      onSubmit={deleteItem}
    >
      <span className="flex flex-col gap-1">
        <h1 className="text-lg font-poppins font-medium">Delete Bucket Item</h1>
        <p className="font-nunito">
          You are about to delete <b className="text-red">{title}</b>
          . <br />
          <br />
          Are you sure you want to delete this item ?
        </p>
      </span>

      <span className="flex gap-3 w-full mt-2">
        <SecondaryButton
          className="w-full"
          onClick={() => setOpenDeleteBucketItemDialogBox(false)}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          className="w-full text-white"
          type="submit"
          style={{ background: "red" }}
        >
          {loading ? <Loader className="mx-auto" /> : "Delete Item"}
        </PrimaryButton>
      </span>
    </form>
  );
};

export default DeleteBucketItem;
