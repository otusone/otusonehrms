const mongoose = require("mongoose");
require("dotenv").config(); // Fixed typo here

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
        process.exit(1); 
    }
};

