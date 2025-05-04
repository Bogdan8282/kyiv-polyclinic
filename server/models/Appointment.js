import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

AppointmentSchema.index({ doctor: 1, date: 1, time: 1 }, { unique: true });

export default mongoose.model("Appointment", AppointmentSchema);
