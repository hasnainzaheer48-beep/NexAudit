import { useState } from 'react'
import Login from './pages/loginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/layout/layout'
import RoleRoute from './components/RoleRoute'




function App() {


  return (
    <BrowserRouter>


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={< ProtectedRoute />}>
          <Route element={< Layout />}>
            <Route element={<RoleRoute roles={["ADMIN", "MANAGER", "AUDITOR"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<RoleRoute roles={["ADMIN", "MANAGER"]} />}>
              {/* FOR ADMIN AND MANAGAER PATHS */}
            </Route>
            <Route element={<RoleRoute roles={["ADMIN"]} />}>
              {/* FOR ADMIN PATHS */}
            </Route>
          </Route>
        </Route>
      </Routes >


    </BrowserRouter >
  )
}

export default App
