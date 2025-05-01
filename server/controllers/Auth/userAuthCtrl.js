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
    user.tokens = user.tokens.concat({ token }); // Store in array
    await user.save(); // Ensure this is awaited
    
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

exports.getProfile=async(req,res)=>{
    try{
        const token = req.header("Authorization")?.replace("Bearer ", "").trim();

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Authentication required"
            });
        }

        const user=await User.findOne({token});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid authentication"

            })
        }

        const profileData={
            userName:user.userName,
            email:user.email,
            role:user.role,
            mobile:user.mobile,
            gender:user.gender,
            religion:user.religion,
            isVerified: user.isVerified,
            createdAt: user.createdAt
        };
        return res.json({
            success:true,
            message:"profile reterived successfully",
            data:profileData,

        });
    }catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
            error: error
        });
    }
};


