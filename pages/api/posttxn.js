import connectmongo from "../../middleware/db";
import Order from "../../models/Order";
import Product from "../../models/Product";
const PaytmChecksum = require("paytmchecksum");

const handler = async (req, res) => {
  let order;
  //validate paytm checksum
  let paytmChecksum = "";

  let paytmParams = {};
  const received_data = req.body;
  for (let key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }
  let isVerifySignature = PaytmChecksum.verifySignature(
    paytmParams,
    process.env.paytm_Mkey,
    paytmChecksum
  );
  if (!isVerifySignature) {
    return res.status(500).send("Something went wrong");
  }


  //update order status
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderid: req.body.ORDERID },
      { $set: { status: "confirmed", paymentinfo: req.body } }
    );
    let prod = order.products;
    for (let item in prod) {
      await Product.findOneAndUpdate(
        { slug: item },
        { $inc: { availableqty: -prod[item].qty } }
      );
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderid: req.body.ORDERID },
      { $set: { status: "pending", paymentinfo: req.body } }
    );
  } else {
    order = await Order.findOneAndUpdate(
      { orderid: req.body.ORDERID },
      { $set: { status: "cancelled", paymentinfo: req.body } }
    );
  }
  res.redirect(`/order?id=${order._id}&ccart=1`, 200);
};

export default connectmongo(handler);
