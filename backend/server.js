import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // or: const cors = require("cors");
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
}));



app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
import contactRoutes from "./routes/contactRoutes.js";

app.use("/api/contact", contactRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
