"use client";
import { useState } from "react";
import TertiaryButton from "../Buttons/TertiaryButton";
import IconRenderer from "../IconRenderer/page";
import { TCategoryItemProps } from "./types/TCategoryItemProps";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      {/* parent */}
      <span
        onClick={handleCategoryClick}
        className={`flex items-center justify-between w-full rounded-md group cursor-pointer hover:bg-yellow_400 text-normal p-1 ${
          activeCategory?.categoryId === category.id && "bg-yellow_300"
        }`}
      >
        <span className="flex items-center gap-2">
          {category.children.length > 0 && (
            <TertiaryButton
              onClick={(event) => {
                event?.stopPropagation(); // prevent selecting category
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
        <Popover>
          <PopoverTrigger
            className={`p-1 hover:bg-yellow_200 flex rounded-md cursor-pointer`}
            onClick={(event) => event?.stopPropagation()}
          >
            <IconRenderer
              name="MoreInfo"
              className="opacity-50 lg:opacity-0 group-hover:opacity-100"
            />
          </PopoverTrigger>
          <PopoverContent
            className="bg-white p-1 border-0 custom_shadow w-56 sm:w-64 animate-fade-in-zoom font-poppins text-normal"
            side="right"
            align="center"
            sideOffset={10}
          >
            <TertiaryButton className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400 ">
              <IconRenderer name="Plus" />
              <p>Add Category</p>
            </TertiaryButton>
            <TertiaryButton className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400 ">
              <IconRenderer name="Plus" />
              <p>Add Bucket Item</p>
            </TertiaryButton>
            <hr className="text-black/25 m-1" />
            <TertiaryButton className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400 ">
              <IconRenderer name="Edit" size={20} />
              <p>Rename</p>
            </TertiaryButton>
            <TertiaryButton className="flex gap-2 w-full p-2 rounded-md hover:bg-red hover:text-white text-red">
              <IconRenderer name="Delete" size={20} />
              <p>Delete Category</p>
            </TertiaryButton>
          </PopoverContent>
        </Popover>
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
