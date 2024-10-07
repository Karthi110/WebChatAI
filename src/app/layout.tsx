import { Recursive } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/navbar";
import { cn, constructMetadata } from "../lib/utils";
import Provider from "../components/provider";
import { Toaster } from "../components/ui/sonner";

const font = Recursive({ subsets: ["latin"] });

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
          <body className={cn("min-h-screen antialiased", font.className)}>
            <Toaster />
            <Navbar />
            {children}
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
