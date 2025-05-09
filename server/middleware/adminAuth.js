// const jwt = require("jsonwebtoken");
// const User = require("../models/UserModel");

// exports.adminAuth = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization")?.replace("Bearer ", "");
//         if (!token) {
//             return res.status(401).json({ error: "No token provided" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({ _id: decoded._id });

//         if (!user || user.role !== "admin") {
//             return res.status(403).json({ error: "Access denied. Admins only." });
//         }

//         req.token = token;
//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(401).json({ error: "Invalid or expired token" });
//     }
// };
