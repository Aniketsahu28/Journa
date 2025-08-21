"use client";
import React, { useEffect, useState } from "react";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";
import axiosInstance from "@/lib/axios";
import { buildCategoryTree } from "./utils/buildCategoryTree";
import CategoryItem from "./CategoryItem";
import { TCategoryTree } from "./types/TCategoryTree";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<TCategoryTree[]>([]);

  useEffect(() => {
    const fetchUserCategories = async () => {
      const response = await axiosInstance.get("/api/category");
      setCategories(buildCategoryTree(response.data.data));
    };

    fetchUserCategories();
  }, []);

  return (
    <div>
      <span className="flex justify-between">
        <p className="font-medium">Categories</p>
        <span className="flex gap-0">
          <TertiaryButton className={`p-1 rounded-md hover:bg-yellow_400`}>
            <IconRenderer name="Arrow" />
          </TertiaryButton>
          <TertiaryButton className={`p-1 rounded-md hover:bg-yellow_400`}>
            <IconRenderer name="Plus" />
          </TertiaryButton>
        </span>
      </span>
      <div className="flex flex-col">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
