// config/db.js
const mongoose = require("mongoose");


async function connectDB() {
try {
await mongoose.connect("mongodb://127.0.0.1:27017/day13db");
console.log("✅ MongoDB connected");
} catch (err) {
console.error("MongoDB connection error:", err.message);
process.exit(1);
}
}


module.exports = connectDB;