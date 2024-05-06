import React, { useReducer } from "react"
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../services/reactAPIServer.js'

const initialState = {
  name: '',
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

function SignUp() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)

  //onChange event listener for input
  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({ type: 'set_filed', filed: name, value })
    
  }

  //for handling the form
  const handleSubmit =async (e) => {
   
    e.preventDefault()
    console.log(state)
    try {
      const response = await axios.post('/user/signUp', state)
      
      if(response.status===200) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm"
                value={state.name}
                onChange={handleChange}
              />
            </div>
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
              className="flex w-full justify-center rounded-md bg-teal-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-800 focus:outline-none"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to='/' className="text-teal-600 hover:text-teal-800">
              Log in
            </Link>
          </p>
        </div>



      </div>
    </>
  )
}

export default SignUp