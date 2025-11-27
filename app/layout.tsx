import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@components";
import { auth } from "@/auth";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Rentify",
  description: "Discover the best cars in the world",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
