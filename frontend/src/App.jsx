import { useState } from 'react'
import Login from './pages/loginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/layout/layout'




function App() {


  return (
    <BrowserRouter>
      <Layout>
      </Layout>

      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

      </Routes>


    </BrowserRouter>
  )
}

export default App
