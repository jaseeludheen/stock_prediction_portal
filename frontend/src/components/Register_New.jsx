import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faUserPlus } from '@fortawesome/free-solid-svg-icons'

const Register_New = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = { username, email, password }
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/register/`, userData)
      console.log('response.data==>', response.data)
      console.log('Registration Successful')
      setErrors({});
      setSuccess(true);
    } catch (error) {
      setErrors(error.response.data);
      console.error('Registration error:', error.response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow:wght@300;400;500;600&display=swap');

        .reg-wrapper {
          min-height: calc(100vh - 56px);
          background: #080c14;
          background-image:
            radial-gradient(ellipse at 20% 20%, rgba(0,200,255,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(0,255,180,0.03) 0%, transparent 50%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Barlow', sans-serif;
          padding: 40px 16px;
        }

        .reg-card {
          width: 100%;
          max-width: 440px;
          background: rgba(10, 16, 26, 0.9);
          border: 1px solid rgba(0, 200, 255, 0.15);
          padding: 40px 36px;
          position: relative;
        }

        /* glowing top edge */
        .reg-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00c8ff, #00ffb2, transparent);
          opacity: 0.6;
        }

        .reg-heading {
          font-family: 'Share Tech Mono', monospace;
          font-size: 18px;
          letter-spacing: 3px;
          color: #00c8ff;
          text-align: center;
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .reg-subheading {
          font-size: 12px;
          letter-spacing: 1.5px;
          color: #1e3a52;
          text-align: center;
          margin-bottom: 32px;
          font-family: 'Share Tech Mono', monospace;
          text-transform: uppercase;
        }

        .reg-field {
          margin-bottom: 20px;
        }
        .reg-label {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 2.5px;
          color: #00c8ff;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .reg-input {
          width: 100%;
          background: rgba(0, 200, 255, 0.04);
          border: 1px solid rgba(0, 200, 255, 0.2);
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid rgba(0, 200, 255, 0.25);
          color: #e0eeff;
          padding: 10px 12px;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          border: 1px solid rgba(0, 200, 255, 0.15);
        }
        .reg-input::placeholder { color: #2a4060; }
        .reg-input:focus {
          border-color: rgba(0, 200, 255, 0.5);
          box-shadow: 0 0 12px rgba(0, 200, 255, 0.08);
          background: rgba(0, 200, 255, 0.06);
        }

        .reg-error {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          color: #ff6070;
          margin-top: 5px;
          letter-spacing: 0.5px;
        }

        .reg-success {
          background: rgba(0, 255, 178, 0.06);
          border: 1px solid rgba(0, 255, 178, 0.3);
          color: #00ffb2;
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-align: center;
          padding: 12px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .reg-btn {
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
        .reg-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(0,200,255,0.2), rgba(0,255,178,0.14));
          box-shadow: 0 0 20px rgba(0, 200, 255, 0.15);
          color: #fff;
        }
        .reg-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .reg-login-link {
          text-align: center;
          margin-top: 24px;
          font-size: 12px;
          color: #2a4060;
          font-family: 'Share Tech Mono', monospace;
          letter-spacing: 1px;
        }
        .reg-login-link a {
          color: #00c8ff;
          text-decoration: none;
          transition: color 0.2s;
        }
        .reg-login-link a:hover { color: #00ffb2; }
      `}</style>

      <div className="reg-wrapper">
        <div className="reg-card">

          <h3 className="reg-heading">◈ Create Account</h3>
          <p className="reg-subheading">Stock Prediction Portal</p>

          {success && (
            <div className="reg-success">✔ Registration Successful</div>
          )}

          <form onSubmit={handleRegistration}>

            <div className="reg-field">
              <label className="reg-label">Username</label>
              <input
                type="text"
                className="reg-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <div className="reg-error">⚠ {errors.username}</div>}
            </div>

            <div className="reg-field">
              <label className="reg-label">Email Address</label>
              <input
                type="email"
                className="reg-input"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="reg-error">⚠ {errors.email}</div>}
            </div>

            <div className="reg-field">
              <label className="reg-label">Password</label>
              <input
                type="password"
                className="reg-input"
                placeholder="Set a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="reg-error">⚠ {errors.password}</div>}
            </div>

            <button
              type="submit"
              className="reg-btn"
              disabled={loading}
            >
              {loading
                ? <><FontAwesomeIcon icon={faSpinner} spin /> &nbsp;Please wait...</>
                : <><FontAwesomeIcon icon={faUserPlus} /> &nbsp;Register</>
              }
            </button>

          </form>

          <div className="reg-login-link">
            Already have an account? <a href="/login">Login</a>
          </div>

        </div>
      </div>
    </>
  )
}

export default Register_New