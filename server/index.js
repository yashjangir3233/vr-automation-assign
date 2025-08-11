const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();

const coinRoutes = require("./routes/coinRoutes");
const { fetchCoins } = require("./services/coinService");
const HistoryData = require("./models/HistoryData");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", coinRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;

// Cron job: every 1 hour
cron.schedule("0 * * * *", async () => {
  console.log("Running hourly job...");
  try {
    const coins = await fetchCoins();
    await HistoryData.insertMany(coins);
    console.log("History updated");
  } catch (err) {
    console.error("Cron job error:", err.message);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
