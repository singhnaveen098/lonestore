import Product from "../../models/Product";
import Admin from "../../models/Admin";
import connectmongo from "../../middleware/db";
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      const data = jwt.verify(req.headers.token, process.env.jkey);
      let user = await Admin.findById(data.id);
      if (!user) {
        return res.status(400).json({ error: "Invalid Auth token" });
      }
      let prod = await Product.findOne({ slug: req.body.slug });
      if (prod) return res.status(400).json({ error: "Product already exists" });
      let p = new Product(req.body);
      await p.save();
      // for (let i = 0; i < req.body.length; i++) {
      //   let p = new Product(req.body[i]);
      //   await p.save();
      // }
      res.status(200).json("success");
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export default connectmongo(handler);
