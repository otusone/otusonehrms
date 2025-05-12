const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');

exports.getAllEmployees = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password -token");
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



exports.addEmployee = async (req, res) => {
    try {
        const {
            userName,
            email,
            password,
            designation,
            dateOfBirth,
            address,
            gender,
            religion,
            mobile
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Employee with this email already exists"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = new User({
            userName,
            email,
            password: hashedPassword,
            designation,
            dateOfBirth,
            address,
            gender,
            religion,
            mobile,
            role: "user"
        });

        await newEmployee.save();

        res.status(201).json({
            success: true,
            message: "Employee added successfully",
            employee: newEmployee
        });
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add employee",
            error: error.message
        });
    }
};



exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedEmployee = await User.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            employee: updatedEmployee
        });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update employee",
            error: error.message
        });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await User.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete employee",
            error: error.message
        });
    }
};
