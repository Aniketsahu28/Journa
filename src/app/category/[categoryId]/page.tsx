import { fetchCategoryBucketlist } from "@/actions/fetchCategoryBucketlist";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CategoryBucketlistHeader from "../components/CategoryBucketlistHeader";
import BucketItem from "../components/BucketItem";

export default async function categoryBucketlist(props: {
  params: Promise<{ categoryId: string }>;
  searchParams?: Promise<{ search?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/accounts/login");
  }

  const { categoryId } = await props.params;
  const searchParams = await props.searchParams;
  const { data, error } = await fetchCategoryBucketlist(Number(categoryId), searchParams?.search);

  return (
    <div className="p-3 pt-2 sm:pl-6 flex flex-col gap-10 sm:gap-14 min-h-screen max-h-screen overflow-y-auto">
      <CategoryBucketlistHeader categoryId={Number(categoryId)} error={error}/>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-8 sm:pr-3 w-full justify-center">
        {data?.map((bucketItem) => (
            <BucketItem key={bucketItem.id} bucketItem={bucketItem} />
          ))}
      </div>
    </div>
  );
}
