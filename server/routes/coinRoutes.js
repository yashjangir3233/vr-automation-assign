const express = require("express");
const router = express.Router();
const { fetchCoins } = require("../services/coinService");
const CurrentData = require("../models/CurrentData");
const HistoryData = require("../models/HistoryData");

router.get("/coins", async (req, res) => {
  try {
    const coins = await fetchCoins();
    await CurrentData.deleteMany({});
    await CurrentData.insertMany(coins);
    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/history", async (req, res) => {
  try {
    const coins = await fetchCoins();
    await HistoryData.insertMany(coins);
    res.json({ message: "History saved", count: coins.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/history/:coinId", async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await HistoryData.find({ coinId }).sort({ timestamp: 1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
