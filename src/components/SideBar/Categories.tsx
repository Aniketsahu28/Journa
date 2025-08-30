"use client";
import React, { useEffect, useState } from "react";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";
import axiosInstance from "@/lib/axios";
import CategoryItem from "./CategoryItem";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import DialogBox from "../utils/DialogBox";
import AddCategory from "./AddCategory";
import { TAddCategoryDefaultParent } from "./types/TAddCategoryDefaultParent";
import { setRawCategory } from "@/lib/features/category/rawCategorySlice";
import { buildCategoryTree } from "./utils/buildCategoryTree";

const Categories = () => {
  const [openAddCategoryDialogBox, setOpenAddCategoryDialogBox] =
    useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState(true);
  const [addCategoryDefaultParent, setAddCategoryDefaultParent] =
    useState<TAddCategoryDefaultParent>(null);
  const rawCategory = useAppSelector((state) => state.rawCategory.rawCategory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserCategories = async () => {
      const response = await axiosInstance.get("/api/category");
      dispatch(setRawCategory(response.data.data));
    };

    fetchUserCategories();
  }, []);

  const categoryTree = buildCategoryTree(rawCategory);

  return (
    <>
      {/* Add Category dialog box */}
      <DialogBox
        isOpen={openAddCategoryDialogBox}
        onClose={() => setOpenAddCategoryDialogBox(false)}
      >
        <AddCategory
          setOpenAddCategoryDialogBox={setOpenAddCategoryDialogBox}
          defaultParent={addCategoryDefaultParent}
        />
      </DialogBox>

      <div className="flex flex-col gap-1">
        <span className="flex justify-between">
          <p className="font-medium">Categories</p>
          <span className="flex gap-0">
            <TertiaryButton
              className={`p-1 rounded-md hover:bg-yellow_400 outline-none`}
              onClick={() => setOpenAddCategoryDialogBox(true)}
            >
              <IconRenderer name="Plus" />
            </TertiaryButton>
            <TertiaryButton
              className={`p-1 rounded-md ${
                openCategories ? "hover:bg-yellow_400" : "bg-yellow_400"
              }`}
              onClick={() => {
                setOpenCategories(!openCategories);
              }}
            >
              <IconRenderer
                name="Arrow"
                className={`transform transition-transform duration-300 ${
                  openCategories ? "rotate-0" : "-rotate-90"
                }`}
              />
            </TertiaryButton>
          </span>
        </span>
        <div
          className={`flex flex-col transition-all duration-100 ease-in-out ${
            openCategories ? "opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {categoryTree.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              setOpenAddCategoryDialogBox={setOpenAddCategoryDialogBox}
              setAddCategoryDefaultParent={setAddCategoryDefaultParent}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
