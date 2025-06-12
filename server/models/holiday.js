const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Holiday', holidaySchema);
