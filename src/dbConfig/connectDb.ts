import mongoose from "mongoose"

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!)

    const conn = mongoose.connection

    conn.on("connected", () => {
      console.log("MongoDB connected")
    })

    conn.on("error", (error) => {
      console.log(`MongoDB Error: ${error}`)
      process.exit(1)
    })
  } catch (error: any) {
    console.log(`Error: ${error.message}`)
  }
}
