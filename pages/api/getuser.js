import User from "../../models/User";
import connectmongo from "../../middleware/db";
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  try {
    if (req.method == "GET") {
      const data = jwt.verify(req.headers.token, process.env.jkey);
      if(!data)return res.status(400).json({ expired: "Token Expired" });
      let user = await User.findById(data.id, { password: 0 });
      if (!user) {
        return res.status(400).json({ error: "Invalid Auth token" });
      }
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export default connectmongo(handler);
