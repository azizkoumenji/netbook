import ChatModel from "../models/chatModel.js";
import jwt from "jsonwebtoken";

export const createChat = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in");

  jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    const newChat = new ChatModel({
      members: [userInfo.id, req.body.receiverId],
    });

    try {
      const result = await newChat.save();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};

export const getChats = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    try {
      const chats = await ChatModel.find({
        members: { $in: [userInfo.id] },
      });
      return res.status(200).json(chats);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};

export const getChat = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");
    try {
      const result = await ChatModel.findOne({
        members: { $all: [userInfo.id, Number(req.params.receiverId)] },
      });
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
};
