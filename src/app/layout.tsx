import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CurrencyProvider } from "@/lib/currency-context"
import { CountryProvider } from "@/lib/country-context"
import { TripsProvider } from "@/lib/trips-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RouteStamp - Country Tracker",
  description: "Track your travel journey across the world",
  manifest: "/manifest.json",
  themeColor: "#171717",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RouteStamp",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <CurrencyProvider>
            <CountryProvider>
              <TripsProvider>
        {children}
              </TripsProvider>
            </CountryProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
