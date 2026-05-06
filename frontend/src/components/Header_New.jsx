import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Header_New = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    console.log('Logged out')
    navigate('/login')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow:wght@300;400;500;600&display=swap');

        .hdr-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          height: 56px;
          background: rgba(10, 16, 28, 0.95);
          border-bottom: 1px solid rgba(0, 200, 255, 0.15);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 100;
          font-family: 'Barlow', sans-serif;
        }

        .hdr-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 18px;
          letter-spacing: 2px;
          color: #00c8ff;
          text-decoration: none;
          transition: color 0.2s;
        }
        .hdr-logo:hover { color: #00ffb2; text-decoration: none; }
        .hdr-logo-icon {
          font-size: 22px;
          color: #00ffb2;
        }

        .hdr-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hdr-live {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: #00ffb2;
          margin-right: 8px;
        }
        .hdr-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00ffb2;
          box-shadow: 0 0 6px #00ffb2;
          animation: hdr-pulse 1.5s ease-in-out infinite;
        }
        @keyframes hdr-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }

        .hdr-btn {
          background: transparent;
          border: 1px solid rgba(0, 200, 255, 0.25);
          color: #8aaccc;
          padding: 6px 18px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          letter-spacing: 1.5px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s;
        }
        .hdr-btn:hover {
          border-color: #00c8ff;
          color: #00c8ff;
          text-decoration: none;
          box-shadow: 0 0 10px rgba(0, 200, 255, 0.1);
        }

        .hdr-btn-primary {
          border-color: rgba(0, 200, 255, 0.5);
          color: #00c8ff;
          background: rgba(0, 200, 255, 0.06);
        }
        .hdr-btn-primary:hover {
          background: rgba(0, 200, 255, 0.14);
          color: #fff;
          border-color: #00c8ff;
        }

        .hdr-btn-danger {
          border-color: rgba(255, 60, 80, 0.3);
          color: #ff6070;
        }
        .hdr-btn-danger:hover {
          border-color: #ff3c50;
          color: #ff3c50;
          box-shadow: 0 0 10px rgba(255, 60, 80, 0.1);
        }
      `}</style>

      <nav className="hdr-nav">

        {/* LOGO */}
        <Link className="hdr-logo" to="/">
          <span className="hdr-logo-icon">◈</span>
          Stock Prediction Portal
        </Link>

        {/* RIGHT SIDE */}
        <div className="hdr-right">
          <div className="hdr-live">
            <span className="hdr-live-dot" />
            LIVE
          </div>

          {isLoggedIn ? (
            <>
              <Link className="hdr-btn hdr-btn-primary" to="/dashboard_new">
                Dashboard
              </Link>
              <button className="hdr-btn hdr-btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="hdr-btn" to="/login_new">
                Login
              </Link>
              <Link className="hdr-btn hdr-btn-primary" to="/register_new">
                Sign Up
              </Link>
            </>
          )}
        </div>

      </nav>
    </>
  )
}

export default Header_New