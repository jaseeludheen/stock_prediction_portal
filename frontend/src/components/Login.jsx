import React, {useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../AuthProvider'


const Login = () => {

    const [username , setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true)

      const userData = {username, password}
      console.log('user data =>', userData);

      try{
        const response = await axios.post(`${BASE_URL}/api/v1/token/`, userData) 
        console.log('response.data==>', response.data);

        // Save the JWT access token (short-lived) to localStorage
        localStorage.setItem('accessToken', response.data.access)
        // Save the JWT refresh token (long-lived) to localStorage
        localStorage.setItem('refreshToken', response.data.access)

        console.log('login successful')
        setIsLoggedIn(true)
        navigate('/')
      }catch(error) {
        console.error('Invalid Credentials')
        setError('Invalid Credentials')
      }finally{
        setLoading(false)
      }

    }
    
  return (
    <>
    <div className="container">
        <div className="row  justify-content-center">
            <div className="col-md-6 bg-light-dark p-5 rounded-3">
                <h3 className='text-light text-center pb-3'>Login to our Portal</h3>

                <form onSubmit={handleLogin}>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='Enter user name' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    
                    <div className='mb-3'>
                        <input type="password" className='form-control mb-4' placeholder='Set Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    {error && <div className='text-danger'>{error}</div>}

                    {loading ? (
                        <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin /> Logging in...</button>
                    ) : (
                        <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>
                    )}   


                </form>

            </div>
        </div>
    </div>
    
    </>
    
  )
}

export default Login