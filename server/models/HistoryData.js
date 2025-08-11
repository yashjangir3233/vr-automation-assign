const mongoose = require("mongoose");

const HistoryDataSchema = new mongoose.Schema({
  coinId: String,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: { type: Date, default: Date.now },
  image: String,
});

module.exports = mongoose.model("HistoryData", HistoryDataSchema);
