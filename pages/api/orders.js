import Order from "../../models/Order";
import connectmongo from "../../middleware/db";
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  try {
    if (req.method == "GET") {
      const data = jwt.verify(req.headers.token, process.env.jkey);
      if(!data)return res.status(400).json({ expired: "Token Expired" });
      let order = await Order.find({ uid: data.id }).sort({ createdAt: -1 });
      if (!order) {
        return res.status(400).json({ error: "Invalid Auth token" });
      }
      // order = order.filter((a) => {
      //   return a.status !== "cancelled";
      // });
      res.status(200).json(order);
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export default connectmongo(handler);
