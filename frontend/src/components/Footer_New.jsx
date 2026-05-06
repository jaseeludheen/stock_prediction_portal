import React from 'react'

const Footer_New = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow:wght@300;400;500;600&display=swap');

        .ftr-footer {
          background: rgba(10, 16, 28, 0.95);
          border-top: 1px solid rgba(0, 200, 255, 0.15);
          backdrop-filter: blur(12px);
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Barlow', sans-serif;
        }

        .ftr-left {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 14px;
          letter-spacing: 2px;
          color: #00c8ff;
        }
        .ftr-logo-icon {
          font-size: 16px;
          color: #00ffb2;
        }

        .ftr-center {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: #1e3a52;
        }

        .ftr-right {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: #00ffb2;
        }
        .ftr-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00ffb2;
          box-shadow: 0 0 6px #00ffb2;
          animation: ftr-pulse 1.5s ease-in-out infinite;
        }
        @keyframes ftr-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>

      <footer className="ftr-footer">

        {/* LEFT — Brand */}
        <div className="ftr-left">
          <span className="ftr-logo-icon">◈</span>
          Stock Prediction Portal
        </div>

        {/* CENTER — Copyright */}
        <div className="ftr-center">
          &copy; 2025 ALL RIGHTS RESERVED
        </div>

        {/* RIGHT — Live status */}
        <div className="ftr-right">
          <span className="ftr-live-dot" />
          MARKETS LIVE
        </div>

      </footer>
    </>
  )
}

export default Footer_New