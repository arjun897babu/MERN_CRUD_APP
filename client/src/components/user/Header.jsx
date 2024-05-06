import axios from "../../services/reactAPIServer.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { setUserLogout } from "../../redux/authSlice";


const NavLink = ({ label, to, onAction }) => {
  return (
    <li className="uppercase text-sm p-2">
      <Link to={to} onClick={onAction}>{label}</Link>
    </li>
  )
}

function Header() {
  const isUserLoggedIn = useSelector((state) => state.user.isUserAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()

    try {

      const response = await axios.post('/user/logout');
      console.log('Logout successful:', response);
      dispatch(setUserLogout())
      alert('user logged out successfully')
      navigate('/')

    } catch (error) {
      console.log(`error in userlogout :${error.message}`)
    }
  }

  return (
    <>
      <header className="bg-teal-900  text-white">
        <div className="flex items-center justify-between mx-auto max-w-6xl p-3" >
          <h1 className="uppercase text-2xl">crud app</h1>
          <ul className='flex gap-3'>

            {isUserLoggedIn && (
              <>
                <NavLink label={'home'} to='/home' />
                {/* <NavLink label={'profile'} to='/profile' /> */}
                <NavLink label={'log out'} to='/' onAction={handleLogout} />
              </>
            )}

          </ul>
        </div>
      </header>
    </>
  )
}

export default Header