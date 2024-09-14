import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './app.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
