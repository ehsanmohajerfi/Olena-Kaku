import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Olena Kakut | Käsintehdyt täytekakut",
  description: "Uniikit, käsintehdyt täytekakut juhliin ja elämän makeimpiin hetkiin.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body>{children}</body>
    </html>
  );
}
