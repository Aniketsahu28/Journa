export type TBucketItem = {
    categoryId: number | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    tags: string[];
    date: Date | null;
    reminder: Date | null;
    isComplete: boolean;
    userId: number;
}