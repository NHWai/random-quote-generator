import React from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";

interface Props {
  children: React.ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

const MainLayout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <main
      className={` w-screen max-w-[600px] mx-auto min-h-screen pt-4 px-4 ${inter.className}`}
    >
      {children}
    </main>
  );
};

export default MainLayout;
