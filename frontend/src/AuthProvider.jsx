import {useState, useContext, createContext} from 'react'

// create the context
const AuthContext = createContext();


const AuthProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken') // `!!` converts the token value into a boolean: true if it exists, false if not.
    )

  return (
    // provide the data
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext};