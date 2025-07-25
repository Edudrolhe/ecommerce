import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import NavBar from "./components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Hydrate from "./components/Hydrate";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Edu",
  description: "E-Commerce para vender meus objetos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
         <html lang="en">
      <body className={clsx(inter.className, 'bg-slate-700')}>
        <Hydrate>
          <NavBar />
        <main className=" h-screen p-16">
          {children}
        </main>
        </Hydrate>   
      </body>
    </html>

    </ClerkProvider>
 
  );
}