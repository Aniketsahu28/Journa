"use client";
import { useState } from "react";
import TertiaryButton from "../Buttons/TertiaryButton";
import IconRenderer from "../IconRenderer/page";
import { TCategoryItemProps } from "./types/TCategoryItemProps";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import { setActiveCategory } from "@/lib/features/category/activeCategorySlice";
import CategoryItemMoreInfoPopover from "./CategoryItemMoreInfoPopover";

const CategoryItem = ({
  category,
  setOpenAddCategoryDialogBox,
  setAddCategoryDefaultParent,
}: TCategoryItemProps) => {
  const router = useRouter();
  const activeCategory = useAppSelector(
    (state) => state.activeCategory.activeCategory
  );
  const [openSubCategories, setOpenSubCategories] = useState(false);
  const dispatch = useAppDispatch();

  const handleCategoryClick = () => {
    dispatch(
      setActiveCategory({
        categoryId: category.id as number,
        categoryName: category.name,
      })
    );
    router.push(`/category/${category.id}`);
  };

  return (
    <>
      <div>
        {/* parent */}
        <span
          onClick={handleCategoryClick}
          className={`flex gap-2 items-center justify-between w-full rounded-md group cursor-pointer hover:bg-yellow_400 text-normal p-1 ${
            activeCategory?.categoryId === category.id && "bg-yellow_300"
          }`}
        >
          <span className="flex items-center gap-2">
            {category.children.length > 0 && (
              <TertiaryButton
                onClick={(event) => {
                  event?.stopPropagation();
                  setOpenSubCategories(!openSubCategories);
                }}
                className="p-1 rounded-sm hover:bg-yellow_200 transition-transform"
              >
                <IconRenderer
                  name="Arrow"
                  className={`transform transition-transform duration-300 ${
                    openSubCategories ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </TertiaryButton>
            )}
            <p className={`${category.children.length == 0 && "pl-2"}`}>
              {category.name}
            </p>
          </span>
          <CategoryItemMoreInfoPopover
            category={category}
            setOpenAddCategoryDialogBox={setOpenAddCategoryDialogBox}
            setAddCategoryDefaultParent={setAddCategoryDefaultParent}
          />
        </span>

        {/* childrens */}
        <div
          className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out border-l-2 border-yellow_100 ${
            openSubCategories ? "opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col">
            {category.children.map((child) => (
              <CategoryItem
                key={child.id}
                category={child}
                setOpenAddCategoryDialogBox={setOpenAddCategoryDialogBox}
                setAddCategoryDefaultParent={setAddCategoryDefaultParent}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;
