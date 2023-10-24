import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/dbConfig/connectDb"

export async function POST(request: NextRequest) {
  try {
    connectDB()

    const reqBody = await request.json()

    const { email, password, username } = reqBody

    console.log(reqBody)

    const userExists = await User.findOne({ email })

    if (userExists) {
      throw new Error("User exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await new User({
      email,
      password: hashedPassword,
      username
    })

    await user.save()

    return NextResponse.json({
      status: 201,
      message: "User created successfully",
      _id: user._id,
      email: user.email,
      username: user.username
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
