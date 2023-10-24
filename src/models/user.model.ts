import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: {
      type: String,
      required: [true, "Please add username"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Please add an email address"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please add a password"]
    },
    profileImage: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.models?.User || mongoose.model("User", UserSchema)

export default User
