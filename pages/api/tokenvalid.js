const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    try {
      if (req.method == "GET") {
        const data = jwt.verify(req.headers.token, process.env.jkey);
        if(!data)return res.status(400).json({ expired: "Token Expired" });
        res.status(200).json({ success: "Success" });
      } else {
        res.status(400).json({ error: "This method is not allowed" });
      }
    } catch (error) {
      res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
  };
  
  export default connectmongo(handler);