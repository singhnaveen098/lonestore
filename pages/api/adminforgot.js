import Admin from "../../models/Admin";
import Reset from "../../models/Reset";
import connectmongo from "../../middleware/db";
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      if (req.body.adtoken) {
        const reset = await Reset.findOne({ token: req.body.adtoken });
        if (reset) {
          const admin = await Admin.findOne({ email: reset.email });
          if (user) {
            const encnewpwd = CryptoJS.HmacSHA1(
              req.body.password,
              process.env.key
            ).toString();
            admin.password = encnewpwd;
            await admin.save();
            await reset.remove();
            res.status(200).json({
              message: "Password reset successfully",
            });
          } else {
            res.status(400).json({
              error: "Invalid admin token",
            });
          }
        } else {
          res.status(400).json({
            error: "Invalid admin token",
          });
        }
      } else {
        const adtoken = Math.ceil(Math.random() * Date.now());
        const data = `<p>We have sent you this email in response to your request to reset your password on LoneStore.com.</p>
        <br>
        <p>Resetting your password is easy.</p>
        <p>To reset your password, please follow the link below:</p>
        <p><a href="http://localhost:3000/admin/forgot?token=${adtoken}">Reset Password</a></p>
        <p>We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to My Account Page.</p>
        <br>
        <p>If you did not make this request then please ignore this email.</p>
        `;
        let admin = await Admin.findOne(
          { email: req.body.email },
          { password: 0 }
        );
        if (!admin) {
          return res.status(400).json({ error: "Admin doesn't exists!!" });
        }
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.email,
            pass: process.env.password,
          },
        });

        const mailOptions = {
          from: process.env.email,
          to: req.body.email,
          subject: "Password Reset Link",
          html: data,
        };

        transporter.sendMail(mailOptions, function (error) {
          if (error) {
            return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
          }
        });
        
        const exstreset = await Reset.findOne({ email: req.body.email });
        if (exstreset) {
          exstreset.token = adtoken;
          await exstreset.save();
        }else{
          const reset = new Reset({
            email: req.body.email,
            token: adtoken,
          });
          await reset.save();
        }
        res.status(200).json({ message: "Check your email for reset link." });
      }
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export default connectmongo(handler);
