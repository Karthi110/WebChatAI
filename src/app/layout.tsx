import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Provider from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { cn, constructMetadata } from "@/lib/utils";

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
          <body
            className={cn(
              "min-h-[88vh] font-sans antialiased grainy",
              font.className
            )}
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
