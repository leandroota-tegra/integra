import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

// Configure Satoshi locally
const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/satoshi/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Integra Suite V3",
  description: "Transforming ideas into digital reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${satoshi.variable} font-sans`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
