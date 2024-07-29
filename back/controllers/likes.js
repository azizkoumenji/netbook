import db from "../db.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = "select * from likes where post_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data.map((like) => like.user_id));
  });
};

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    const q = "insert into likes (user_id, post_id) values (?, ?)";

    db.query(q, [userInfo.id, req.body.post_id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Like added.");
    });
  });
};

export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403);

    const q = "delete from likes where user_id = ? and post_id = ?";

    db.query(q, [userInfo.id, req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Post disliked.");
    });
  });
};
