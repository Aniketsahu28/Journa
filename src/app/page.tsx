import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TestButton from "@/components/Buttons/TestButton";
import NavigationBar from "@/components/SideBar/NavigationBar";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex w-full justify-between">
      <NavigationBar />
      <TestButton />
    </div>
  );
}
