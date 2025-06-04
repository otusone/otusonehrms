const User = require("../models/UserModel");
const Attendance = require('../models/attendance');
const Asset = require('../models/assets');
const Leave = require('../models/leave');
const Salary = require('../models/salarySlip');
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

exports.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await User.findById(id).select("-password -token");

        if (!employee || employee.role !== "user") {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            success: true,
            employee,
        });
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch employee",
            error: error.message,
        });
    }
};



exports.addEmployee = async (req, res) => {
    try {
        const {
            employeeId,
            userName,
            email,
            password,
            designation,
            dateOfJoining,
            basicSalary,
            probationPeriodMonths,
            dateOfBirth,
            address,
            gender,
            mobile,
            emergencyContact
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Employee with this email already exists"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        const newEmployee = new User({
            employeeId,
            userName,
            email,
            password,
            designation,
            dateOfJoining,
            basicSalary,
            probationPeriodMonths,
            dateOfBirth,
            address,
            gender,
            mobile,
            emergencyContact,
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
        const updatedData = { ...req.body };
        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        } else {
            delete updatedData.password;
        }

        const updatedEmployee = await User.findByIdAndUpdate(
            id,
            { $set: updatedData },
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


        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        await Attendance.deleteMany({ userId: id });


        const assetRecord = await Asset.findOne({ assignedTo: id });
        if (assetRecord) {
            await Asset.deleteOne({ assignedTo: id });
        }

        await Leave.deleteMany({ userId: id });

        await Salary.deleteMany({ userId: id });

        res.status(200).json({
            success: true,
            message: "Employee and associated data deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete employee and related data",
            error: error.message
        });
    }
};

