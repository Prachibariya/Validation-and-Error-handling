const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Connect DB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Global error handler
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
