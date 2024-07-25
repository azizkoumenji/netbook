import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Check if user exists.
  const q = "select * from users where username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err); // .json or .send the same doesn't matter.

    if (data.length) {
      return res.status(409).json("User already exists!");
    }

    // Create user is it does not exist.
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "insert into users (name, username, email, password, birthday, cover_pic, profile_pic) values (?, ?, ?, ?, ?, ?, ?)";

    const profilePic = "/api/uploads/profile.png";
    const coverPic = "/api/uploads/cover.png";

    db.query(
      q,
      [
        req.body.name,
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
  });
};

export const login = (req, res) => {
  const q = "select * from users where username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) return res.status(404).json("User not found.");

    // Check if password is correct.
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) return res.status(400).json("Wrong password.");

    // If password correct create token.
    const token = jwt.sign({ id: data[0].id }, process.env.SECRET_KEY);

    const { password, ...other } = data[0];

    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", { secure: true, sameSite: "none" })
    .status(200)
    .json("User has been logged out.");
};
