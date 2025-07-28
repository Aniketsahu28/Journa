import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TestButton from "@/components/TestButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex text-5xl font-semibold items-center justify-center w-full h-[100vh]">
      <p>Hello from journa</p>
      <br />
      <TestButton />
    </div>
  );
}
