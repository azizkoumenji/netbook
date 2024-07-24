import "dotenv/config";
import express from "express";
import usersRouter from "./routes/users.js";
import likesRouter from "./routes/likes.js";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import uploadsRouter from "./routes/uploads.js";
import db from "./db.js";

const app = express();

app.use(express.static("dist"));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("likes", likesRouter);
app.use("/comments", commentsRouter);
app.use("/auth", authRouter);
app.use("/uploads", uploadsRouter);

app.listen(8800, () => {
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
