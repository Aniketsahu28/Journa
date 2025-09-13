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
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const CategoryBucketlistHeader = ({ categoryId }: { categoryId: number }) => {
  const router = useRouter();
  const [openAddBucketItemDialogBox, setOpenAddBucketItemDialogBox] =
    useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const activeCategory = useAppSelector(
    (state) => state.activeCategory.activeCategory
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!activeCategory) {
      const fetchCategoryName = async () => {
        const { data, error } = await fetchActiveCategoryName(
          Number(categoryId)
        );
        if (error) {
          return <HotToast type="error" message="Error while fetching data" />;
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

  const debounceValue = useDebounce(searchTitle);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debounceValue && debounceValue != "") {
      params.set("search", debounceValue);
    } else {
      params.delete("search");
    }
    router.push(`/category/${categoryId}?${params.toString()}`);
  }, [debounceValue]);

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
        <h1 className="ml-5 lg:ml-0 text-xl font-poppins font-medium">
          {activeCategory?.categoryName}
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <PrimaryButton
            className="flex gap-2 items-center px-4"
            onClick={() => setOpenAddBucketItemDialogBox(true)}
          >
            <IconRenderer name="Plus" />
            <span>Add Item</span>
          </PrimaryButton>
          <InputBox
            name="Search"
            placeholder="Search by title"
            className="w-80"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <TertiaryButton className="hover:bg-yellow_400 p-2.5 rounded-md">
            <IconRenderer name="Filter" />
          </TertiaryButton>
        </div>
      </div>
    </>
  );
};

export default CategoryBucketlistHeader;
