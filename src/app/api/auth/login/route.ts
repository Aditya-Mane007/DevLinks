import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/dbConfig/connectDb"
import User from "@/models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    connectDB()

    const reqBody = await request.json()

    const { email, password } = reqBody

    const userExists = await User.findOne({ email })

    if (!userExists) {
      throw new Error("User doesn't exists")
    }

    let response
    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      const tokenData = {
        id: userExists._id,
        email: userExists.email,
        username: userExists.username
      }

      response = NextResponse.json({
        status: 201,
        message: "Login successfully",
        _id: userExists._id,
        email: userExists.email,
        username: userExists.username,
        image: userExists.profileImage
      })

      const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
        expiresIn: "30d"
      })

      response.cookies.set("token", token, {
        httpOnly: true
      })
    }
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
