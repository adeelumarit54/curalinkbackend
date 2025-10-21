import mongoose from "mongoose";

// 🟢 Sub-schema for Elimination
const EliminationSchema = new mongoose.Schema(
  {
    date: String,
    interval: String,
    amount: String,
    consistency: String,
  },
  { _id: true }
);

// 🟢 Sub-schema for Mobility
const MobilitySchema = new mongoose.Schema(
  {
    time: String,
    activity: String,
    details: String,
    support: String,
  },
  { _id: true }
);
// general
const GeneralSchema = new mongoose.Schema(
  {
    title: String,
    description: mongoose.Schema.Types.Mixed, // 🧠 store as object
    type: {
      type: String,
      enum: ["info", "plan", "activity"],
      default: "info",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

// 🟢 Main Staff Schema
const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  room: String,
  bedNumber: String,
  careLevel: String,
  photo: String,

  // ✅ Simple string-based logs (for now nutrition is stringified JSON)
  pain: { type: [String], default: [] },
  nutrition: { type: [String], default: [] },
  medication: { type: [String], default: [] },
  urination: { type: [String], default: [] },

  // ✅ Object-based logs
  mobility: { type: [MobilitySchema], default: [] },
  elimination: { type: [EliminationSchema], default: [] },
  general: { type: [GeneralSchema], default: [] }, // 👈 NEW
});

export default mongoose.model("Staff", StaffSchema);


