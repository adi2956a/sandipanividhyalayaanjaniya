import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "700"],
  variable: "--font-devanagari"
});

export const metadata: Metadata = {
  title: "Sandipani Vidyalaya, Anjaniya, Mandla",
  description: "Official website for Sandipani Vidyalaya, Anjaniya, Mandla, Madhya Pradesh."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} ${notoSansDevanagari.variable}`}>
        {children}
      </body>
    </html>
  );
}
