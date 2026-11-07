import type { Metadata } from "next";
import { Aboreto } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const AboretoFont = Aboreto({
  weight: "400",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Studior — Studio Rental",
  description: "Where great content comes alive inside.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${AboretoFont.className} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
