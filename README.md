# Crypto Dashboard — MERN Stack Application

A full-stack cryptocurrency tracker built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) that displays real-time market data for the top 10 cryptocurrencies using the [CoinGecko API](https://www.coingecko.com/en/api/documentation).  

---

## Features

### **Frontend**
- Displays **Top 10 cryptocurrencies** with:
  - Coin Name
  - Symbol
  - Current Price (USD)
  - Market Cap
  - 24h % Change
  - Last Updated Timestamp
- **Auto-refresh** every 30 minutes
- Search cryptocurrencies by name or symbol
- Sort table columns (ascending/descending)
- Responsive and modern UI

### **Backend**
- **API Endpoints**:
  - `GET /api/coins` → Fetches live data from CoinGecko
  - `POST /api/history` → Saves snapshot of current prices to MongoDB
  - `GET /api/history/:coinId` *(optional)* → Returns historical price data for a coin
- **Database Models**:
  - **CurrentData** → Stores latest data
  - **HistoryData** → Stores hourly historical records
- **Cron Job**:
  - Runs every 1 hour
  - Fetches new market data from CoinGecko
  - Saves data to `HistoryData` collection

---

## Tech Stack

**Frontend**
- React.js
- react-icons
- CSS

**Backend**
- Node.js
- Express.js
- Mongoose
- node-cron
- cors
- dotenv

**Database**
- MongoDB Atlas

**API**
- CoinGecko API

---

## Setup & Installation

```bash
git clone https://github.com/yashjangir3233/vr-automation-assign.git
cd vr-automation-assign
cd client
npm install
npm run dev
cd ..
cd server
npm install
node index.js

