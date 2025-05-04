import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import routes from "./routes/routes.js";
import authRoutes from "./routes/auth.js";
import specializationRoutes from "./routes/specializationRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions =
  process.env.NODE_ENV === "production"
    ? {
        origin: process.env.CORS_ORIGIN
          ? process.env.CORS_ORIGIN.split(",")
          : "*",
        credentials: true,
        optionsSuccessStatus: 200,
      }
    : {
        origin: "http://localhost:5173",
        credentials: true,
        optionsSuccessStatus: 200,
      };

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.use("/api/specializations", specializationRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/appointments", appointmentRoutes);

if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Server is running in development mode" });
  });
}

connectDB();

app.get("/specializations", async (req, res) => {
  const specs = await Specialization.find();
  res.json(specs);
});

app.get("/doctors/:specId", async (req, res) => {
  const doctors = await Doctor.find({ specialization: req.params.specId });
  res.json(doctors);
});

app.get("/slots/:doctorId", async (req, res) => {
  const slots = await Slot.find({
    doctor: req.params.doctorId,
    isBooked: false,
  });
  res.json(slots);
});

app.post("/book/:slotId", async (req, res) => {
  const slot = await Slot.findById(req.params.slotId);
  if (!slot || slot.isBooked)
    return res.status(400).json({ message: "Slot unavailable" });
  slot.isBooked = true;
  await slot.save();
  res.json({ message: "Slot booked successfully" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () =>
  console.log(
    `Server running on http://localhost:${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  )
);
