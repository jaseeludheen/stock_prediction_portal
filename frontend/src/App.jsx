import { useState } from 'react'
import './assets/css/style.css'
// import Header from './components/Header'
import Header_New from './components/Header_New'
// import Main from './components/Main'
import Main_New from './components/Main_New'
// import Footer from './components/Footer'
import Footer_New from './components/Footer_New'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Register from './components/Register'
import Register_New from './components/Register_New'
// import Login from './components/Login'
import Login_New from './components/Login_New'
import AuthProvider from './AuthProvider'
// import Dashboard from './components/dashboard/Dashboard'
import Dashboard_New from './components/dashboard/Dashboard_New'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'




function App() {
  

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      <Header_New />
        <Routes>
          {/* <Route path='/' element={<Main />} /> */}
          <Route path='/' element={<Main_New />} />
          {/* <Route path='/register' element={<PublicRoute> <Register /> </PublicRoute>} /> */}
          <Route path='/register_new' element={<PublicRoute> <Register_New /> </PublicRoute>} />
          {/* <Route path='/login' element={ <PublicRoute> <Login /> </PublicRoute>} /> */}
          <Route path='/login_new' element={ <PublicRoute> <Login_New /> </PublicRoute>} />
          {/* <Route path='/dashboard' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} /> */}
          <Route path='/dashboard_new' element={<PrivateRoute> <Dashboard_New /> </PrivateRoute>} />

        </Routes>
      <Footer_New />
      </BrowserRouter>
    </AuthProvider>
    

      
    </>
  )
}

export default App
