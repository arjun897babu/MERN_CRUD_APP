import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Home() {
  const user = useSelector((state) => state.user.userDetails)

  return (
    <>
      <div className="absolute w-full h-screen flex items-center justify-center bg-gradient-to-r from-teal-800 to-green-800 ">
        <div className=" text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-3xl pb-4 font-black">Welcome to CRUD App </h1>
          <Link to={`/profile/${user?.id}`} >
            <button className="bg-black text-white font-bold p-2" >Go to Profile</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home


