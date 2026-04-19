import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: 'anonymous'
    },
    userMessage: {
      type: String,
      required: true,
      trim: true
    },
    botReply: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;

