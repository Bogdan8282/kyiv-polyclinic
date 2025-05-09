import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = "your_jwt_secret";

export default async function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Немає токена" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user)
      return res.status(401).json({ error: "Користувача не знайдено" });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Невірний токен" });
  }
}
