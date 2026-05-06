import {useContext} from 'react'
import { AuthContext } from './AuthProvider'
import {Navigate} from 'react-router-dom'

const PublicRoute = ({children}) => {
    const { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? (
    children
  ) : (
    // <Navigate to="/dashboard" />  // redirect to dashboard if already authenticated
    <Navigate to="/dashboard_new" />  // redirect to dashboard if already authenticated
  )
}

export default PublicRoute