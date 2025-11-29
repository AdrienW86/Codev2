// models/Rdv.js
import mongoose from "mongoose";

const RdvSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Rdv || mongoose.model("Rdv", RdvSchema);
