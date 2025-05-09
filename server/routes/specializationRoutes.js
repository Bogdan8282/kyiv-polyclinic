import express from "express";
const router = express.Router();
import Specialization from "../models/Specialization.js";

router.get("/", async (req, res, next) => {
  try {
    const specializations = await Specialization.find();
    res.json(specializations);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.name) {
      const error = new Error("Specialization name is required");
      error.status = 400;
      throw error;
    }
    const specialization = new Specialization(req.body);
    await specialization.save();
    res.status(201).json(specialization);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const specialization = await Specialization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!specialization) {
      const error = new Error("Specialization not found");
      error.status = 404;
      throw error;
    }
    res.json(specialization);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const specialization = await Specialization.findByIdAndDelete(
      req.params.id
    );
    if (!specialization) {
      const error = new Error("Specialization not found");
      error.status = 404;
      throw error;
    }
    res.json({ message: "Specialization deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
