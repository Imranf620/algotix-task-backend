import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  messageBody: String,
  timeStamp: String,
});

export default mongoose.model("Message", MessageSchema);
