import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    nameInGame: { type: String, required: true },
    nameZalo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
