import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  age: {
    required: true,
    type: Number,
  },
  name: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
});

export const User = mongoose.model("UserModel", userSchema);
