import "../../globals.css"
import type { Metadata } from "next"
import { Instrument_Sans } from "next/font/google"
import { Toaster } from "react-hot-toast"

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
    <div className="w-screen min-h-screen flex justify-center items-center mx-auto bg-lightGrey">
      {children}
    </div>
  )
}
