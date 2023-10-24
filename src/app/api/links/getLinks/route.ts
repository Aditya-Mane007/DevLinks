import { connectDB } from "@/dbConfig/connectDb"
import { getTokenData } from "@/helpers/getDataFromToken"
import Link from "@/models/links.model"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    connectDB()
    const reqBody = await request.json()

    const { username } = reqBody

    const user = await User.findOne({ username: username }).select("-password")

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
