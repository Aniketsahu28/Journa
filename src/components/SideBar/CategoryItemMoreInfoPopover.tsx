"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import IconRenderer from "../IconRenderer/page";
import TertiaryButton from "../Buttons/TertiaryButton";
import DialogBox from "../utils/DialogBox";
import { TCategoryItemProps } from "./types/TCategoryItemProps";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import AddBucketItem from "@/app/category/components/AddBucketItem";

const CategoryItemMoreInfoPopover = ({
  category,
  setOpenAddCategoryDialogBox,
  setAddCategoryDefaultParent,
}: TCategoryItemProps) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [openDeleteCategoryDialogBox, setOpenDeleteCategoryDialogBox] =
    useState(false);
  const [openUpdateCategoryDialogBox, setOpenUpdateCategoryDialogBox] =
    useState(false);
  const [openAddBucketItemDialogBox, setOpenAddBucketItemDialogBox] =
    useState(false);

  const handleAddCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setAddCategoryDefaultParent({ id: category.id!, name: category.name });
    setOpenPopover(false);
    setOpenAddCategoryDialogBox(true);
  };
  
  const handleAddBucketItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenPopover(false);
    setOpenAddBucketItemDialogBox(true);
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
      
      {/* Add BucketItem dialog box */}
      <DialogBox
        isOpen={openAddBucketItemDialogBox}
        onClose={() => setOpenAddBucketItemDialogBox(false)}
      >
        <AddBucketItem
          setOpenAddBucketItemDialogBox={setOpenAddBucketItemDialogBox}
          categoryId={category.id!}
        />
      </DialogBox>

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
          <TertiaryButton className="flex gap-2 w-full p-2 rounded-md hover:bg-yellow_400" 
          onClick={handleAddBucketItem}>
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
    </>
  );
};

export default CategoryItemMoreInfoPopover;
