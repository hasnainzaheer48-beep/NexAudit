import { useContext, useState } from 'react'
import Login from './pages/loginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/routes/ProtectedRoute'
import Layout from './components/layout/layout'
import RoleRoute from './components/routes/RoleRoute'
import ActivityLogs from './pages/activityLogs'
import Tasks from './pages/tasks'
import Audits from './pages/audits'
import AuditTemplates from './pages/auditTemplates'
import AuditDetails from './pages/auditDetails'
import TemplateTasks from './pages/templateTasks'
import Clients from './pages/clients'
import Users from './pages/users'
import Modal from './components/ui/Modal'
import TasksByAuditor from './pages/tasksByAuditor'
import TaskDetails from './pages/taskDetails'
import AuditsByManager from './pages/auditsByManger'
import TasksByManager from './pages/tasksByManager'
import { AuthContext } from './context/AuthContext'
import LoadingScreen from './components/ui/loadingScreen'




function App() {

  const { loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />
  }


  return (
    <BrowserRouter>


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={< ProtectedRoute />}>
          <Route element={< Layout />}>
            <Route element={<RoleRoute roles={["ADMIN", "MANAGER", "AUDITOR"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/task-details/:taskId" element={<TaskDetails />} />
            </Route>
            <Route element={<RoleRoute roles={["ADMIN", "MANAGER"]} />}>
              {/* FOR ADMIN AND MANAGAER PATHS */}
              <Route path="/activity-logs" element={<ActivityLogs />} />
              <Route path="/audits" element={<Audits />} />
              <Route path="/audit-templates" element={<AuditTemplates />} />
              <Route path="/template-tasks" element={<TemplateTasks />} />
              <Route path="/Clients" element={<Clients />} />
              <Route path="/audit-templates/:templateId/tasks" element={<TemplateTasks />} />
              <Route path='/audits/audit-details/:auditId' element={<AuditDetails />} />
            </Route>
            <Route element={<RoleRoute roles={["ADMIN"]} />}>
              {/* FOR ADMIN PATHS */}
              <Route path='/users' element={< Users />} />
            </Route >
            {/* FOR AUDITOR PATHS */}
            <Route element={<RoleRoute roles={["AUDITOR"]} />}>
              <Route path='/tasks/me' element={<TasksByAuditor />} />

            </Route>
            {/* FOR MANAGER PATHS */}
            <Route element={<RoleRoute roles={["MANAGER"]} />}>
              <Route path='/audits/me' element={<AuditsByManager />} />
              <Route path='/tasks/me/manager' element={<TasksByManager />} />
            </Route>
          </Route>
        </Route>
      </Routes >


    </BrowserRouter >

  )
}

export default App
