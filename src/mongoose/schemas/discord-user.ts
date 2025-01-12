import mongoose from "mongoose";

const discordUserSchema = new mongoose.Schema({
  discordID: {
    required: true,
    type: Number,
    unique: true,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
});

export const DiscordUser = mongoose.model("DiscordUserModel", discordUserSchema);
