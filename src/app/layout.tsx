import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Grosse ligue multi opgg",
  description: "Easy multi-opgg for La Grosse Ligue",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
