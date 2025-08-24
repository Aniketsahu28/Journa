"use client";
import { useState } from "react";
import TertiaryButton from "../Buttons/TertiaryButton";
import IconRenderer from "../IconRenderer/page";
import { TCategoryItemProps } from "./types/TCategoryItemProps";
import { useRouter } from "next/navigation";

const CategoryItem = ({
  category,
  activeCategory,
  handleSetActiveCategory,
}: TCategoryItemProps) => {
  const router = useRouter();
  const [openSubCategories, setOpenSubCategories] = useState(false);

  const handleCategoryClick = () => {
    handleSetActiveCategory(category.id as number, category.name as string);
    router.push(`/category/${category.id}`);
  };

  return (
    <div>
      {/* parent row */}
      <span
        onClick={handleCategoryClick}
        className={`flex items-center justify-between w-full rounded-md group cursor-pointer ${
          category.children.length > 0 ? "p-1" : "py-2 hover:py-[5px]"
        } ${
          activeCategory?.categoryId === category.id
            ? "bg-yellow_300"
            : "hover:bg-yellow_400"
        }`}
      >
        <span className="flex items-center gap-2">
          {category.children.length > 0 && (
            <TertiaryButton
              onClick={(event) => {
                event?.stopPropagation(); // prevent selecting category
                setOpenSubCategories(!openSubCategories);
              }}
              className="p-1 rounded-sm hover:bg-yellow_100 transition-transform"
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
        <TertiaryButton className={`p-1 rounded-sm hover:bg-yellow_200`}>
          <IconRenderer name="MoreInfo" className="hidden group-hover:block" />
        </TertiaryButton>
      </span>

      {/* children with smooth transition */}
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
              activeCategory={activeCategory}
              handleSetActiveCategory={handleSetActiveCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
