import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/accounts/login");
  }

  const greetingQuotes = [
    "Take a moment to reflect and write something today.",
    "Every word you write brings you closer to clarity.",
    "Let's pause, breathe, and capture your thoughts today.",
    "Ready to make progress on your journey?",
    "Glad to have you here again. Let's continue your story.",
    "Small steps today create big changes tomorrow.",
    "Your thoughts deserve to be heard — start writing.",
  ];

  const messageToShow = greetingQuotes[Math.floor(Math.random() * greetingQuotes.length)];

  return (
    <div className="p-3 pt-2 sm:pl-6 flex flex-col gap-10 sm:gap-8 min-h-screen max-h-screen overflow-y-auto">
      <h1 className="ml-8 mt-1 sm:mt-[10px] sm:ml-5 lg:ml-0 text-xl font-poppins font-medium">
        Home
      </h1>
      <span>
        <h1 className="font-poppins text-xl font-medium">
          Welcome back, {session.user.name?.split(" ")[0]}
        </h1>
        <p className="font-nunito">{messageToShow}</p>
      </span>
    </div>
  );
}
