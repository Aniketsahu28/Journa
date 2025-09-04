"use client";
import { fetchActiveCategoryName } from "@/actions/fetchActiveCategoryName";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import TertiaryButton from "@/components/Buttons/TertiaryButton";
import InputBox from "@/components/FormElements/InputBox";
import IconRenderer from "@/components/IconRenderer/page";
import DialogBox from "@/components/utils/DialogBox";
import HotToast from "@/components/utils/HotToast";
import { setActiveCategory } from "@/lib/features/category/activeCategorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import React, { useEffect, useState } from "react";
import AddBucketItem from "./AddBucketItem";

const CategoryBucketlistHeader = ({ categoryId }: { categoryId: number }) => {
  const [error, setError] = useState<string | null>(null);
  const [openAddBucketItemDialogBox, setOpenAddBucketItemDialogBox] =
    useState<boolean>(false);
  const activeCategory = useAppSelector(
    (state) => state.activeCategory.activeCategory
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!activeCategory) {
      const fetchCategoryName = async () => {
        const { data, error } = await fetchActiveCategoryName(
          Number(categoryId)
        );
        if (error) {
          setError("Error while fetching data");
        } else {
          dispatch(
            setActiveCategory({
              categoryId: categoryId,
              categoryName: data?.name!,
            })
          );
        }
      };
      fetchCategoryName();
    }
  }, []);

  return (
    <>
      {/* Add Category dialog box */}
      <DialogBox
        isOpen={openAddBucketItemDialogBox}
        onClose={() => setOpenAddBucketItemDialogBox(false)}
      >
        <AddBucketItem
          setOpenAddBucketItemDialogBox={setOpenAddBucketItemDialogBox}
          categoryId={categoryId}
        />
      </DialogBox>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {error && <HotToast type="error" message={error} />}
        <h1 className="ml-5 lg:ml-0 text-xl font-poppins font-medium">
          {activeCategory?.categoryName}
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <PrimaryButton
            className="flex gap-2 items-center w-full px-4"
            onClick={() => setOpenAddBucketItemDialogBox(true)}
          >
            <IconRenderer name="Plus" />
            <span>Add Item</span>
          </PrimaryButton>
          <InputBox name="Search" placeholder="Search..." />
          <TertiaryButton className="hover:bg-yellow_400 p-2.5 rounded-md">
            <IconRenderer name="Filter" />
          </TertiaryButton>
        </div>
      </div>
    </>
  );
};

export default CategoryBucketlistHeader;
