import React from "react";
import { Link } from 'react-router-dom'

function Header() {

  return (
    <>
      <header className="bg-red-300 ">
        <div className="flex items-center justify-between mx-auto max-w-6xl p-3" >
          <h1 className="uppercase text-2xl">crud app</h1>
          <ul className='flex gap-3'>
            <Link to='/' >
              <li className="capitalize text-xl p-2">Home</li>
            </Link>
            <Link to='/profile' >
              <li className="capitalize text-xl p-2">about</li>
            </Link>
            <Link to='/signin' >
              <li className="capitalize text-xl p-2">sign in</li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  )
}

export default Header