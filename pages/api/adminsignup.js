import Admin from "../../models/Admin";
import connectmongo from "../../middleware/db";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      const { email, password } = req.body;
      let admin = await Admin.findOne({ email: email });

      if (admin) {
        return res.status(400).json({ error: "Admin already exists" });
      }
      const encpwd = CryptoJS.HmacSHA1(password, process.env.key).toString();
      admin = new Admin({email, password: encpwd });
      await admin.save();
      var adtoken = jwt.sign({ id: admin._id }, process.env.jkey, {
        expiresIn: "2d",
      });
      res.status(200).json({ adtoken: adtoken });
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export default connectmongo(handler);
