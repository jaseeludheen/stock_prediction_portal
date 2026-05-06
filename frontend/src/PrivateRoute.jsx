import {Children, useContext} from 'react'
import {AuthContext} from './AuthProvider'
import {Navigate} from 'react-router-dom'



const PrivateRoute = ({children}) =>  {
    const {isLoggedIn} = useContext(AuthContext);

  return isLoggedIn ? (
    children
  ) : (
    // <Navigate to="/login" />  // redirect to login page if not authenticated
    <Navigate to="/login_new" />  // redirect to login page if not authenticated
  )
}

export default PrivateRoute