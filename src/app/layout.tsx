import type { Metadata } from "next";
import { DM_Serif_Display, Poppins, Nunito } from "next/font/google";
import "./globals.css";
import SessionProviderContext from "@/components/Providers/SessionProviderContext";
import StoreProvider from "@/components/Providers/StoreProvider";
import NavigationBar from "@/components/SideBar/NavigationBar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Journa",
  description:
    "Welcome to Journa, a beautifully designed bucket list maker created to help you capture dreams, plan milestones, and celebrate achievements - all in one place.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${dmSerifDisplay.variable} ${poppins.variable} ${nunito.variable} antialiased bg-white`}
      >
        <SessionProviderContext>
          <StoreProvider>
            <div className="relative flex max-h-screen overflow-hidden">
              {session && <NavigationBar />}
              <main className="flex-1 transition-all duration-300">
                {children}
              </main>
            </div>
          </StoreProvider>
        </SessionProviderContext>
      </body>
    </html>
  );
}
