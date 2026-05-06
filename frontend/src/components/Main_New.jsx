import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'


const Main_New = () => {
  const [typed, setTyped] = useState('')
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const tagline = 'PREDICT. ANALYZE. TRADE.'

  // Typewriter effect for tagline
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setTyped(tagline.slice(0, i + 1))
      i++
      if (i === tagline.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow:wght@300;400;500;600&display=swap');

        .mn-wrapper {
          min-height: calc(100vh - 112px);
          background: #080c14;
          background-image:
            radial-gradient(ellipse at 15% 20%, rgba(0,200,255,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 75%, rgba(0,255,180,0.04) 0%, transparent 50%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Barlow', sans-serif;
          padding: 60px 24px;
          position: relative;
          overflow: hidden;
        }

        /* Background grid lines */
        .mn-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .mn-inner {
          position: relative;
          z-index: 1;
          max-width: 780px;
          width: 100%;
          text-align: center;
        }

        /* Top badge */
        .mn-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(0,200,255,0.2);
          padding: 6px 18px;
          margin-bottom: 32px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 3px;
          color: #00ffb2;
          background: rgba(0,255,178,0.04);
        }
        .mn-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00ffb2;
          box-shadow: 0 0 6px #00ffb2;
          animation: mn-pulse 1.5s ease-in-out infinite;
        }
        @keyframes mn-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.8); }
        }

        /* Main heading */
        .mn-heading {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(32px, 6vw, 56px);
          letter-spacing: 4px;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .mn-heading span {
          color: #00c8ff;
        }

        /* Typewriter tagline */
        .mn-tagline {
          font-family: 'Share Tech Mono', monospace;
          font-size: 14px;
          letter-spacing: 4px;
          color: #00ffb2;
          margin-bottom: 28px;
          min-height: 24px;
        }
        .mn-tagline::after {
          content: '|';
          animation: mn-blink 0.8s step-end infinite;
          color: #00c8ff;
          margin-left: 2px;
        }
        @keyframes mn-blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }

        /* Description */
        .mn-desc {
          font-size: 15px;
          line-height: 1.8;
          color: #4a6a8a;
          max-width: 580px;
          margin: 0 auto 44px;
          font-weight: 300;
          letter-spacing: 0.3px;
        }

        /* CTA Buttons */
        .mn-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .mn-btn-primary {
          padding: 14px 36px;
          background: linear-gradient(135deg, rgba(0,200,255,0.15), rgba(0,255,178,0.08));
          border: 1px solid rgba(0,200,255,0.5);
          color: #00c8ff;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 2.5px;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.25s;
          display: inline-block;
        }
        .mn-btn-primary:hover {
          background: linear-gradient(135deg, rgba(0,200,255,0.25), rgba(0,255,178,0.15));
          box-shadow: 0 0 28px rgba(0,200,255,0.2);
          color: #fff;
          text-decoration: none;
        }
        .mn-btn-ghost {
          padding: 14px 36px;
          background: transparent;
          border: 1px solid rgba(0,200,255,0.15);
          color: #4a6a8a;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 2.5px;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.25s;
          display: inline-block;
        }
        .mn-btn-ghost:hover {
          border-color: rgba(0,200,255,0.3);
          color: #00c8ff;
          text-decoration: none;
        }

        /* Stats row */
        .mn-stats {
          display: flex;
          justify-content: center;
          gap: 0;
          margin-top: 64px;
          border: 1px solid rgba(0,200,255,0.1);
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        .mn-stat {
          flex: 1;
          padding: 20px 16px;
          border-right: 1px solid rgba(0,200,255,0.1);
          text-align: center;
        }
        .mn-stat:last-child { border-right: none; }
        .mn-stat-value {
          font-family: 'Share Tech Mono', monospace;
          font-size: 22px;
          color: #00c8ff;
          letter-spacing: 1px;
          display: block;
        }
        .mn-stat-label {
          font-size: 10px;
          letter-spacing: 2px;
          color: #1e3a52;
          text-transform: uppercase;
          margin-top: 4px;
          display: block;
          font-family: 'Share Tech Mono', monospace;
        }
      `}</style>

      <div className="mn-wrapper">
        <div className="mn-inner">

          {/* Live badge */}
          <div className="mn-badge">
            <span className="mn-badge-dot" />
            MARKETS LIVE — AI-POWERED ANALYSIS
          </div>

          {/* Heading */}
          <h1 className="mn-heading">
            Stock<span>Prediction</span>Portal
          </h1>

          {/* Typewriter */}
          <div className="mn-tagline">{typed}</div>

          {/* Description */}
          <p className="mn-desc">
            Leverage advanced machine learning algorithms for accurate stock price predictions.
            Built for investors, traders, and financial enthusiasts who demand
            data-driven insights to navigate the market with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="mn-actions">
            {isLoggedIn ? (
                <Link to="/dashboard_new" className="mn-btn-primary">
                ▸ &nbsp;Explore Now
                </Link>
            ) : <Link to="/register_new" className="mn-btn-ghost">
                 Create Account
                </Link> 
            }
          </div>

          
          {/* Stats */}
          <div className="mn-stats">
            <div className="mn-stat">
              <span className="mn-stat-value">LSTM</span>
              <span className="mn-stat-label">Model</span>
            </div>
            <div className="mn-stat">
              <span className="mn-stat-value">100+</span>
              <span className="mn-stat-label">Tickers</span>
            </div>
            <div className="mn-stat">
              <span className="mn-stat-value">Real-time</span>
              <span className="mn-stat-label">Data Feed</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Main_New