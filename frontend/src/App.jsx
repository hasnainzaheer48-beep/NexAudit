import { useState } from 'react'
import Login from './pages/loginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/layout/layout'




function App() {


  return (
    <BrowserRouter>


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={< ProtectedRoute />}>
          <Route element={< Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>


    </BrowserRouter>
  )
}

export default App
