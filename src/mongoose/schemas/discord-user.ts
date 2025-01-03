import mongoose from "mongoose";

const discordUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  discordID: {
    type: Number,
    required: true,
    unique: true,
  },
});

export const DiscordUser = mongoose.model("DiscordUserModel", discordUserSchema);
