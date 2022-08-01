const { Schema, model } = require("mongoose");

const FriendListSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const FriendList = model("FriendList", FriendListSchema);

module.exports = FriendList;
