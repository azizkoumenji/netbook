import express from "express";
import { getLikes, addLike, deleteLike } from "../controllers/likes.js";

const router = express.Router();

router.get("/:id", getLikes);
router.post("/", addLike);
router.delete("/:id", deleteLike);

export default router;
