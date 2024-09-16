import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import './app.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import CodeEditor from './pages/CodeEditor'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectToHome from './components/RedirectToHome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <RedirectToHome>
              <SignUp />
            </RedirectToHome>
          }
        />
        <Route
          path="/sign-in"
          element={
            <RedirectToHome>
              <SignIn />
            </RedirectToHome>
          }
        />

        <Route path='/editor/:project_id' element={<ProtectedRoute><CodeEditor /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
