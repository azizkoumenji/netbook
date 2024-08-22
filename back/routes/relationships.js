import express from "express";
import {
  getFollowing,
  addRelationship,
  deleteRelationship,
  getFriends,
} from "../controllers/relationships.js";

const router = express.Router();

router.get("/:id", getFollowing);
router.get("/", getFriends);
router.post("/", addRelationship);
router.delete("/:id", deleteRelationship);

export default router;
