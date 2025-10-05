"use client";
import React, { useState } from "react";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import Loader from "../utils/Loader";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import { deleteRawCategory } from "@/lib/features/category/rawCategorySlice";
import toast from "react-hot-toast";

const DeleteCategory = ({
  setOpenDeleteCategoryDialogBox,
  categoryInfo,
}: {
  setOpenDeleteCategoryDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  categoryInfo: { name: string; id: number };
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const deleteCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/api/category/delete-category/${categoryInfo.id}`
      );

      if (response.status == 200) {
        dispatch(deleteRawCategory(categoryInfo.id));
        setOpenDeleteCategoryDialogBox(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.error || "Something went wrong");
      } else {
        toast.error("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-[85vw] sm:w-[60vw] lg:w-[30vw]"
      onSubmit={deleteCategory}
    >
      <span className="flex flex-col gap-1">
        <h1 className="text-lg font-poppins font-medium">Delete Category</h1>
        <p className="font-nunito">
          You are about to delete{" "}
          <b className="text-red">{categoryInfo.name}</b>. <br />
          <br />
          Note: All bucket items in this category will also be deleted. Move
          them first if you wish to keep them.
        </p>
      </span>

      <span className="flex gap-3 w-full mt-2">
        <SecondaryButton
          className="w-full"
          onClick={() => setOpenDeleteCategoryDialogBox(false)}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          className="w-full text-white"
          type="submit"
          style={{ background: "red" }}
        >
          {loading ? <Loader className="mx-auto" /> : "Delete Category"}
        </PrimaryButton>
      </span>
    </form>
  );
};

export default DeleteCategory;
