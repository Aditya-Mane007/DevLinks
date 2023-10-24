import Navbar from "@/components/Navbar"
import "../../globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DevLinks",
  description: "Link sharing app"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="w-full min-h-screen">{children}</div>
}
