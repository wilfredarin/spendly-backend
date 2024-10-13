import { verifyOTPUtil,sendVerificationEmail } from "../utils/otp.js";
import otpGenerator from "otp-generator"
import Otp from "../models/otp.js";
import User from "../models/user.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/reset-password", async (req, res) => {
    const { email } = req.body;
  try {
    const checkUserPresent = await User.findOne({ email });
    // If user found with provided email
    if (!checkUserPresent) {
      return res.json({error: 'User not registered'});
    } 

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await Otp.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await Otp.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);
    await sendVerificationEmail(email, otp);
    return res.json({message:"OTP Sent",email:email});
  } catch (error) {
    console.log(error.message);
    return res.json({error:error.message});
  }
});


router.post("/verify-otp", async(req,res)=>{
    const {otp,newPassword,email } = req.body;
    const resp = await verifyOTPUtil(email,otp);
    if(!resp.success){
      return res.json({message:resp.message});
    }
    const user = await User.findOne({email});
    user.password = await bcrypt.hash(newPassword,10);
    if(result.success){
      return res.json({error:result.msg});
    }else{
      return res.json({error:result.msg});
    }
});


  export default router;