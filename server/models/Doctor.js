import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialization",
    required: true,
  },
});

export default mongoose.model("Doctor", DoctorSchema);
