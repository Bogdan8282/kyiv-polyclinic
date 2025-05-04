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
    const appointment = new Appointment({
      ...req.body,
      user: req.user._id,
    });
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Time slot already booked or invalid data." });
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
