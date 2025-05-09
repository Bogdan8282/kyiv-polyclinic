import express from "express";
const router = express.Router();
import Schedule from "../models/Schedule.js";
import authMiddleware from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const schedules = await Schedule.find().populate("doctor");
    res.json(schedules);
  } catch (err) {
    next(err);
  }
});

router.post("/", authMiddleware, checkRole("admin"), async (req, res, next) => {
  try {
    const { doctor, dayOfWeek } = req.body;

    if (!doctor || !dayOfWeek) {
      const error = new Error("Doctor and dayOfWeek are required");
      error.status = 400;
      throw error;
    }

    const startTime = req.body.startTime || "09:00";
    const endTime = req.body.endTime || "17:00";

    const schedule = new Schedule({ doctor, dayOfWeek, startTime, endTime });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  async (req, res, next) => {
    try {
      const schedule = await Schedule.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!schedule) {
        const error = new Error("Schedule not found");
        error.status = 404;
        throw error;
      }
      res.json(schedule);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  async (req, res, next) => {
    try {
      const schedule = await Schedule.findByIdAndDelete(req.params.id);
      if (!schedule) {
        const error = new Error("Schedule not found");
        error.status = 404;
        throw error;
      }
      res.json({ message: "Schedule deleted" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
