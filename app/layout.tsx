import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "AutoAdvocate | AI Repair Estimate Analyzer & Car Repair Second Opinion",
  description:
    "Upload a repair estimate, trouble code, or mechanic recommendation and get an AI-powered explanation, repair cost guidance, fairness insights, and questions to ask before approving car repairs.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      <footer className="site-footer">
  <div className="footer-inner">
    <div>
      <strong>AutoAdvocate</strong>
      <p>
        Understand your repair before you approve it.
      </p>
    </div>

    <div className="footer-links">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Use</a>
      <a href="/contact">Contact</a>
      <a href="/disclaimer">Disclaimer</a>
    </div>

    <p className="footer-disclaimer">
      AutoAdvocate provides educational guidance only and is not a substitute
      for an in-person vehicle inspection by a qualified professional.
    </p>

    <p className="footer-copyright">
      © 2026 AutoAdvocate. All rights reserved.
    </p>
  </div>
</footer>  
<Analytics />
      </body>
    </html>
  );
}
