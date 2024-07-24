import express from "express";
import { upload, download } from "../controllers/uploads.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upld = multer({ storage: storage });

const router = express.Router();

router.post("/", upld.single("img"), upload);

router.get("/:id", download);

export default router;
