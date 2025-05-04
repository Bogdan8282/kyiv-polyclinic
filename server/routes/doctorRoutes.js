import express from "express";
const router = express.Router();
import Doctor from "../models/Doctor.js";
import authMiddleware from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const doctors = await Doctor.find().populate("specialization");
    res.json(doctors);
  } catch (err) {
    next(err);
  }
});

router.post("/", authMiddleware, checkRole("admin"), async (req, res, next) => {
  try {
    const { name, specialization } = req.body;
    if (!name || !specialization) {
      const error = new Error("Doctor name and specialization are required");
      error.status = 400;
      throw error;
    }
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
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
      const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!doctor) {
        const error = new Error("Doctor not found");
        error.status = 404;
        throw error;
      }
      res.json(doctor);
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
      const doctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!doctor) {
        const error = new Error("Doctor not found");
        error.status = 404;
        throw error;
      }
      res.json({ message: "Doctor deleted" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
