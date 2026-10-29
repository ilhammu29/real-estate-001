import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OXID Labs — Luxury Real Estate & Modern Architecture",
  description: "Modern luxury real estate architecture platform by OXID Labs featuring modernist cantilever villas, cottages, and private sanctuaries.",
  icons: {
    icon: "/images/logo_oxid_mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`scroll-smooth ${plusJakarta.variable}`}>
      <body className="antialiased bg-white text-[#0A0A0A] w-full min-h-screen selection:bg-[#0A0A0A] selection:text-white">
        {children}
      </body>
    </html>
  );
}
