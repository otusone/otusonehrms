const mongoose = require('mongoose');
const Holiday = require('../models/holiday');



exports.addHoliday = async (req, res) => {
    try {
        const { title, date, description } = req.body;

        if (!title || !date) {
            return res.status(400).json({ success: false, message: "Title and date are required." });
        }

        const existing = await Holiday.findOne({ date: new Date(date) });
        if (existing) {
            return res.status(400).json({ success: false, message: "Holiday on this date already exists." });
        }

        const newHoliday = new Holiday({
            title,
            date,
            description,
            createdBy: req.user ? req.user._id : null,
        });

        await newHoliday.save();

        return res.status(201).json({ success: true, holiday: newHoliday });
    } catch (error) {
        console.error("Add Holiday Error:", error);
        return res.status(500).json({ success: false, message: "Server error while adding holiday." });
    }
};



exports.getHolidays = async (req, res) => {
    try {
        const { year, month } = req.query;
        let holidays;

        if (year !== undefined && month !== undefined) {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, parseInt(month) + 1, 0);

            holidays = await Holiday.find({
                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).sort({ date: 1 });
        } else {
            holidays = await Holiday.find().sort({ date: 1 });
        }

        res.status(200).json({ holidays });
    } catch (err) {
        res.status(500).json({ message: "Error fetching holidays", error: err.message });
    }
};



exports.deleteHoliday = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHoliday = await Holiday.findByIdAndDelete(id);

        if (!deletedHoliday) {
            return res.status(404).json({ message: "Holiday not found" });
        }

        return res.status(200).json({ message: "Holiday deleted successfully" });
    } catch (err) {
        console.error(" Error deleting holiday:", err);
        return res.status(500).json({
            message: "Error deleting holiday",
            error: err.message,
        });
    }
};
