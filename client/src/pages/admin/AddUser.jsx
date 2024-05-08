import React, { useEffect, useReducer } from "react"
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../services/reactAPIServer.js'
import { useSelector } from "react-redux"
import * as validation from "../../utils/validationHelper.js"

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

function AddUser() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)
  const isAdminLoggedIn = useSelector((state) => state.user.isAdminAuth)

  //onChange event listener for input
  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({ type: 'set_filed', filed: name, value })

  }

  //for handling the form
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('/admin/addUser', state)
      if (response.status === 200) {
        alert('user added')
        navigate('/admin')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" uppercase mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           add new user
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
              className=" uppercase flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus:outline-none"
            >
              add user  
            </button>
          </form>
        
        </div>



      </div>
    </>
  )
}

export default AddUser