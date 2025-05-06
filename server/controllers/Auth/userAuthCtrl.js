const mongoose=require("mongoose");
const express =require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require("../../models/UserModel")
require("dotenv").config();

exports.register=async(req,res)=>{
    try{
        const{userName,email,password,mobile,gender,religion,role}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){return res.status(400).json({success:false,message:"Email is Already Exist"})}



        const hashedPassword = await bcrypt.hash(password, 15);

        const user=new User({
            userName,email,password,role,mobile,gender,religion
        });
        // const role=req.body.role ||"user";
        
        await user.save();
        res.status(201).json({
            success:true,
            message:"Registration successful. Please check your email to verify your account.",
            data:user              
            
        });
    }catch(error){
       console.error("")
       res.status(500).json({message:error.message || "Internal Server error . Please Try later"})
    }
};

exports.resendVerification=async(req,res,next)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }
        
        if(user.isVerified){
            return res.status(400).json({
                success:false,
                message:"Email already verified"
            });
        }

        const verificationToken=user.generateVerificationToken();
        await user.save();


        // const verificationToken = generateToken(user._id, user.role);
        user.verificationToken = verificationToken;
        await user.save();
    


        
        res.status(200).json({ 
            success: true,
            message: "Verification email resent successfully" 
        });
    }catch(error){
        next(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password} = req.body;

        if(!email || !password)
        {
           return res.status(400).json({
                 success: false,
                 message: "field Require"
            })
        }
       
        const user = await User.findOne({ email});
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    console.log("user",user)

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"invalid Credentials"
            });
        }
    
    //     const token=await user.generateAuthToken()
    //     user.token=token
    //     user.save();
    //    return res.json({
    //         success: true,
    //         message: "Login successful",
    //         data: user,
    //         token,
    //     });/

    const token = await user.generateAuthToken();
    user.token = user.token.concat({ token }); // Store in array
    await user.save(); 
    
    return res.json({
        success: true,
        message: "Login successful",
        data: {
            _id: user._id,
            email: user.email
        },
        token // Return the token
    });

    } catch (error) {
        return res.status(500).json({
            success: true,
            message:error.message || "internal Server Error",
            error:error
        });
    }
};

exports.getProfile = async (req, res) => {
  try {
    const {_id:userId} = req.user
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

exports.updateProfile=async(req,res)=>{
    try{
        const {_id:userId}=req.user
        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"User not Found"});
        }
        
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 15);
          }
          await user.save();

        res.status(200).json({
            success: true,
      message: "Profile updated successfully",
      data: user
        });
    }catch(error){
        console.error("Error fetching user Profile:",error);
        res.status(500).json({message:error.message||"Internal Server Error"})
    }
}


exports.deleteProfile=async(req,res)=>{
    try{
        const userId=req.user._id;
        const deletedUser=await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(404).json({success:false,message:"User Not Found"});
        }
        res.status(200).json({success:true,message:"Profile Deleted Successfully"})
    }catch(error){
        res.status(500).json({success:false,message:error.message||"Internal server error"});
    }
}

