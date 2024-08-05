import db from "../db.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const q = "select * from users where id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...other } = data[0];
    return res.status(200).json(other);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    const q =
      "update users set name = ?, username = ?, email = ?, birthday = ?, cover_pic = ?, profile_pic = ?  where id = ?";

    db.query(
      q,
      [
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.birthday,
        req.body.cover_pic,
        req.body.profile_pic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User updated.");
      }
    );
  });
};

export const searchUsers = (req, res) => {
  const searchKey = req.body.searchKey;

  const q =
    "select * from users where lower(name) like lower(?) or lower(username) like lower(?)";

  db.query(q, [`${searchKey}%`, `${searchKey}%`], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
