"use client";
import React, { useRef, useState } from "react";
import InputBox from "../FormElements/InputBox";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import CascadeSelect from "./CategorySelect";
import axiosInstance from "@/lib/axios";
import HotToast from "../utils/HotToast";
import axios from "axios";
import Loader from "../utils/Loader";
import { TAddCategoryDefaultParent } from "./types/TAddCategoryDefaultParent";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import { addRawCategory } from "@/lib/features/category/rawCategorySlice";

const AddCategory = ({
  setOpenAddCategoryDialogBox,
  defaultParent,
}: {
  setOpenAddCategoryDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  defaultParent: TAddCategoryDefaultParent;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const newCategoryNameRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<number | null>(
    defaultParent?.id ?? null
  );
  const rawCategory = useAppSelector((state) => state.rawCategory.rawCategory);
  const dispatch = useAppDispatch();

  const addCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/category/add-category", {
        name: newCategoryNameRef.current?.value,
        parentId: selected,
      });

      if (response.status == 201) {
        dispatch(addRawCategory(response.data.data));
        setOpenAddCategoryDialogBox(false);
        return <HotToast type="success" message={response.data.message} />;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return (
          <HotToast
            type="error"
            message={error?.response?.data?.error || "Something went wrong"}
          />
        );
      } else {
        return <HotToast type="error" message="An unexpected error occured" />;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-[85vw] sm:w-[60vw] lg:w-[30vw]"
      onSubmit={addCategory}
    >
      <span className="flex flex-col gap-1">
        <h1 className="text-lg font-poppins font-medium">Add New Category</h1>
        <p className="font-nunito">Enter the details to add new categoy</p>
      </span>

      <InputBox
        name="categoryName"
        label="Category Name"
        placeholder="Enter category name"
        ref={newCategoryNameRef}
        required={true}
      />

      <span className="flex flex-col gap-1">
        <label htmlFor="categorySelec" className="text-black font-nunito">
          Select Parent Category
        </label>
        <CascadeSelect
          defaultValue={defaultParent?.name ?? null}
          value={selected}
          onChange={setSelected}
        />
      </span>
      <span className="flex gap-3 w-full mt-2">
        <SecondaryButton
          className="w-full"
          onClick={() => setOpenAddCategoryDialogBox(false)}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton className="w-full" type="submit">
          {loading ? <Loader className="mx-auto" /> : "Add Category"}
        </PrimaryButton>
      </span>
    </form>
  );
};

export default AddCategory;
