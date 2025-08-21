export type TCategoryTree = {
    id: number | null;
    parentId: number | null;
    name: string;
    children: TCategoryTree[]
}