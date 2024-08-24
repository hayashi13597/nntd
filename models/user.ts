import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    nameInGame: { type: String, required: true },
    nameZalo: { type: String, required: true },
    role: { type: Number, default: 6 },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
