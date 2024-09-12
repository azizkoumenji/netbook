import express from "express";
import {
  getFollowing,
  addRelationship,
  deleteRelationship,
  getFriends,
  getFollowers,
} from "../controllers/relationships.js";

const router = express.Router();

router.get("/:id", getFollowing);
router.get("/followers/:id", getFollowers);
router.get("/", getFriends);
router.post("/", addRelationship);
router.delete("/:id", deleteRelationship);

export default router;
