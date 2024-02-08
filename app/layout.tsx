import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Boilerplate Next.js + TypeScript + TailwindCSS + NextAuth.js @AlexandrePDA",
  description:
    "Boilerplate Next.js + TypeScript + TailwindCSS + NextAuth.js @AlexandrePDA",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log({ session });
  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav>{!!session && <span>je suis connecté</span>}</nav>
        <nav>{!session && <span>je suis déconnecté</span>}</nav>
        {children}
      </body>
    </html>
  );
}