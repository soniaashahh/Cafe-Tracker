import mongoose from "mongoose";

const matchaSpotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    signatureDrink: { type: String, required: true }, // <— keep THIS
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

export const MatchaSpot = mongoose.model("MatchaSpot", matchaSpotSchema);
