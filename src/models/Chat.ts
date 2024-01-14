import { Schema, model, models } from "mongoose";

const chatMessage = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const ChatSchema = new Schema(
  {
    participants: {
      type: Array,
      required: true,
    },
    conversationId:{
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    messages: {
      default: [],
      type: [chatMessage],
    },
  },
  { timestamps: true }
);

export default models.Chat || model("Chat", ChatSchema);
