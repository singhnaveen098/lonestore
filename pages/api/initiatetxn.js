const https = require("https");
const PaytmChecksum = require("paytmchecksum");
import Order from "../../models/Order";
import Product from "../../models/Product";
import connectmongo from "../../middleware/db";
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    //check for cart tampering
    let prod,
      subtotal = 0;
    for (let item in req.body.cart) {
      prod = await Product.findOne({ slug: item });
      //checking for product availability
      if (prod.availableqty < req.body.cart[item].qty) {
        return res.status(400).json({
          reload: true,
          error: "Some of the items in your cart are out of stock !!",
        });
      }
      if (prod.price !== req.body.cart[item].price) {
        return res.status(400).json({
          reload: true,
          error:
            "Price of some items in the cart have changed. Please try again",
        });
      }
      subtotal += prod.price * req.body.cart[item].qty;
    }
    if (subtotal !== req.body.total) {
      return res.status(400).json({
        reload: true,
        error: "Price of some items in the cart have changed. Please try again",
      });
    }

    //check for details are valid
    if (req.body.phone.length !== 10 || isNaN(req.body.phone)) {
      return res.status(400).json({
        reload: false,
        error: "Please enter your 10 digit phone number !!",
      });
    }

    //Initiating order
    const data = jwt.verify(req.headers.token, process.env.jkey);
    const order = new Order({
      email: req.body.email,
      uid: data.id,
      orderid: req.body.ordid,
      products: req.body.cart,
      address: req.body.address,
      district: req.body.district,
      state: req.body.state,
      pincode: req.body.pincode,
      amount: req.body.total,
    });
    await order.save();

    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_paytm_MID,
      websiteName: "WEBSTAGING",
      orderId: req.body.ordid,
      callbackUrl: `${process.env.NEXT_PUBLIC_host}/api/posttxn`,
      txnAmount: {
        value: `${req.body.total}.00`,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };
    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.paytm_Mkey
    );
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);
    
    const asyncRequest = () => {
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          hostname: "securegw-stage.paytm.in",

          /* for Production */
          // hostname: 'securegw.paytm.in',

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_paytm_MID}&orderId=${req.body.ordid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            resolve(JSON.parse(response).body);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };

    let txntoken = await asyncRequest();
    console.log(txntoken);
    res.status(200).send(txntoken);
  }
};

export default connectmongo(handler);
