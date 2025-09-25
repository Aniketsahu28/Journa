"use client";
import React, { useRef, useState } from "react";
import { TCategoryTree } from "./types/TCategoryTree";
import InputBox from "../FormElements/InputBox";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import CascadeSelect from "./CategorySelect";
import axiosInstance from "@/lib/axios";
import HotToast from "../utils/HotToast";
import axios from "axios";
import Loader from "../utils/Loader";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import { updateRawCategory } from "@/lib/features/category/rawCategorySlice";
import toast from "react-hot-toast";

const UpdateCategory = ({
  setOpenUpdateCategoryDialogBox,
  categoryInfo,
}: {
  setOpenUpdateCategoryDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  categoryInfo: TCategoryTree;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const updateCategoryNameRef = useRef<HTMLInputElement>(null);
  const [parentId, setParentId] = useState<number | null>(
    categoryInfo?.parentId ?? null
  );
  const rawCategory = useAppSelector((state) => state.rawCategory.rawCategory);
  const dispatch = useAppDispatch();

  const updateCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.patch(
        "/api/category/update-category",
        {
          id: categoryInfo.id,
          name: updateCategoryNameRef.current?.value,
          parentId: parentId,
        }
      );

      if (response.status == 200) {
        dispatch(updateRawCategory(response.data.data));
        setOpenUpdateCategoryDialogBox(false);
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
    <>
      <form
        className="flex flex-col gap-6 w-[85vw] sm:w-[60vw] lg:w-[30vw]"
        onSubmit={updateCategory}
      >
        <span className="flex flex-col gap-1">
          <h1 className="text-lg font-poppins font-medium">Update Category</h1>
          <p className="font-nunito">Enter the details to update categoy</p>
        </span>
        <InputBox
          name="categoryName"
          label="Category Name"
          placeholder="Enter category name"
          ref={updateCategoryNameRef}
          required={true}
          defaultValue={categoryInfo.name}
        />
        <span className="flex flex-col gap-1">
          <label htmlFor="categorySelec" className="text-black font-nunito">
            Select Parent Category
          </label>
          <CascadeSelect
            defaultValue={
              rawCategory.filter(
                (category) => category.id === categoryInfo.parentId
              )[0]?.name ?? null
            }
            value={parentId}
            onChange={setParentId}
            excludeId={categoryInfo.id}
          />
        </span>
        <span className="flex gap-3 w-full mt-2">
          <SecondaryButton
            className="w-full"
            onClick={() => setOpenUpdateCategoryDialogBox(false)}
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

export default UpdateCategory;
