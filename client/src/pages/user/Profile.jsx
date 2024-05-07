import React, { useRef, useState } from "react"
import axios from '../../services/reactAPIServer.js'

function Profile() {
  const fileRef = useRef(null);
  const [imagePreview, setImagePreview] = useState('https://t4.ftcdn.net/jpg/03/40/12/49/240_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg');

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.put('/user/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const data = response.data

        if (data && data.filename) {
          setImagePreview()
        } else {
          console.error('File upload unsuccessful:', data.message);
        }

      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="p-3 max-auto ">
        <h1 className="text-3xl font-semibold text-center my-7 uppercase">profile</h1>
        <form className="flex flex-col gap-4 items-center">
          <input type="file"
            name="image"
            id="fileInput"
            ref={fileRef}
            hidden
            onChange={handleImageUpload}
          />
          <img
            className="w-32 h-32 mx-auto rounded-full aspect-square cursor-grabbing"
            src={imagePreview}
            alt="profile pic"
            onClick={() => fileRef.current.click()}
          />

          <input
            className='bg-slate-100 rounded-lg p-3 w-1/4 focus:outline-none'
            type='text'
            id='username'
            placeholder='Username'
            onChange={() => { }}
          />
          <input
            type='email'
            id='email'
            placeholder='Email'
            className='bg-slate-100 rounded-lg p-3 w-1/4 focus:outline-none'
            onChange={() => { }}
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
