import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/user.route.js";
import flightRoute from "./routes/flight.route.js";
import bookihgRoute from "./routes/booking.route.js";
import connectDB from "./utils/db.js";

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://flight-bookingfrontend.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/user", userRoute);
app.use("/api/flight", flightRoute);
app.use("/api/booking", bookihgRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
