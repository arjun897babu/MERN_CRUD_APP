import React from "react";

function Profile() {
  return (
    <>
      <div className="p-3 max-auto ">
        <h1 className="text-3xl font-semibold text-center my-7 uppercase">profile</h1>
        <form className="flex flex-col gap-4 items-center">
          <img src="https://t4.ftcdn.net/jpg/03/40/12/49/240_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg" alt="" className="w-32 h-32 mx-auto rounded-full aspect-square" />

          <input
            type='text'
            id='username'
            placeholder='Username'
            className='bg-slate-100 rounded-lg p-3 w-1/4 focus:outline-none'
            onChange={() => {}}
          />
          <input
            type='email'
            id='email'
            placeholder='Email'
            className='bg-slate-100 rounded-lg p-3 w-1/4 focus:outline-none'
            onChange={() => {}}
          />
          <button 
          className="bg-teal-900 p-2 hover:bg-teal-700 hover:border-black font-sem w-1/4  "
          type="button">update</button>
        </form>
      </div>
    </>
  )
}

export default Profile;
