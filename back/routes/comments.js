import express from "express";
import { getComments } from "../controllers/comments.js";

const router = express.Router();

router.get("/:id", getComments);

export default router;
