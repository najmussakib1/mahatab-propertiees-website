import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen bg-slate-950 text-white antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
