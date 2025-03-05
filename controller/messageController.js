import Message from "../model/messageModel.js";
import fs from "fs";
import apiResponse from "../utils/apiResponse.js";

export const saveMessage = async (req, res) => {
    const { userName, messageBody, userId } = req.body;
    
  if (!userName ||!messageBody ||!userId) {
    return apiResponse(false, "All fields are required", null, 400, res);
  }

  try {
    const message = await Message.create({ userName, messageBody, userId });
   

    return apiResponse(true, "Message Saved Successfully", message, 201, res);
  } catch (err) {
    console.log("err", err)
    return apiResponse(false, err.message, null, 500, res);
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timeStamp: 1 });
    return apiResponse(true, "All Messages", messages, 200, res);
  } catch (err) {
    return apiResponse(false, err.message, null, 500, res);
  }
};
