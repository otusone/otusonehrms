const User = require("../models/UserModel");
//const bcrypt = require('bcryptjs');

exports.getAllStaff = async (req, res) => {
    try {
        const users = await User.find().select("-password -token");
        res.status(200).json({
            success: true,
            employees: users
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch employees",
            error: error.message
        });
    }
};