const User = require("../../models/UserModel");



exports.register = async (req, res) => {
    try {
        const { userName, email, password, role, mobile, gender, religion } = req.body;
        console.log("userName", userName)
        console.log("email", email)
        console.log("password", password)
        const existingUser = await User.findOne({ email });
        if (existingUser) { return res.status(400).json({ success: false, message: "Email is Already Exist" }) }

        const user = new User({
            userName, email, password, role, mobile, gender, religion
        });
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


exports.UpdateProfile = async (req, res, next) => {
    try {
        const updates = req.body;
        const allowedUpdates = ["UserName", "email", "religion", "gender", "mobile", "address", "dateOfBirth"];
        const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({
                success: false,
                message: "Invalid Updates!!"
            });

        }
        const user = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true, runValidators: true }

        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }
        res.json({
            success: true,
            data: user,
        })
    } catch (error) {
        next(error);
    }
}



exports.deleteProfile = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { isActive: false },
            { new: true }
        );


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        res.json({
            success: true,
            message: "Acount Deactivated Successfully"
        });
    } catch (error) {
        next(error);
    }
}



exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};


exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findbyId(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
}




exports.UpdateUser = async (req, res, next) => {
    try {
        const updates = req.body;
        const allowedUpdates = ["UserName", "email", "religion", "gender", "mobile", "address", "dateOfBirth", "role", "isActive"];
        const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));


        if (!isValidOpration) {
            return res.status(400).json({
                success: false,
                message: "Invalid Updates"
            })
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            })
        }
        res.json({
            success: true,
            data: user,
        });

    } catch (error) {
        next(error);
    }
};




exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params._id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }
        res.json({
            success: true,
            message: "User delete permanently"
        })

    } catch (error) {
        next(error);
    }
}


const jwt = require('jsonwebtoken'); 

UserSchema.methods.generateVerificationToken = function () {
    const token = jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,   
        { expiresIn: '1h' }       
    );
    return token;
};



