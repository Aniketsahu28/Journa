import type { Metadata } from "next";
import { DM_Serif_Display, Poppins, Nunito } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSerifDisplay.variable} ${poppins.variable} ${nunito.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
