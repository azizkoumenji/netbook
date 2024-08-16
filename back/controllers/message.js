import MessageModel from "../models/messageModel.js";
import jwt from "jsonwebtoken";

export const addMessage = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    const newMessage = new MessageModel({
      senderId: userInfo.id,
      message: req.body.message,
      chatId: req.body.chatId,
    });

    try {
      const result = await newMessage.save();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};

export const getMessages = async (req, res) => {
  try {
    const result = await MessageModel.find({
      chatId: req.params.chatId,
    });

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(500);
  }
};
