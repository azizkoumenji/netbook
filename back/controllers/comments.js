import db from "../db.js";

export const getComments = (req, res) => {
  const q =
    "select c.*, u.name, u.profile_pic from comments c join users u on c.user_id = u.id where post_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
