import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Provider from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { cn, constructMetadata } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["400", "500", "800"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="light">
        <Provider>
          <body
            className={cn("min-h-screen font-sans antialiased", font.className)}
          >
            <Toaster />
            <Navbar />
            {children}
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
