import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { Footer, Navbar } from "@components";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="root-container">
      <Navbar />
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
      <Footer />
    </main>
  );
};
export default Layout;
