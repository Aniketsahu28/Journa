"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import TertiaryButton from "@/components/Buttons/TertiaryButton";
import InputBox from "@/components/FormElements/InputBox";
import IconRenderer from "@/components/IconRenderer/page";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import React from "react";

const CategoryBucketlistHeader = () => {
  const activeCategory = useAppSelector(
    (state) => state.activeCategory.activeCategory
  );
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-xl font-poppins font-medium">
        {activeCategory?.categoryName}
      </h1>
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <PrimaryButton className="w-full px-6">Add Item</PrimaryButton>
        <InputBox name="Search" placeholder="Search..." />
        <TertiaryButton className="hover:bg-yellow_400 p-2.5 rounded-md">
          <IconRenderer name="Filter" />
        </TertiaryButton>
      </div>
    </div>
  );
};

export default CategoryBucketlistHeader;
