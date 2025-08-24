import { fetchCategoryBucketlist } from "@/actions/fetchCategoryBucketlist";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HotToast from "@/components/utils/HotToast";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CategoryBucketlistHeader from "../components/CategoryBucketlistHeader";
import BucketItem from "../components/BucketItem";

export default async function categoryBucketlist(props: {
  params: Promise<{ categoryId: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/accounts/login");
  }

  const { categoryId } = await props.params;
  const { data, error } = await fetchCategoryBucketlist(Number(categoryId));
  if (error) {
    return <HotToast type="error" message="Error while fetching bucketlist" />;
  }

  return (
    <div className="p-5 pl-6 flex flex-col gap-14">
      <CategoryBucketlistHeader />
      <div className="flex gap-10 px-2 w-full">
        {data?.map((bucketItem) => (
          <BucketItem key={bucketItem.id} bucketItem={bucketItem} />
        ))}
      </div>
    </div>
  );
}
