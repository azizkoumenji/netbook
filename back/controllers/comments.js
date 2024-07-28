import db from "../db.js";
import jwt from "jsonwebtoken";

export const getComments = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    const q =
      "select c.*, u.name, u.profile_pic from comments c join users u on c.user_id = u.id where post_id = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};
