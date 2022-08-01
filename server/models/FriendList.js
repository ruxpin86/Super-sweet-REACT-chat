const { Schema, model } = require("mongoose");

const User = require("./User")

const FriendListSchema = new Schema(
    {
        users: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }], 
        content: {
            type: String
        }   
    }
    {
        toJSON: {
          virtuals: true,
        },
      }
);

FriendListSchema.virtual("FriendCount").get(function(){
    return this.users.map()
})

const FriendList = model("FriendList", FriendListSchema)

module.exports = FriendList