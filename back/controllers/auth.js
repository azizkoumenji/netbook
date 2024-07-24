import db from "../db.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  // Check if user exists.
  const q = "select * from users where username = ?";
  db.query(q, [req.body.username], (data, err) => {
    if (err) return res.status(500).json(err); // .json or .send the same doesn't matter.

    if (data.length) {
      return res.status(409).json("User already exists!");
    }

    // Create user is it does not exist.
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "insert into users name, username, email, password, birthday, cover_pic, profile_pic values (?)";
  });

  const profilePic = process.env.SERVER_ADDRESS + "/uploads/profile.png";
  const coverPic = process.env.SERVER_ADDRESS + "/uploads/cover.png";

  db.query(
    q,
    [
      res.body.name,
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.birthday,
      coverPic,
      profilePic,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User created.");
    }
  );
};
