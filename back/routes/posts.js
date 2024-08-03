import express from "express";
import { getPosts, addPost, getUserPosts } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.get("/user/:id", getUserPosts);

export default router;
