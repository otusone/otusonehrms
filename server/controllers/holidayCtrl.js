const mongoose = require('mongoose');
const Holiday = require('../models/holiday');



exports.addHoliday = async (req, res) => {
    try {
        const { title, startDate, endDate, description } = req.body;

        if (!title || !startDate || !endDate) {
            return res.status(400).json({ success: false, message: "Title, start date, and end date are required." });
        }

        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({ success: false, message: "End date cannot be before start date." });
        }

        const overlappingHoliday = await Holiday.findOne({
            $or: [
                {
                    startDate: { $lte: new Date(endDate) },
                    endDate: { $gte: new Date(startDate) }
                }
            ]
        });

        if (overlappingHoliday) {
            return res.status(400).json({
                success: false,
                message: "A holiday already exists in this date range.",
            });
        }

        const newHoliday = new Holiday({
            title,
            startDate,
            endDate,
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
            const start = new Date(year, month, 1);
            const end = new Date(year, parseInt(month) + 1, 0);

            holidays = await Holiday.find({
                $or: [
                    {
                        startDate: { $lte: end },
                        endDate: { $gte: start }
                    }
                ]
            }).sort({ startDate: 1 });
        } else {
            holidays = await Holiday.find().sort({ startDate: 1 });
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
