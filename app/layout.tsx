import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Pantry",
  description: "Organize and manage your pantry items efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-gray-900 text-white flex flex-col min-h-screen`}>
        <Provider>
          <NavBar className="sticky top-0 z-50" />
          <main className="flex-grow">
            {children}
          </main>
          <Footer className="z-50 w-full" />
        </Provider>
      </body>
    </html>
  );
}