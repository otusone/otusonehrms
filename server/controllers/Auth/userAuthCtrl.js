const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");
require("dotenv").config();

exports.register = async (req, res) => {
    try {
        const { userName, email, password, designation, dateOfJoining, mobile, address, dateOfBirth, gender, religion, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) { return res.status(400).json({ success: false, message: "Email is Already Exist" }) }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            userName, email, password, designation, dateOfJoining, role, mobile, address, dateOfBirth, gender, religion
        });
        // const role=req.body.role ||"user";

        await user.save();
        res.status(201).json({
            success: true,
            message: "Registration successful. Please check your email to verify your account.",
            data: user

        });
    } catch (error) {
        console.error("")
        res.status(500).json({ message: error.message || "Internal Server error . Please Try later" })
    }
};

exports.resendVerification = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email already verified"
            });
        }

        const verificationToken = user.generateVerificationToken();
        await user.save();


        // const verificationToken = generateToken(user._id, user.role);
        user.verificationToken = verificationToken;
        await user.save();




        res.status(200).json({
            success: true,
            message: "Verification email resent successfully"
        });
    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found",
            });
        }

        let isMatch
        try {
            isMatch = await bcrypt.compare(password, user.password);

        }
        catch (error) {
            console.log(error)
        }

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password doesn't match",
            });
        }


        const token = await user.generateAuthToken();
        user.token = token;
        await user.save();


        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                designation: user.designation,
                dateOfJoining: user.dateOfJoining,
                religion: user.religion,
                gender: user.gender,
                mobile: user.mobile,
                isActive: user.isActive,
                role: user.role,
                verified: user.verified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                token: token,
            },
            token,
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};


exports.getProfile = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).json({ message: "Server error" });
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const { id: userId } = req.params;
        console.log("Received userId:", userId);

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updates = { ...req.body };


        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }


        user = await User.findByIdAndUpdate(userId, updates, { new: true });

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};


exports.deleteProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }
        res.status(200).json({ success: true, message: "Profile Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}

