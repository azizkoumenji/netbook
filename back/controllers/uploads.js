import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

export const upload = (req, res) => {
  res.status(200).json("Image uploaded!");
};

export const download = (req, res) => {
  const imgName = req.params.img;
  const imgPath = path.join(__dirname, "uploads", imgName);

  res.sendFile(imgPath, (err) => {
    if (err) return res.status(404).json("Image not found!");
  });
};
