import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/accounts/login");
  }
  return (
    <div className="w-full h-full bg-white text-xl p-5 pt-6">Welcome home</div>
  );
}
