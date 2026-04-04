import React, { useState } from 'react';
import { decodeVIN, getMarketData, parseSearchQuery } from '../services/carDataService';
import MarketChart from './MarketChart';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setCarData(null);
    setError(null);
    setLoading(true);

    try {
      const isVIN = /^[A-HJ-NPR-Z0-9]{17}$/i.test(query.trim());
      let vehicleInfo;
      if (isVIN) {
        vehicleInfo = await decodeVIN(query.trim());
      } else {
        vehicleInfo = parseSearchQuery(query.trim());
      }

      if (vehicleInfo && vehicleInfo.make !== "Unknown") {
        const marketData = await getMarketData(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
        setCarData({ ...marketData, vin: vehicleInfo.vin });
      } else {
        setError("Could not identify this vehicle. Try '2018 Audi A3' or a 17-character VIN.");
      }
    } catch (err) {
      setError("Failed to analyze vehicle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="search-section glass-card">
        <h1>Car Market Intelligence</h1>
        <p>Real-time valuation, reliability, and maintenance insights</p>
        <div className="search-box">
          <input
            type="text"
            className="input-main"
            placeholder="Enter VIN or Model (e.g. 2018 Audi A3)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn-primary" onClick={handleSearch} disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        {error && <p className="error-text">{error}</p>}
      </div>

      {carData && (
        <div className="results-container fadeIn">
          {/* Main Info Header */}
          <div className="car-header-main glass-card">
            <h2>{carData.year} {carData.make} {carData.model}</h2>
            <span className="vin-tag">ID: {carData.vin || 'MODEL_MATCH'}</span>
          </div>

          {/* Unified Lined Box for Core Metrics */}
          <div className="lined-box glass-card">

            {/* 1. Pricepoint (Live Market Range) */}
            <div className="section price-section">
              <div className="section-header">
                <span className="icon">💰</span>
                <h4>Live Market Range</h4>
              </div>
              <div className="price-display">
                <span className="price-value">
                  €{carData.livePricing.priceRange.low.toLocaleString()} - €{carData.livePricing.priceRange.high.toLocaleString()}
                </span>
                <p className="price-subtext">
                  Based on {carData.livePricing.listingCount} active market listings.
                  <br />
                  <small>⏱️ Updated: {new Date(carData.livePricing.lastUpdated).toLocaleTimeString()}</small>
                </p>
              </div>
            </div>

            {/* 2. Valuation Trends */}
            <div className="section chart-section">
              <div className="section-header">
                <span className="icon">📈</span>
                <h4>Valuation Trend (6M)</h4>
              </div>
              <div className="chart-container">
                <MarketChart history={carData.history} dark={true} />
              </div>
            </div>

            {/* 3. Predictive Reliability */}
            <div className="section reliability-section">
              <div className="section-header">
                <span className="icon">🛡️</span>
                <h4>Predictive Reliability</h4>
              </div>
              <ul className="faults-list-minimal">
                {carData.commonFaults?.map((fault, idx) => (
                  <li key={idx}>
                    <span className={`risk-dot ${fault.risk?.toLowerCase()}`}></span>
                    <div>
                      <strong>{fault.component}</strong>
                      <p>{fault.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Maintenance Reminder */}
            <div className="section maintenance-section">
              <div className="section-header">
                <span className="icon">🔧</span>
                <h4>Maintenance Reminders</h4>
              </div>
              <div className="maintenance-grid">
                {carData.maintenance?.map((item, idx) => (
                  <div key={idx} className="maintenance-pill">
                    <span className="m-icon">{item.icon}</span>
                    <div className="m-info">
                      <span className="m-name">{item.item}</span>
                      <span className="m-due">{item.nextDue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="recommendation-badge glass-card">
            <h4>Verdict</h4>
            <p>{carData.recommendation}</p>
          </div>
        </div>
      )}

      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }
        .fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .search-section {
          padding: 3rem 2rem;
          text-align: center;
          background: var(--primary-dark);
          border: 1px solid var(--border);
        }
        .search-box {
          display: flex;
          gap: 0.75rem;
          max-width: 600px;
          margin: 2rem auto 0;
          background: rgba(255, 255, 255, 0.05);
          padding: 6px;
          border-radius: 12px;
          border: 1px solid var(--border);
        }
        .search-box input {
          background: transparent;
          color: white;
          border: none;
        }
        .search-box input::placeholder { color: rgba(255, 255, 255, 0.5); }

        .car-header-main {
          padding: 1.5rem 2rem;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 4px solid var(--primary);
        }
        .car-header-main h2 { font-size: 1.8rem; margin: 0; }
        .vin-tag { font-family: monospace; font-size: 0.8rem; opacity: 0.6; }

        /* THE LINED BOX */
        .lined-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid var(--border);
          overflow: hidden;
          background: var(--glass);
        }
        .section {
          padding: 2rem;
          border: 1px solid var(--border);
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }
        .section-header h4 {
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
          color: var(--secondary);
        }

        /* Price Section */
        .price-value {
          display: block;
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: white;
        }
        .price-subtext { font-size: 0.9rem; color: var(--text-muted); line-height: 1.4; }

        /* Reliability List */
        .faults-list-minimal { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .faults-list-minimal li { display: flex; gap: 1rem; align-items: flex-start; }
        .risk-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
        .risk-dot.high, .risk-dot.critical { background: #ff4d4d; box-shadow: 0 0 8px #ff4d4d; }
        .risk-dot.medium { background: #ffcc00; }
        .risk-dot.low { background: #00ffcc; }
        .faults-list-minimal p { font-size: 0.85rem; color: var(--text-muted); margin-top: 2px; }

        /* Maintenance Grid */
        .maintenance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .maintenance-pill {
          background: rgba(255, 255, 255, 0.05);
          padding: 10px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 1px solid var(--border);
        }
        .m-icon { font-size: 1.2rem; }
        .m-name { display: block; font-weight: 600; font-size: 0.85rem; }
        .m-due { font-size: 0.75rem; color: var(--text-muted); }

        .recommendation-badge {
          margin-top: 1.5rem;
          padding: 1.5rem 2rem;
          text-align: center;
          background: linear-gradient(to right, rgba(0, 116, 217, 0.1), transparent);
          border-right: 4px solid var(--accent);
        }
        .recommendation-badge h4 { color: var(--accent); margin-bottom: 0.5rem; }

        @media (max-width: 800px) {
          .lined-box { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
