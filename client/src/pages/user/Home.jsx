import React from "react";
import { Link } from "react-router-dom";


function Home() {
  return (
    <>
      <div class="absolute w-full h-screen flex items-center justify-center bg-gradient-to-r from-teal-800 to-green-800 ">
        <div className=" text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-3xl font-black">Welcome to CRUD App </h1>
          <h4 className="m-2">current_username</h4>
          <Link to='/profile' > 
           <button class="bg-black text-white font-bold p-2  " onclick="location.href='/profile'">Go to Profile</button>
          </Link>
        </div>  
      </div>
    </>
  )
}

export default Home


