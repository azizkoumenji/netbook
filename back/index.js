import "dotenv/config";
import express from "express";
import usersRouter from "./routes/users.js";
import likesRouter from "./routes/likes.js";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import uploadsRouter from "./routes/uploads.js";
import relationshipsRouter from "./routes/relationships.js";
import db from "./db.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import chatRouter from "./routes/chat.js";
import messagesRouter from "./routes/message.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/auth", authRouter);
app.use("/api/uploads", uploadsRouter);
app.use("/api/relationships", relationshipsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/messages", messagesRouter);

mongoose
  .connect(process.env.MONGODB_LINK)
  .then(() => {
    console.log("Connected to MongoDB!");

    // Create uploads directory if it doesn't exist and add cover and profile images.
    const __dirname = path.resolve(
      path.dirname(fileURLToPath(import.meta.url))
    );
    const uploadsPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath);
    }
    const imagesPath = path.join(__dirname, "images");
    fs.readdir(imagesPath, (err, files) => {
      if (err) {
        console.log("Error copying images.");
        console.log(err);
      } else {
        files.forEach((file) => {
          const srcPath = path.join(imagesPath, file);
          const destPath = path.join(uploadsPath, file);

          fs.copyFileSync(srcPath, destPath);
        });
      }
    });

    app.listen(process.env.EXPRESS_PORT, () => {
      console.log("Express server connected!");
      db.connect((err) => {
        if (err) {
          console.log("Error connection the MySQL database.");
          console.log(err);
        } else {
          console.log("Connected to MySQL database!");
        }
      });
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB.");
    console.log(error);
  });
