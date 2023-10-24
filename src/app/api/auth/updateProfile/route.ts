import { connectDB } from "@/dbConfig/connectDb"
import { getTokenData } from "@/helpers/getDataFromToken"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    connectDB

    const reqBody = await request.json()

    const { firstName, lastName, image } = reqBody

    const userId = await getTokenData(request)

    const user = await User.findById(userId).select("-password")

    if (!user) {
      throw new Error("User not found")
    }

    ;(user.firstName = firstName || ""),
      (user.lastName = lastName || ""),
      (user.profileImage = image || "")

    user.save()

    return NextResponse.json({
      message: "User updates successfully",
      user
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
