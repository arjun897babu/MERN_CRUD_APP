import axios from "../../services/reactAPIServer.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { setAdminLogout } from "../../redux/adminSlice.js";


function AdminHeader() {

  // accessing user login status from Redux store
  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminAuth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()

    try {

      await axios.post('/admin/logout');

      // dispatching setAdminLogout action to update the Redux state
      dispatch(setAdminLogout())
      alert('adimin logged out successfully')
      navigate('/adminLogin')

    } catch (error) {
      console.log(`error in admin logout :${error.message}`)
    }
  }

  return (
    <>
      <header className="bg-blue-500  text-white">
        <div className="flex items-center justify-between mx-auto max-w-6xl p-3" >
          <h1 className="uppercase text-2xl">Admin</h1>


          {isAdminLoggedIn && (
            <ul className='flex gap-3'>
              <li className="uppercase   text-sm p-2 ">
                <Link to={'/admin'} >home</Link>
              </li>
              <li className="uppercase   text-sm p-2 ">
                <Link to={'/adminLogin'} onClick={handleLogout}>log out</Link>
              </li>
            </ul>
          )}


        </div>
      </header>
    </>
  )
}

export default AdminHeader