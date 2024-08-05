import express from "express";
import {
  getPosts,
  addPost,
  getUserPosts,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.get("/user/:id", getUserPosts);
router.delete("/:id", deletePost);

export default router;
