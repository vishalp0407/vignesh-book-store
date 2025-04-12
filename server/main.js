import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/db.config.js";
import userRoutes from "./routes/user.route.js";
import bookRoutes from "./routes/book.route.js";
import rentalRoutes from "./routes/rental.route.js";

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "backend is running" });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/rentals", rentalRoutes);

app.listen(PORT, () => {
  console.log(
    `server is running on ${PORT} and mode on ${process.env.NODE_ENV}`
  );
});
