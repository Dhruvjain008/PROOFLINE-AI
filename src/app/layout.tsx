import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proofline AI — The Evidence-First Brand Governance Copilot",
  description: "Enterprise pre-flight brand compliance platform. Reviews content and campaign visuals against approved brand guidelines and factual sources.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FAF7EF] text-[#121E36]">
        {children}
      </body>
    </html>
  );
}
