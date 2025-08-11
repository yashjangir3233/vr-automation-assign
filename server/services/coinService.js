const axios = require("axios");
require("dotenv").config();

async function fetchCoins() {
  const url = `${process.env.COINGECKO_URL}?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`;
  const { data } = await axios.get(url);
  return data.map((c) => ({
    coinId: c.id,
    name: c.name,
    symbol: c.symbol,
    price: c.current_price,
    marketCap: c.market_cap,
    change24h: c.price_change_percentage_24h,
    timestamp: new Date(),
    image: c.image,
  }));
}

module.exports = { fetchCoins };
