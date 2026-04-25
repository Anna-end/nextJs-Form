'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {Header} from "@/components/layout/header"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
const robotoHeading = Roboto({subsets:['latin'],variable:'--font-heading'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
            }
        }
  }))

  return (
    <html
      lang="en"
      className={cn("h-full","antialiased", geistSans.variable, geistMono.variable, robotoHeading.variable)}
    >
      <body className="mx-auto w-full max-w-md px-3 pb-44 pt-4 flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <QueryClientProvider client={queryClient}>
        <Header/>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
