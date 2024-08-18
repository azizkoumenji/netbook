import express from "express";
import {
  getFollowers,
  addRelationship,
  deleteRelationship,
  getFriends,
} from "../controllers/relationships.js";

const router = express.Router();

router.get("/:id", getFollowers);
router.get("/", getFriends);
router.post("/", addRelationship);
router.delete("/:id", deleteRelationship);

export default router;
