import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faChartLine, faSearch } from '@fortawesome/free-solid-svg-icons'

const Dashboard_New = () => {
  const [ticker, setTicker] = useState('')
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [plot, setPlot] = useState()
  const [ma100, setMA100] = useState()
  const [ma200, setMA200] = useState()
  const [prediction, setPrediction] = useState()
  const [mse, setMSE] = useState()
  const [rmse, setRMSE] = useState()
  const [r2, setR2] = useState()

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get('/protected-view/');
      } catch (error) {
        console.error('Error fetching data :', error)
      }
    }
    fetchProtectedData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.post('/predict/', { ticker })

      // Check error FIRST, before setting any image URLs
      if (response.data.error) {
        setError(response.data.error)
        setPlot(null); setMA100(null); setMA200(null); setPrediction(null)
        setMSE(null); setRMSE(null); setR2(null)
        return   // stop here, don't set broken image URLs
      }

      const plotUrl       = `${BASE_URL}${response.data.plot_img}`
      const ma100Url      = `${BASE_URL}${response.data.plot_100_dma}`
      const ma200Url      = `${BASE_URL}${response.data.plot_200_dma}`
      const predictionUrl = `${BASE_URL}${response.data.plot_prediction}`
      setPlot(plotUrl)
      setMA100(ma100Url)
      setMA200(ma200Url)
      setPrediction(predictionUrl)
      setMSE(response.data.mse)
      setRMSE(response.data.rmse)
      setR2(response.data.r2)
      if (response.data.error) setError(response.data.error)
    } catch (error) {
      console.error('There was an error making the API request', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .db-root {
          min-height: 100vh;
          background: #080c14;
          background-image:
            radial-gradient(ellipse at 20% 10%, rgba(0,200,255,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(0,255,180,0.03) 0%, transparent 50%);
          font-family: 'Barlow', sans-serif;
          color: #c8d8e8;
        }

        .db-live {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: #00ffb2;
        }
        .db-live-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #00ffb2;
          box-shadow: 0 0 6px #00ffb2;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.8); }
        }

        /* ── MAIN LAYOUT ── */
        .db-body {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 0;
          min-height: calc(100vh - 56px);
        }

        /* ── LEFT PANEL ── */
        .db-left {
          background: rgba(10,16,26,0.8);
          border-right: 1px solid rgba(0,200,255,0.1);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .db-panel-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: #00c8ff;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(0,200,255,0.15);
          padding-bottom: 8px;
          margin-bottom: 4px;
        }
        .db-ticker-input {
          width: 100%;
          background: rgba(0,200,255,0.04);
          border: 1px solid rgba(0,200,255,0.2);
          color: #e0eeff;
          padding: 12px 16px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 15px;
          letter-spacing: 2px;
          outline: none;
          text-transform: uppercase;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .db-ticker-input::placeholder { color: #3a5070; letter-spacing: 2px; }
        .db-ticker-input:focus {
          border-color: #00c8ff;
          box-shadow: 0 0 12px rgba(0,200,255,0.1);
        }
        .db-error {
          font-size: 12px;
          color: #ff6070;
          margin-top: 6px;
          font-family: 'Share Tech Mono', monospace;
        }
        .db-submit-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, rgba(0,200,255,0.12), rgba(0,255,178,0.08));
          border: 1px solid rgba(0,200,255,0.4);
          color: #00c8ff;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.25s;
          margin-top: 16px;
          position: relative;
          overflow: hidden;
        }
        .db-submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(0,200,255,0.2), rgba(0,255,178,0.14));
          box-shadow: 0 0 20px rgba(0,200,255,0.15);
          color: #fff;
        }
        .db-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Metrics card */
        .db-metrics {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .db-metric-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: rgba(0,200,255,0.03);
          border: 1px solid rgba(0,200,255,0.1);
          border-left: 2px solid rgba(0,200,255,0.4);
        }
        .db-metric-label {
          font-size: 11px;
          letter-spacing: 1.5px;
          color: #5a7a9a;
          text-transform: uppercase;
        }
        .db-metric-value {
          font-family: 'Share Tech Mono', monospace;
          font-size: 14px;
          color: #00ffb2;
        }
        .db-metric-row.r2 { border-left-color: #00ffb2; }
        .db-metric-row.rmse { border-left-color: #ffaa00; }
        .db-metric-row.mse { border-left-color: #ff6070; }

        /* ── RIGHT PANEL ── */
        .db-right {
          padding: 32px;
          overflow-y: auto;
        }
        .db-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 16px;
          color: #1e3048;
        }
        .db-empty-icon {
          font-size: 64px;
          color: rgba(0,200,255,0.08);
        }
        .db-empty-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 3px;
          color: #1e3048;
        }
        .db-charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .db-chart-card {
          background: rgba(10,18,30,0.8);
          border: 1px solid rgba(0,200,255,0.1);
          padding: 16px;
          transition: border-color 0.2s;
        }
        .db-chart-card:hover { border-color: rgba(0,200,255,0.3); }
        .db-chart-card.full { grid-column: 1 / -1; }
        .db-chart-title {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 2.5px;
          color: #00c8ff;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .db-chart-img {
          width: 100%;
          display: block;
          filter: brightness(0.95) saturate(1.1);
        }
        .db-empty-data {
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 14,
          letterSpacing: 3,
          color: '#ff6070',
          textAlign: 'center',
        }
        .db-empty-text {
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11,
          letterSpacing: 2,
          color: 'rgba(255,96,112,0.4)',
          textAlign: 'center',
          lineHeight: 2,
        }
                  
      `}</style>

      <div className="db-root">

        {/* BODY */}
        <div className="db-body">

          {/* LEFT COLUMN */}
          <aside className="db-left">
            <div>
              <div className="db-panel-label">Ticker Symbol</div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="db-ticker-input"
                  placeholder="e.g. AAPL"
                  onChange={(e) => setTicker(e.target.value)}
                  required
                />
                {error && <div className="db-error">⚠ {error}</div>}
                <button
                  type="submit"
                  className="db-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? <><FontAwesomeIcon icon={faSpinner} spin /> &nbsp;PROCESSING...</>
                    : <><FontAwesomeIcon icon={faChartLine} /> &nbsp;RUN PREDICTION</>
                  }
                </button>
              </form>
            </div>

            {/* METRICS */}
            {mse && (
              <div>
                <div className="db-panel-label">Model Metrics</div>
                <div className="db-metrics">
                  <div className="db-metric-row mse">
                    <span className="db-metric-label">MSE</span>
                    <span className="db-metric-value">{Number(mse).toFixed(4)}</span>
                  </div>
                  <div className="db-metric-row rmse">
                    <span className="db-metric-label">RMSE</span>
                    <span className="db-metric-value">{Number(rmse).toFixed(4)}</span>
                  </div>
                  <div className="db-metric-row r2">
                    <span className="db-metric-label">R²</span>
                    <span className="db-metric-value">{Number(r2).toFixed(4)}</span>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* RIGHT COLUMN */}
          <main className="db-right">
            {error ? (
              <div className="db-empty-state">
                <div style={{ fontSize: 48, color: 'rgba(255,96,112,0.25)', lineHeight: 1 }}>⚠</div>
                <div className='db-empty-data'>NO DATA FOUND</div>
                <div className='db-empty-text'>"{ticker}" returned no results.<br />
                  TRY A VALID SYMBOL — AAPL · TSLA · NVDA</div>
                <button onClick={() => setError(null)}
                  style={{
                    marginTop: 4,
                    padding: '8px 28px',
                    background: 'rgba(255,96,112,0.06)',
                    border: '1px solid rgba(255,96,112,0.25)',
                    color: '#ff6070',
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 11,
                    letterSpacing: 2,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.target.style.background = 'rgba(255,96,112,0.14)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(255,96,112,0.06)'}
                >
                  ↩ TRY AGAIN
                </button>
              </div>

            ) : !prediction ? (
              <div className="db-empty-state">
                <div className="db-empty-icon">◈</div>
                <div className="db-empty-text">ENTER A TICKER TO BEGIN ANALYSIS</div>
              </div>

            ) : (
              <div className="db-charts-grid">
                {plot && (
                  <div className="db-chart-card full">
                    <div className="db-chart-title">▸ Historical Price</div>
                    <img src={plot} alt="Price chart" className="db-chart-img" />
                  </div>
                )}
                {ma100 && (
                  <div className="db-chart-card">
                    <div className="db-chart-title">▸ 100-Day MA</div>
                    <img src={ma100} alt="100 DMA" className="db-chart-img" />
                  </div>
                )}
                {ma200 && (
                  <div className="db-chart-card">
                    <div className="db-chart-title">▸ 200-Day MA</div>
                    <img src={ma200} alt="200 DMA" className="db-chart-img" />
                  </div>
                )}
                {prediction && (
                  <div className="db-chart-card full">
                    <div className="db-chart-title">▸ Prediction vs Actual</div>
                    <img src={prediction} alt="Prediction" className="db-chart-img" />
                  </div>
                )}
              </div>
            )}
          </main>

        </div>
      </div>
    </>
  )
}

export default Dashboard_New