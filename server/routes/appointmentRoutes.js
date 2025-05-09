import express from "express";
import Appointment from "../models/Appointment.js";
import authMiddleware from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id }).populate(
    "doctor"
  );
  res.json(appointments);
});

router.get("/all", authMiddleware, checkRole("admin"), async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctor user");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all appointments" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const userAppointmentsCount = await Appointment.countDocuments({
      user: req.user._id,
    });

    if (userAppointmentsCount >= 5) {
      return res.status(400).json({
        message: "Ви не можете мати більше трьох активних записів.",
      });
    }

    const appointmentDate = new Date(req.body.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(now.getMonth() + 1);

    if (appointmentDate < now || appointmentDate > oneMonthLater) {
      return res.status(400).json({
        message:
          "Дата має бути не раніше сьогодні і не пізніше ніж через місяць.",
      });
    }

    const appointment = new Appointment({
      ...req.body,
      user: req.user._id,
    });
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(400).json({
      message: "Неможливо створити запис. Перевірте дані.",
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const appointment = await Appointment.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!appointment) {
    return res
      .status(403)
      .json({ message: "You cannot delete this appointment." });
  }

  res.json({ message: "Appointment cancelled" });
});

export default router;
