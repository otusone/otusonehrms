const User  =require("../models/user");

exports.register=async(req,res,next)=>{
    try{
        const{userNameserName,email,password,religion,gender,mobile,address,dateOfBirth}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false,messaage:"Email already in use"});
        }
        const user=new User({
            userName,
            email,
            password,
            religion,
            gender,
            mobile,
            address,
            dateOfBirth,
        });
        const token = await user.generateAuthToken();
        await user.save();
        res.Status(201).json({success:true,message :"User succsfully registerd",
            data:userData,
            token
        });

    }catch(error){
        return res.status(500).json({ message: error.message || 'Internal server error. Please try again later.' });
    }

};

exports.login=async(req,res,next)=>{
    try{
        const{email,password}=req.body;
        const user=await User. findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            });
        }
        // password match

        const isMatch=await user.comparePassword(password);
        if(isMatch){
            return res.status(401).json({
                success:false,
                message:"invalid credentials"
            });
        }

        //user is active
        if(!user.isActive){
            return res.status(403).json({
                success:false,
                message:"Account is deactivated"
            });
        }
        //return user data
        const userData=user.toObject();
        delete userData.password;

        res.join({
            success:true,
            data:userData,
            token,
        });

    }catch(error){
        next(error);
    }
};

//profile

exports.getProfile=async(req,res,next)=>{
    try{
        const user=await User.findbyId(req.user._Id);
        if(!user){
            return res.status(400).json({
                success:"false",
                message:"User Not Found"
            });
        }
        res.json({
            success:true,
            data:user,
        })
    }catch(error){
        next(error);
    }
};

//update profile

exports.UpdateProfile=async(req,res,next)=>{
    try{
        const updates=req.body;
        const allowedUpdates=["UserName","email","religion","gender","mobile","address","dateOfBirth"];
        const isValidOperation=Object.keys(updates).every(update=>allowedUpdates.includes(update));

        if(!isValidOperation){
            return res.status(400).json({
                success:false,
                message:"Invalid Updates!!"
            });

        }
        const user=await User.findByIdAndUpdate(
            req.user._id,
            updates,
            {new:true,runValidators:true}

        );

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found",
            });
        }
        res.json({
            success:true,
            data:user,
        })
    }catch(error){
        next(error);
    }
}

//delete user (soft delete)

exports.deleteProfile=async(req,res,next)=>{
    try{
        const user=await User.findByIdAndUpdate(
            req.user._id,
            {isActive:false},
            {new:true}
        );


        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            });
        }
        res.json({
            success:true,
            message:"Acount Deactivated Successfully"
        });
    }catch(error){
        next(error);
    }
}

//Admin-->get users

exports.getAllUsers=async(req,res,next)=>{
    try{
        const users=await User.find({});
        res.json({
            success:true,
            count:users.length,
            data:users
        });
    }catch(error){
        next(error);
    }
};

//Admin-->user by id 
exports.getUserById=async(req,res,next)=>{
    try{
        const user=await User.findbyId(req.params.id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        res.json({
            success:true,
            data:user,
        });
    }catch(error){
        next(error);
    }
}


// Admin--->Update any user

exports.UpdateUser=async(req,res,next)=>{
    try{
        const updates=req.body;
        const allowedUpdates=["UserName","email","religion","gender","mobile","address","dateOfBirth","role","isActive"];
        const isValidOperation=Object.keys(updates).every(update=>allowedUpdates.includes(update));


        if(!isValidOpration){
            return res.status(400).json({
                success:false,
                message:"Invalid Updates"
            })
        }

        const user=await User.findByIdAndUpdate(
            req.params.id,
            updates,
            {new:true,runValidators:true}
        );
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found",
            })
        }
        res.json({
            success:true,
            data:user,
        });

    }catch(error){
        next(error);
    }
};


//Admin-->delete permanent

exports.deleteUser=async(req,res,next)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params._id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            });
        }
        res.json({
            success:true,
            message:"User delete permanently"
        })

    }catch(error){
        next(error);
    }
}


