import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SF Boiler Permits | San Francisco Boiler Permit Specialists",

  description:
    "San Francisco Boiler Permit to Operate applications, renewals, inspections, corrections, and compliance support.",

  keywords: [
    "San Francisco Boiler Permit",
    "Boiler Permit",
    "Permit to Operate",
    "SF DBI",
    "Boiler Inspection",
    "Boiler Compliance",
    "C4 Contractor",
  ],

  authors: [
    {
      name: "SF Boiler Permits",
    },
  ],

  creator: "SF Boiler Permits",

  openGraph: {
    title: "SF Boiler Permits",

    description:
      "Professional Boiler Permit to Operate services throughout San Francisco.",

    siteName: "SF Boiler Permits",

    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}