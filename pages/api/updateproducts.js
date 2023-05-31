import Product from "../../models/Product";
import connectmongo from "../../middleware/db";

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
        let p = await Product.findByIdAndUpdate(req.body._id, {
          $set: req.body,
        });
      res.status(200).json("success");
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export default connectmongo(handler);
