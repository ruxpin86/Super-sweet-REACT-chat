const { Schema, model } = require("mongoose");

const User = require("./User");
const Conversations = require("./Conversation");

const messageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    conversations: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    createdAt: {
      type: new Date(),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Messages = model("Messages", messageSchema);

module.exports = Messages;
