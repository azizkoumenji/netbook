import express from "express";
import { getUser, updateUser, searchUsers } from "../controllers/users.js";

const router = express.Router();

router.get("/:id", getUser);
router.put("/", updateUser);
router.post("/", searchUsers);

export default router;
