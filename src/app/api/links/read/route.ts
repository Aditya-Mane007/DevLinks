import { connectDB } from "@/dbConfig/connectDb"
import { getTokenData } from "@/helpers/getDataFromToken"
import Link from "@/models/links.model"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    connectDB()
    const id = await getTokenData(request)

    const user = await User.findById(id).select("-password")

    if (!user) {
      throw new Error("User not found")
    }

    const links = await Link.find({ user: user._id })

    return NextResponse.json({
      message: "Get Links",
      links
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
