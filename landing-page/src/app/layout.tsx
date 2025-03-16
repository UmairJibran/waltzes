import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Waltzes - Create Professional Resumes with AI",
  description: "Build ATS-friendly resumes that stand out. Powered by AI, designed for success. Create your professional resume with Waltzes today.",
  keywords: ["resume builder", "AI resume", "professional resume", "ATS-friendly resume", "CV maker"],
  openGraph: {
    title: "Waltzes - Create Professional Resumes with AI",
    description: "Build ATS-friendly resumes that stand out. Powered by AI, designed for success.",
    url: "https://app.waltzyourway.com",
    siteName: "Waltzes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waltzes - Create Professional Resumes with AI",
    description: "Build ATS-friendly resumes that stand out. Powered by AI, designed for success.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
