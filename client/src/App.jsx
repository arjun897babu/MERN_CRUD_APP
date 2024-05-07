
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/user/Home'
import Profile from './pages/user/Profile'
import Login from './pages/user/Login'
import SignUp from './pages/user/SignUp'
import Header from './components/user/Header'
import { ProtectedRoutes } from './pages/user/ProtectedRoutes'

function App() {


  return (
    <>
      <BrowserRouter >

        <Header />

        <Routes>
          {/* ___________________________user side______________________________ */}

          <Route path='/' element={<Login />} />
          <Route path='/signin' element={<SignUp />} />

          {/* protected routes */}
          <Route
            path='/home'
            element={
              <ProtectedRoutes >
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/profile/:id'
            element={
              <ProtectedRoutes >
                <Profile />
              </ProtectedRoutes>}
          />
          {/* protected routes */}
      {/* ___________________________user side______________________________ */}


      {/* ___________________________admin side______________________________ */}


      {/* ___________________________admin side______________________________ */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
