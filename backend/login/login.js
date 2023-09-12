const passportLocalMongoose = require("passport-local-mongoose");
// making the shcema for the mongoose db we're using
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
});
ChatSchema.plugin(passportLocalMongoose);
const ChatLogin = mongoose.model("chat-login", ChatSchema);
module.exports = ChatLogin;
