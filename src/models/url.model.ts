import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  expirationDate: { type: Date },
  clicks: { type: Number, default: 0 },
  clickData: [
    {
      timestamp: { type: Date, default: Date.now },
      ip: String,
      country: String,
    },
  ],
}, { timestamps: true });

const Url = mongoose.model("Url", urlSchema);
export default Url;
