import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayaz Ali - Full Stack Developer",
  description: "Portfolio of Ayaz Ali, a passionate Full Stack Developer specializing in Next.js, React, TypeScript, and modern web technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
