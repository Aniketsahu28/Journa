import { TActiveCategory } from "@/types/category/TActiveCategory";
import { TCategoryTree } from "./TCategoryTree";

export type TCategoryItemProps = {
    category: TCategoryTree;
    activeCategory: TActiveCategory;
    handleSetActiveCategory: (categoryId: number, categoryName: string) => void;
};