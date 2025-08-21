import { TCategory } from "../types/TCategory";
import { TCategoryTree } from "../types/TCategoryTree";

export const buildCategoryTree = (categories: TCategory, parentId: number | null = null): TCategoryTree[] => {
    return categories
        .filter(category => category.parentId === parentId)
        .map(category => ({
            ...category,
            children: buildCategoryTree(categories, category.id),
        }));
}