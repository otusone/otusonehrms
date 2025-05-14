// otpCtrl.js
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/UserModel'); // Adjust path if needed
require('dotenv').config();

// 🔒 Helper function to send OTP via email
async function sendOTPEmail(email, otp) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP code is: ${otp}. It expires in 5 minutes.`
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP sent to ${email}`);
    } catch (error) {
        console.error(`❌ Error sending OTP: ${error.message}`);
        throw new Error('Failed to send OTP');
    }
}

// 🔹 Generate OTP and send it via email
exports.generateOTP = async (req, res) => {
    try {
        const { email } = req.body;


        // Validate Email
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const user = await User.findOne({ email, role: 'admin' });
        if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Admin user not found' 
      });
    }


        // Generate OTP (6 digits) and set expiry time
        const otp = crypto.randomInt(100000, 999999).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins

        await user.save();

        await sendOTPEmail(email, otp);

        res.status(200).json({ success: true, message: 'OTP sent to your email' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
};

// 🔹 Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Validate inputs
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Email and OTP are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        // OTP is valid, reset OTP fields and mark as verified
        user.otp = undefined;
        user.otpExpires = undefined;
        user.isVerified = true;
        await user.save();

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
};


exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: 'admin' });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Admin user not found' 
      });
    }

    user.password = password;
    await user.save();

    res.status(200).json({ 
      success: true, 
      message: 'Password reset successfully' 
    });

  } catch (error) {
    console.error('Password Reset Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal server error' 
    });
  }
};
