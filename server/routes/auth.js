import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
const router = express.Router();

const JWT_SECRET = "your_jwt_secret";

router.post("/register", async (req, res) => {
  const { fullName, phone, birthDate, password } = req.body;
  if (!fullName || !phone || !birthDate || !password) {
    return res.status(400).json({ message: "Усі поля обовʼязкові." });
  }

  const birth = new Date(birthDate);
  const today = new Date();
  if (birth > today) {
    return res
      .status(400)
      .json({ message: "Дата народження введена не коректно." });
  }

  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();
  const isBeforeBirthday = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0);
  const realAge = isBeforeBirthday ? age - 1 : age;

  if (realAge < 14) {
    return res
      .status(400)
      .json({ message: "Вам має бути щонайменше 14 років." });
  }

  try {
    const user = new User({ fullName, phone, birthDate: birth, password });
    await user.save();
    const token = jwt.sign(
      { id: user._id, fullName: user.fullName, role: user.role },
      JWT_SECRET,
      { expiresIn: "6h" }
    );
    res.json({ token });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Користувача не створено", details: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ fullName: identifier }, { phone: identifier }],
    });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Невірні дані" });
    }
    const token = jwt.sign(
      { id: user._id, fullName: user.fullName, role: user.role },
      JWT_SECRET,
      { expiresIn: "6h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Помилка сервера" });
  }
});

router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Акаунт видалено" });
  } catch (err) {
    res.status(500).json({ error: "Не вдалося видалити акаунт" });
  }
});

router.get("/users", authMiddleware, checkRole("admin"), async (req, res) => {
  const search = req.query.search || "";

  try {
    const users = await User.find({
      $or: [
        { fullName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    }).select("-password"); // не передавати пароль

    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Не вдалося отримати список користувачів" });
  }
});

export default router;
