const Asset = require("../models/assets");
const UserModel = require("../models/UserModel");


exports.createAsset = async (req, res) => {
    try {
        const { assignedTo, assets } = req.body;

        const user = await UserModel.findById(assignedTo);
        if (!user) return res.status(404).json({ message: "Assigned user not found" });


        const existingRecord = await Asset.findOne({ assignedTo });

        if (existingRecord) {
            existingRecord.assets.push(...assets);
            await existingRecord.save();
            return res.status(200).json({ message: "Assets added to existing user", asset: existingRecord });
        }

        const newAsset = new Asset({ assignedTo, assets });
        await newAsset.save();

        res.status(201).json({ message: "New asset record created successfully", asset: newAsset });

    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};


exports.updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { assets } = req.body;

        const asset = await Asset.findById(id);
        if (!asset) return res.status(404).json({ message: "Asset record not found" });

        asset.assets = assets ?? asset.assets;
        await asset.save();

        res.status(200).json({ message: "Asset record updated", asset });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};


exports.getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find().populate("assignedTo", "userName email").sort({ createdAt: -1 });

        res.status(200).json({ message: "Assets fetched successfully", data: assets });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};



exports.getAssetById = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Asset.findById(id).populate("assignedTo", "userName email");

        if (!asset) return res.status(404).json({ message: "Asset not found" });

        res.status(200).json({ message: "Asset fetched successfully", asset });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};



exports.deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Asset.findByIdAndDelete(id);

        if (!asset) return res.status(404).json({ message: "Asset not found" });

        res.status(200).json({ message: "Asset record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};


