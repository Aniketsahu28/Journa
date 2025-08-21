import { TCategoryTree } from "./TCategoryTree";

export type TCategoryItemProps = {
    category: TCategoryTree;
    activeCategory: number | null;
    setActiveCategory: (id: number | null) => void;
};