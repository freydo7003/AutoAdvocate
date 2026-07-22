import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "AutoAdvocate",
  description: "Know before you pay for car repairs."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <footer>AutoAdvocate prototype — educational guidance, not a substitute for an in-person inspection.</footer>
      </body>
    </html>
  );
}
