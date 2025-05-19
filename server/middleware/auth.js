const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")


exports.userAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.token = token
        req.user = user
        next()

    } catch (e) {
        res.status(401).send({ error: "Please authenticate." })
    }
}


exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admin only',
            });
        }

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while the Authorization "
        })
    }
}



exports.isUser = async (req, res, next) => {
    try {
        if (req.user.role !== "user") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admin only',
            });
        }

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while the Authorization "
        })
    }
}