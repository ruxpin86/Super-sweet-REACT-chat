const { Schema, model } = require("mongoose");

// const User = require("./User");
// const Conversations = require("./Conversation");

const messageSchema = new Schema(
  {
    username: {
      type: String,
      ref: "User",
    },
    content: {
      type: String,
    },

    conversations: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    // createdAt: {
    //   type: Date,
    // },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// messageSchema.pre("save", function (next) {
//   this.updated_at = Date.now();
//   next();
// });

const Messages = model("Messages", messageSchema);

module.exports = Messages;
