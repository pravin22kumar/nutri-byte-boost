
import { ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuth } from "@/hooks/useAuth";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
