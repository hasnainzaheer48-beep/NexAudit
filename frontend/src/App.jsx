import { useState } from 'react'
import Login from './pages/loginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/layout/navbar'


function App() {


  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route
    //       path="/login"
    //       element={<Login />}
    //     />

    //     <Route
    //       path="/dashboard"
    //       element={
    //         <ProtectedRoute>
    //           <Dashboard />
    //         </ProtectedRoute>
    //       } />

    //   </Routes>
    // </BrowserRouter>
    <Navbar />
  )
}

export default App
