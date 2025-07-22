import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokédex App",
  description: "A modern Pokédex built with Next.js and PokéAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="min-h-screen"
        style={{
          backgroundImage: "url('/pokedex-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-gray-50/90 dark:bg-gray-900/90 text-gray-900 dark:text-gray-50 min-h-screen">
          <header className="w-full py-6 flex justify-center border-b border-gray-200 dark:border-gray-800 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Pokédex</h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
