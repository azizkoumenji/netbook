import jwt from "jsonwebtoken";
import db from "../db.js";

export const getFollowers = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    const q =
      "select followed_user_id, u.* from relationships join users u on followed_user_id = u.id where follower_user_id = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(
        data.map((followedUserId) => {
          return followedUserId.followed_user_id;
        })
      );
    });
  });
};

export const getFriends = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    const q =
      "select u.* from relationships join users u on followed_user_id = u.id where follower_user_id = ?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    const q =
      "insert into relationships (follower_user_id, followed_user_id) values (?, ?)";

    db.query(q, [userInfo.id, req.body.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been followed.");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("User not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token.");

    const q =
      "delete from relationships where follower_user_id = ? and followed_user_id = ?";

    db.query(q, [userInfo.id, req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been unfollowed.");
    });
  });
};
