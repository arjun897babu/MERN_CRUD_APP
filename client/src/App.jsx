
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/user/Home'
import Profile from './pages/user/Profile'
import Login from './pages/user/Login'
import SignUp from './pages/user/SignUp'
import Header from './components/user/Header'
import { ProtectedRoutes } from './pages/user/ProtectedRoutes'
import AdminLogin from './pages/admin/AdminLogin'
import AdminHome from './pages/admin/Home'
import EditUser from './pages/admin/EditUser'
import AddUser from './pages/admin/AddUser'
import AdminHeader from './components/admin/AdminHeader'

function App() {
  
  const AppHeader = () => {
    const location = useLocation(); // Accessing the current route location
    const isAdminPath = location.pathname.startsWith('/admin'); // Check if it's an admin path

    return isAdminPath ? <AdminHeader /> : <Header />;
  }


  return (
    <>
      <BrowserRouter >

        <AppHeader />

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

          <Route path='/adminLogin' element={<AdminLogin />} />
          {/* protected routes */}
          <Route path='/admin' element={<AdminHome />} />
          <Route path='/adminEditUser/:id' element={<EditUser />} />
          <Route path='/adminAddUser' element={<AddUser />} />
          {/* protected routes */}
          {/* ___________________________admin side______________________________ */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
