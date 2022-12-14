const { Schema, model } = require("mongoose");

const Messages = require("../models/Message");
const User = require("./User");

const conversationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Messages",
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Conversation = model("Conversations", conversationSchema);

module.exports = Conversation;
