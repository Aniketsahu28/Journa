import { TActiveCategory } from "@/types/category/TActiveCategory";
import { TCategoryTree } from "./TCategoryTree";
import { TAddCategoryDefaultParent } from "./TAddCategoryDefaultParent";
import { TCategory } from "./TCategory";

export type TCategoryItemProps = {
    category: TCategoryTree;
    setOpenAddCategoryDialogBox: React.Dispatch<React.SetStateAction<boolean>>
    setAddCategoryDefaultParent: React.Dispatch<React.SetStateAction<TAddCategoryDefaultParent>>
};