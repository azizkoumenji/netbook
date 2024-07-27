import moment from "moment/moment.js";
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

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    const q =
      "insert into posts (description, img, user_id, date) values (?, ?, ?, ?)";

    db.query(
      q,
      [
        req.body.description,
        req.body.img,
        userInfo.id,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been added.");
      }
    );
  });
};
