import { connectDB } from "@/dbConfig/connectDb"
import { getTokenData } from "@/helpers/getDataFromToken"
import Link from "@/models/links.model"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    connectDB()
    const reqBody = await request.json()

    const id = await getTokenData(request)

    const { platform, url } = reqBody

    const user = await User.findById(id)

    if (!user) {
      throw new Error("User not found")
    }

    const link = await Link.create({
      user: user._id,
      platform,
      url
    })

    // await User.findByIdAndUpdate(user._id, {
    //   $push: { links: link }
    // })

    return NextResponse.json({
      status: 200,
      message: "Link created succesfully",
      link
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
