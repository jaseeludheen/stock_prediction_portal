import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Login_New = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  // const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    const userData = { username, password }
    try {
      // const response = await axios.post(`${BASE_URL}/api/v1/token/`, userData)
      const response = await axiosInstance.post('/token/', userData)

      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      console.log('login successful')
      setIsLoggedIn(true)
      navigate('/dashboard_new')
    } catch (error) {
      console.error('Invalid Credentials')
      setError('Invalid Credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow:wght@300;400;500;600&display=swap');

        .lgn-wrapper {
          min-height: calc(100vh - 56px);
          background: #080c14;
          background-image:
            radial-gradient(ellipse at 80% 20%, rgba(0,200,255,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(0,255,180,0.03) 0%, transparent 50%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Barlow', sans-serif;
          padding: 40px 16px;
        }

        .lgn-card {
          width: 100%;
          max-width: 420px;
          background: rgba(10, 16, 26, 0.9);
          border: 1px solid rgba(0, 200, 255, 0.15);
          padding: 40px 36px;
          position: relative;
        }

        /* glowing top edge */
        .lgn-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffb2, #00c8ff, transparent);
          opacity: 0.6;
        }

        .lgn-heading {
          font-family: 'Share Tech Mono', monospace;
          font-size: 18px;
          letter-spacing: 3px;
          color: #00c8ff;
          text-align: center;
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .lgn-subheading {
          font-size: 12px;
          letter-spacing: 1.5px;
          color: #1e3a52;
          text-align: center;
          margin-bottom: 32px;
          font-family: 'Share Tech Mono', monospace;
          text-transform: uppercase;
        }

        .lgn-field {
          margin-bottom: 20px;
        }
        .lgn-label {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 2.5px;
          color: #00c8ff;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .lgn-input {
          width: 100%;
          background: rgba(0, 200, 255, 0.04);
          border: 1px solid rgba(0, 200, 255, 0.15);
          color: #e0eeff;
          padding: 10px 12px;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .lgn-input::placeholder { color: #2a4060; }
        .lgn-input:focus {
          border-color: rgba(0, 200, 255, 0.5);
          box-shadow: 0 0 12px rgba(0, 200, 255, 0.08);
          background: rgba(0, 200, 255, 0.06);
        }

        .lgn-error {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          color: #ff6070;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
          text-align: center;
        }

        .lgn-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, rgba(0,200,255,0.12), rgba(0,255,178,0.08));
          border: 1px solid rgba(0, 200, 255, 0.4);
          color: #00c8ff;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          letter-spacing: 2px;
          cursor: pointer;
          text-transform: uppercase;
          margin-top: 8px;
          transition: all 0.25s;
        }
        .lgn-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(0,200,255,0.2), rgba(0,255,178,0.14));
          box-shadow: 0 0 20px rgba(0, 200, 255, 0.15);
          color: #fff;
        }
        .lgn-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .lgn-register-link {
          text-align: center;
          margin-top: 24px;
          font-size: 12px;
          color: #2a4060;
          font-family: 'Share Tech Mono', monospace;
          letter-spacing: 1px;
        }
        .lgn-register-link a {
          color: #00c8ff;
          text-decoration: none;
          transition: color 0.2s;
        }
        .lgn-register-link a:hover { color: #00ffb2; }
      `}</style>

      <div className="lgn-wrapper">
        <div className="lgn-card">

          <h3 className="lgn-heading">◈ Welcome Back</h3>
          <p className="lgn-subheading">Stock Prediction Portal</p>

          <form onSubmit={handleLogin}>

            <div className="lgn-field">
              <label className="lgn-label">Username</label>
              <input
                type="text"
                className="lgn-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="lgn-field">
              <label className="lgn-label">Password</label>
              <input
                type="password"
                className="lgn-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div className="lgn-error">⚠ {error}</div>}

            <button
              type="submit"
              className="lgn-btn"
              disabled={loading}
            >
              {loading
                ? <><FontAwesomeIcon icon={faSpinner} spin /> &nbsp;Logging in...</>
                : <><FontAwesomeIcon icon={faRightToBracket} /> &nbsp;Login</>
              }
            </button>

          </form>

          <div className="lgn-register-link">
            Don't have an account? <a href="/register_new">Sign Up</a>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login_New