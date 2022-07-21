const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    email: { type: String, required: true },
    companyname: { type: String, required: true },
    phoneno: { type: Number, required: true },
    team: { type: String, required: true },
    products: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    valueproposition: { type: String, required: true },
    competitors: { type: String, required: true },
    revenuemodel: { type: String, required: true },
    potentialmarketsize: { type: String, required: true },
    marketplan: { type: String, required: true },
    incubationtype: { type: String, required: true },
    businessproposal: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "null" },
    isSlotSelected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", applicationSchema);
