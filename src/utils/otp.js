// controllers/otpController.js
import mongoose from 'mongoose';
import otpGenerator from 'otp-generator';
import Otp from "../models/otp.js"
import User from '../models/user.js';
import {sendEmailNotification} from "../utils/mailSender.js"








export async function sendVerificationEmail(email, otp) {
    try {
      const mailResponse = await sendEmailNotification(
        email,
        "Spendly | Password Reset Request",
        `<p>Here is your OTP code: ${otp}</p>`
      );
      console.log("Email sent successfully: ", mailResponse);
    }catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
  }

export const verifyOTPUtil = async(email,otp)=>{
    const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return {
        success: false,
        message: 'The OTP is not valid',
      };
    }
    return {
        success: true,
        message: 'The OTP is Correct',
      };
}



