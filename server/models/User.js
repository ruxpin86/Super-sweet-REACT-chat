const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const messages = require("../models/Message");
// const friendsList = require("../models/FriendList");
// const conversations = require("../models/Conversations");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Must use a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password needs: Minimum eight characters, at least one letter, one number and one special character",
      ],
    },
    friendList: [
      {
        type: Schema.Types.ObjectId,
        ref: "FriendList",
      },
    ],
    messages: [
      messages.schema,
      // {

      //   type: Schema.Types.ObjectId,
      //   ref: "Messages",
      // },
    ],
    conversations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Conversations",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("friendCount").get(function () {
  return this.friendsList.length;
});

const User = model("User", userSchema);

module.exports = User;
