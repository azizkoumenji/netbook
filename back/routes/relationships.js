import express from "express";
import {
  getFollowers,
  addRelationship,
  deleteRelationship,
} from "../controllers/relationships.js";

const router = express.Router();

router.get("/:id", getFollowers);
router.post("/", addRelationship);
router.delete("/:id", deleteRelationship);

export default router;
