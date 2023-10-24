import { connectDB } from "@/dbConfig/connectDb"
import { getTokenData } from "@/helpers/getDataFromToken"
import Link from "@/models/links.model"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  try {
    connectDB()

    let response

    const reqBody = await request.json()

    const { id, platform, url } = reqBody

    const userId = await getTokenData(request)

    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    const link = await Link.findById(id)

    if (!link) {
      throw new Error("Link not found")
    }

    if (link.user.toString() === userId) {
      const updatedLink = await Link.findByIdAndUpdate(id, {
        platform,
        url
      })

      if (updatedLink) {
        response = NextResponse.json({
          message: "Link updated successfully",
          status: 200,
          updatedLink
        })
      }
    } else {
      throw new Error("Something went wrong")
    }

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
