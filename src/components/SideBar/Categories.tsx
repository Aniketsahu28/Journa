"use client";
import React, { useEffect, useState } from "react";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";
import axiosInstance from "@/lib/axios";
import { buildCategoryTree } from "./utils/buildCategoryTree";
import CategoryItem from "./CategoryItem";
import { TCategoryTree } from "./types/TCategoryTree";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import { setActiveCategory } from "@/lib/features/category/activeCategorySlice";

const Categories = () => {
  const [categories, setCategories] = useState<TCategoryTree[]>([]);
  const [openCategories, setOpenCategories] = useState(true);
  const activeCategory = useAppSelector(
    (state) => state.activeCategory.activeCategory
  );
  const dispatch = useAppDispatch();

  const handleSetActiveCategory = (
    categoryId: number,
    categoryName: string
  ) => {
    dispatch(setActiveCategory({ categoryId, categoryName }));
  };

  useEffect(() => {
    const fetchUserCategories = async () => {
      const response = await axiosInstance.get("/api/category");
      setCategories(buildCategoryTree(response.data.data));
    };

    fetchUserCategories();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <span className="flex justify-between">
        <p className="font-medium">Categories</p>
        <span className="flex gap-0">
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
          <TertiaryButton className={`p-1 rounded-md hover:bg-yellow_400`}>
            <IconRenderer name="Plus" />
          </TertiaryButton>
        </span>
      </span>
      <div
        className={`flex flex-col transition-all duration-100 ease-in-out ${
          openCategories ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            activeCategory={activeCategory}
            handleSetActiveCategory={handleSetActiveCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
