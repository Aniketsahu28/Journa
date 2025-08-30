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
import DialogBox from "../utils/DialogBox";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import { setActiveCategory } from "@/lib/features/category/activeCategorySlice";

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
  const [openPopover, setOpenPopover] = useState(false);
  const [openDeleteCategoryDialogBox, setOpenDeleteCategoryDialogBox] =
    useState(false);
  const [openUpdateCategoryDialogBox, setOpenUpdateCategoryDialogBox] =
    useState(false);
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

  const handleAddCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setAddCategoryDefaultParent({ id: category.id!, name: category.name });
    setOpenPopover(false);
    setOpenAddCategoryDialogBox(true);
  };

  const handleDeleteCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenPopover(false);
    setOpenDeleteCategoryDialogBox(true);
  };

  const handleUpdateCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenPopover(false);
    setOpenUpdateCategoryDialogBox(true);
  };

  return (
    <>
      {/* Delete Category dialog box */}
      <DialogBox
        isOpen={openDeleteCategoryDialogBox}
        onClose={() => setOpenDeleteCategoryDialogBox(false)}
      >
        <DeleteCategory
          setOpenDeleteCategoryDialogBox={setOpenDeleteCategoryDialogBox}
          categoryInfo={{ name: category.name, id: category.id! }}
        />
      </DialogBox>

      {/* Update Category dialog box */}
      <DialogBox
        isOpen={openUpdateCategoryDialogBox}
        onClose={() => setOpenUpdateCategoryDialogBox(false)}
      >
        <UpdateCategory
          setOpenUpdateCategoryDialogBox={setOpenUpdateCategoryDialogBox}
          categoryInfo={category}
        />
      </DialogBox>

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
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger
              className={`p-1 hover:bg-yellow_200 flex rounded-md cursor-pointer outline-none`}
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
              <TertiaryButton
                className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400"
                onClick={handleAddCategory}
              >
                <IconRenderer name="Plus" />
                <p>Add Category</p>
              </TertiaryButton>
              <TertiaryButton className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400">
                <IconRenderer name="Plus" />
                <p>Add Bucket Item</p>
              </TertiaryButton>
              <hr className="text-black/25 m-1" />
              <TertiaryButton
                className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400"
                onClick={handleUpdateCategory}
              >
                <IconRenderer name="Edit" size={20} />
                <p>Update Category</p>
              </TertiaryButton>
              <TertiaryButton
                className="flex gap-2 w-full p-2 rounded-md hover:bg-red hover:text-white text-red"
                onClick={handleDeleteCategory}
              >
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
