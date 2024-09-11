import express from "express";
import {
  getUser,
  updateUser,
  searchUsers,
  getSuggestions,
} from "../controllers/users.js";

const router = express.Router();

router.get("/:id", getUser);
router.put("/", updateUser);
router.post("/", searchUsers);
router.get("/get/suggestions", getSuggestions);

export default router;
