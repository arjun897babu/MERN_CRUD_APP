import React, { useEffect, useReducer } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../services/reactAPIServer.js'
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin } from "../../redux/authSlice.js";
import { validateEmail } from "../../utils/validationHelper.js";

// initial state for the form
const initialState = {
  email: '',
  password: '',
  error: {}
}

// reducer function for handling state changes
const reducer = (state, action) => {
  switch (action.type) {
    case 'set_filed':

      // Updates the specific field with the new value
      return { ...state, [action.filed]: action.value }
    case 'set_error':
      return { ...state, error: { ...state.error, [action.field]: action.message } }
    default:
      return state
  }
}

function LogIn() {

  const navigate = useNavigate()
  const [state, dispatchLocal] = useReducer(reducer, initialState)
  const dispatch = useDispatch()

  // accessing the user authentication status from the redux store
  const isUserLoggedIn = useSelector((state) => state.user.isUserAuth)

  useEffect(() => {

    // redirects to home page if user is already logged in
    if (isUserLoggedIn) navigate('/home')

  }, [isUserLoggedIn])

  const handleChange = (e) => {

    const { name, value } = e.target

    // update field values
    dispatchLocal({ type: 'set_filed', filed: name, value })

  }

  const updateError = (field, message) => {
    console.log('called')
    dispatchLocal({ type: 'set_error', field: field, message: message })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //clear error message for every submission
    updateError('email', '')
    updateError('password', '')
    try {

      const result = await axios.post('/user/login', state)
      if (result.status === 200) {

        const userData = result.data?.user;

        // update global state with user data
        dispatch(setUserLogin(userData));
        navigate('/home')
      }

    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 404) {
        updateError('email', error.response.data.message)
      }
      if (error.response && error.response.status === 401) {
        updateError('password', error.response.data.message)
      }
    }
    console.log(state)
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
              {state.error.email && <small className="text-red-600">{state.error.email}</small>}
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
              {state.error.password && <small className="text-red-600">{state.error.password}</small>}
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