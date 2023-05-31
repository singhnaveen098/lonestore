const mongoose = require("mongoose");

const resetschema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Reset || mongoose.model("Reset", resetschema);
