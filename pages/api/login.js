import User from "../../models/User";
import connectmongo from "../../middleware/db";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      const { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ error: "User doesn't exists" });
      }
      const encpwd = CryptoJS.HmacSHA1(password, process.env.key).toString();
      if (user.password !== encpwd) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      var token = jwt.sign({ id: user._id }, process.env.jkey, {
        expiresIn: "2d",
      });
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export default connectmongo(handler);
