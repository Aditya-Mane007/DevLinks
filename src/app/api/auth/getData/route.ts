import { connectDB } from "@/dbConfig/connectDb"
import { getTokenData } from "@/helpers/getDataFromToken"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    connectDB()

    const reqBody = await request.json()

    const { username } = reqBody

    const user = await User.findOne({ username: username }).select("-password")

    if (!user) {
      throw new Error("No user found")
    }

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName ? user.firstName : "",
      lastName: user.lastName ? user.lastName : "",
      profileImage: user.profileImage ? user.profileImage : ""
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
