const mongoose = require("mongoose");
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
        const { id: assetId } = req.params;
        const { userId, ...updatedFields } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required in request body" });
        }

        const assetRecord = await Asset.findOne({
            assignedTo: new mongoose.Types.ObjectId(userId),
        });

        if (!assetRecord) {
            return res.status(404).json({ message: "Asset record for user not found" });
        }

        const assetIndex = assetRecord.assets.findIndex(
            (a) => a._id.toString() === assetId
        );

        if (assetIndex === -1) {
            return res.status(404).json({ message: "Specific asset not found" });
        }

        assetRecord.assets[assetIndex] = {
            ...assetRecord.assets[assetIndex]._doc,
            ...updatedFields,
        };

        await assetRecord.save();

        res.status(200).json({
            message: "Asset updated successfully",
            asset: assetRecord.assets[assetIndex],
        });
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
        const { id: assetId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required in request body" });
        }

        const assetRecord = await Asset.findOne({
            assignedTo: new mongoose.Types.ObjectId(userId),
        });

        if (!assetRecord) {
            return res.status(404).json({ message: "Asset record for user not found" });
        }

        const initialLength = assetRecord.assets.length;


        assetRecord.assets = assetRecord.assets.filter(
            (a) => a._id.toString() !== assetId
        );

        if (assetRecord.assets.length === initialLength) {
            return res.status(404).json({ message: "Specific asset not found" });
        }

        await assetRecord.save();

        res.status(200).json({ message: "Asset deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};



