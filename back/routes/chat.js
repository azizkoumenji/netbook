import express from "express";
import { createChat, getChats, getChat } from "../controllers/chat.js";

const router = express.Router();

router.post("/", createChat);
router.get("/", getChats);
router.get("/:receiverId", getChat);

export default router;
