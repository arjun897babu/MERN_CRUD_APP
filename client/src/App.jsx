import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/user/Home'
import Profile from './pages/user/Profile'
import Login from './pages/user/Login'
import SignUp from './pages/user/SignUp'
import Header from './components/user/Header'

function App() {


  return (
    <>
      <BrowserRouter >
       
        <Header />
       
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/signin' element={<SignUp />} />
          <Route path='/' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
