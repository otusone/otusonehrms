const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assets: [
        {
            assetName: { type: String, required: true },
            assetType: { type: String, required: true },
            assignedStartDate: { type: Date, required: true },
            //assignedEndDate: { type: Date },
            status: { type: String, enum: ["Assigned", "Returned"], required: true, },
            remarks: { type: String }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Assets", assetSchema);
