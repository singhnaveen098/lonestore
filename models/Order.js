const mongoose = require("mongoose");

const orderschema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    uid: { type: String, required: true },
    orderid: { type: String, required: true },
    paymentinfo: { type: Object, default: {} },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "initiated" },
    deliverystatus: { type: String, default: "Not yet shipped" },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.models.Order || mongoose.model("Order", orderschema);
