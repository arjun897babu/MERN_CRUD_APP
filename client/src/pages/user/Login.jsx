import React, { useEffect, useReducer } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../services/reactAPIServer.js'
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin } from "../../redux/authSlice.js";

const initialState = {
  email: '',
  password: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_filed':
      return { ...state, [action.filed]: action.value }
    default:
      return state
  }
}

function LogIn() {
  const navigate = useNavigate()
  const [state, dispatchLocal] = useReducer(reducer, initialState)
  const dispatch = useDispatch()

  const isUserLoggedIn = useSelector((state) => state.user.isUserAuth)
 
  useEffect(() => {
    if (isUserLoggedIn) navigate('/home')
  }, [])

  const handleChange = (e) => {

    const { name, value } = e.target
    dispatchLocal({ type: 'set_filed', filed: name, value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const result = await axios.post('/user/login', state)
      if (result.status === 200) {
        const userData = result.data?.user;  
        dispatch(setUserLogin(userData)); 
        alert('user logged successfully')
        navigate('/home')
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log In
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm"
                value={state.email}
                onChange={handleChange}
              />

            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm"
                value={state.password}
                onChange={handleChange}
              />

            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-800 focus:outline-none"  >
              Log In
            </button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account ?{' '}
            <Link to='/signin' className="text-teal-600 hover:text-teal-800">
              Sign up
            </Link>
          </p>
        </div>



      </div>
    </>
  )
}

export default LogIn