import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

export default mongoose.model("Schedule", ScheduleSchema);
