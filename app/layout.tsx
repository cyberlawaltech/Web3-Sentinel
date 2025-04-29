import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { TemikaFABWrapper } from "@/components/temika/fab-client-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Web3 Security Multi-Agent System",
  description: "A comprehensive platform for web3 and blockchain security analysis",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <TemikaFABWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
