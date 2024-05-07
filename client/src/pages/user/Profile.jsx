import React, { useEffect, useRef, useState } from "react"
import axios from '../../services/reactAPIServer.js'
import { useParams } from "react-router-dom";

function Profile() {
  const [data, setData] = useState({});
  const fileRef = useRef(null);
  const { id } = useParams();

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.put(`/user/upload/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const responseData = response.data;

        if (responseData && responseData.filename) {
          setData(prevData => ({ ...prevData, image: responseData.filename }));
          alert('Upload successful');
        } else {
          console.error('File upload unsuccessful:', responseData.message);
        }
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed: ' + error.message);
      }
    }
  };

  const fetchUserDetails = async () => {
    try {
      const result = await axios.get(`/user/getSingleUser/${id}`);
      const { data } = result;
      if (data && data.userDetails) {
        setData(data.userDetails);
      }
    } catch (error) {
      console.log(`Error fetching user details: ${error.message}`);
      alert(`Error fetching user details: ${error.message}`);
    }
  };
  console.log(data)
  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  return (
    <>
      <div className="p-3 max-auto">
        <h1 className="text-3xl font-semibold text-center my-7 uppercase">Profile</h1>
        <form className="flex flex-col gap-4 items-center">
          <input type="file"
            name="image"
            id="fileInput"
            ref={fileRef}
            hidden
            onChange={handleImageUpload}
          />
          <img
            className="w-32 h-32 mx-auto rounded-full aspect-square cursor-pointer"
            src={data?.image ?? 'https://t4.ftcdn.net/jpg/03/40/12/49/240_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg'}
            alt="Profile"
            onClick={() => fileRef.current.click()}
          />

          <input
            className='bg-slate-100 rounded-lg p-3 w-1/4 focus:outline-none'
            type='text'
            id='username'
            value={data?.name || ''}
            readOnly
          />
          <input
            type='email'
            id='email'
            value={data?.email || ''}
            className='bg-slate-100 rounded-lg p-3 w-1/4 focus:outline-none'
            readOnly
          />
          <button
            className="bg-teal-900 p-2 hover:bg-teal-700 hover:border-black font-sem w-1/4"
            type="button">Update</button>
        </form>
      </div>
    </>
  )
}

export default Profile;
