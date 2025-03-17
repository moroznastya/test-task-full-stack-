const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const { syncDB } = require("./models");
const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
require("dotenv").config();






const app = express();
// Дозволити запити з фронтенду
app.use(cors({
  origin: "*", // фронтенд на порту 3000
}));
//app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api", eventRoutes);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await syncDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
