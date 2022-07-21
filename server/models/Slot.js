const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slotSchema = new Schema(
  {
    sectionName: { type: String, required: true, unique: true },
    slotNo: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
    companyName: { type: String },
    companyId: { type: Schema.Types.ObjectId, ref: "Form" },
    companyEmail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slot", slotSchema);
