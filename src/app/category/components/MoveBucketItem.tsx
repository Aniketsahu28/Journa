"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import Loader from "@/components/utils/Loader";
import React, { useState } from "react";
import CascadeSelect from "./CategorySelect";
import HotToast from "@/components/utils/HotToast";
import { updateBucketItem } from "@/actions/BucketList/updateBucketItem";

const MoveBucketItem = ({
  setOpenMoveBucketItemDialogBox,
  itemId,
  currentCategory,
}: {
  setOpenMoveBucketItemDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: number;
  currentCategory: number;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(currentCategory);

  const moveItem = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const movedBucketItem = await updateBucketItem({
        id: itemId,
        categoryId: categoryId,
      });

      if (movedBucketItem.success) {
        setOpenMoveBucketItemDialogBox(false);
        return <HotToast type="success" message="Bucket item moved." />;
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
      onSubmit={moveItem}
    >
      <h1 className="text-lg font-poppins font-medium">Move Bucket Item</h1>
      <span className="flex flex-col gap-1">
        <label htmlFor="categorySelec" className="text-black font-nunito">
          Select Category
        </label>
        <CascadeSelect value={categoryId} onChange={setCategoryId} />
      </span>
      <span className="flex gap-3 w-full mt-2">
        <SecondaryButton
          className="w-full"
          onClick={() => setOpenMoveBucketItemDialogBox(false)}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          className="w-full text-white"
          type="submit"
          style={{ background: "red" }}
        >
          {loading ? <Loader className="mx-auto" /> : "Move Item"}
        </PrimaryButton>
      </span>
    </form>
  );
};

export default MoveBucketItem;
