import User from "../../models/User";
import connectmongo from "../../middleware/db";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  const {
    billedit,
    secuedit,
    name,
    phone,
    address,
    pincode,
    password,
    newpassword,
  } = req.body;
  try {
    if (req.method == "POST") {
      const data = jwt.verify(req.headers.token, process.env.jkey);
      let user = await User.findById(data.id);
      if (!user) {
        return res.status(400).json({ error: "Invalid Auth token" });
      }
      if (billedit) {
        if (phone.length !== 10 || isNaN(phone)) {
          return res
            .status(400)
            .json({ error: "Please enter your 10 digit phone number !!" });
        }
        await User.findByIdAndUpdate(data.id, {
          $set: {
            name: name,
            phone: phone,
            address: address,
            pincode: pincode,
          },
        });
      }
      if (secuedit) {
        const encpwd = CryptoJS.HmacSHA1(password, process.env.key).toString();
        if (user.password !== encpwd) {
          return res.status(400).json({ error: "Invalid Current Password" });
        }
        const encnewpwd = CryptoJS.HmacSHA1(
          newpassword,
          process.env.key
        ).toString();
        await User.findByIdAndUpdate(data.id, {
          $set: { password: encnewpwd },
        });
      }
      res.status(200).json({ message: "User Details Updated" });
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export default connectmongo(handler);
