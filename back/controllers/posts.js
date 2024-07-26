import db from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    const q =
      "select p.*, u.name, u.profile_pic from posts p join users u on u.id = p.user_id left join relationships on followed_user_id = p.user_id where follower_user_id = ? or p.user_id = ?  order by date desc";

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};
