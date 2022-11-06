const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    trackingNumber: {
      type: String,
      required: [true, "Please add a tracking number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);
