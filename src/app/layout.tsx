import "./globals.css"
import type { Metadata } from "next"
import { Inter, Instrument_Sans } from "next/font/google"
import { Toaster } from "react-hot-toast"

// const inter = Inter({ subsets: ["latin"] })
const InstrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"]
})

export const metadata: Metadata = {
  title: "DevLinks",
  description: "Link sharing app"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={InstrumentSans.className}>
        <div className="w-full min-h-screen">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  )
}
