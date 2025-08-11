# 🚀 Crypto Dashboard — MERN Stack Application

A full-stack cryptocurrency tracker built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) that displays real-time market data for the top 10 cryptocurrencies using the [CoinGecko API](https://www.coingecko.com/en/api/documentation).  
This project was developed as part of the **VR Automations Developer Test**.

---

## 📌 Features

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
  - **CurrentData** → Stores latest data (overwritten on each sync)
  - **HistoryData** → Stores hourly historical records
- **Cron Job**:
  - Runs every 1 hour
  - Fetches new market data from CoinGecko
  - Saves data to `HistoryData` collection

---

## 🛠 Tech Stack

**Frontend**
- React.js
- react-icons
- CSS (custom styling)

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

## ⚙️ Setup & Installation

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
