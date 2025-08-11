import { useState, useEffect, useMemo } from "react";
import {
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaBitcoin,
} from "react-icons/fa";
import "./App.css";

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch cryptocurrency data from backend
  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      // const response = await fetch("http://localhost:5000/api/coins");
      const response = await fetch("https://vr-automation-assign.vercel.app/api/coins");

      if (!response.ok) {
        throw new Error("Failed to fetch data from backend");
      }

      const data = await response.json();
      setCryptoData(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError("Failed to fetch cryptocurrency data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch + auto-refresh every 30 minutes
  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 1800000); // 30 mins
    return () => clearInterval(interval);
  }, []);

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <FaSort className="sort-icon" />;
    }
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="sort-icon active" />
    ) : (
      <FaSortDown className="sort-icon active" />
    );
  };

  // Filter + sort data
  const filteredAndSortedData = useMemo(() => {
    const filteredData = cryptoData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredData;
  }, [cryptoData, searchTerm, sortConfig]);

  // Format currency
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);

  // Format market cap
  const formatMarketCap = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return formatCurrency(value);
  };

  // Format percentage
  const formatPercentage = (value) => {
    const formatted = value?.toFixed(2) || "0.00";
    return `${value >= 0 ? "+" : ""}${formatted}%`;
  };

  // Format timestamp
  const formatTimestamp = (date) => date?.toLocaleString() || "Never";

  if (loading && cryptoData.length === 0) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <FaBitcoin className="logo-icon" />
            <h1>Crypto Dashboard</h1>
          </div>
          <div className="header-info">
            <p>Last Updated: {formatTimestamp(lastUpdated)}</p>
            <button
              onClick={fetchCryptoData}
              className="refresh-btn"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh Now"}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="controls">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchCryptoData} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        <div className="table-container">
          <table className="crypto-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th onClick={() => handleSort("name")} className="sortable">
                  <span>Coin</span>
                  {getSortIcon("name")}
                </th>
                <th onClick={() => handleSort("symbol")} className="sortable">
                  <span>Symbol</span>
                  {getSortIcon("symbol")}
                </th>
                <th onClick={() => handleSort("price")} className="sortable">
                  <span>Price (USD)</span>
                  {getSortIcon("price")}
                </th>
                <th
                  onClick={() => handleSort("marketCap")}
                  className="sortable"
                >
                  <span>Market Cap</span>
                  {getSortIcon("marketCap")}
                </th>
                <th
                  onClick={() => handleSort("change24h")}
                  className="sortable"
                >
                  <span>24h Change</span>
                  {getSortIcon("change24h")}
                </th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((coin) => (
                <tr key={coin.coinId} className="table-row">
                  <td className="rank-cell">{coin.rank || "-"}</td>
                  <td className="coin-cell">
                    <div className="coin-info">
                      <img
                        src={coin.image || "/placeholder.svg"}
                        alt={coin.name}
                        className="coin-image"
                      />
                      <span className="coin-name">{coin.name}</span>
                    </div>
                  </td>
                  <td className="symbol-cell">{coin.symbol.toUpperCase()}</td>
                  <td className="price-cell">{formatCurrency(coin.price)}</td>
                  <td className="market-cap-cell">
                    {formatMarketCap(coin.marketCap)}
                  </td>
                  <td
                    className={`change-cell ${
                      coin.change24h >= 0 ? "positive" : "negative"
                    }`}
                  >
                    {formatPercentage(coin.change24h)}
                  </td>
                  <td className="updated-cell">
                    {new Date(coin.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAndSortedData.length === 0 && !loading && (
            <div className="no-results">
              <p>No cryptocurrencies found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
