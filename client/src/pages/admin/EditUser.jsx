import React, { useEffect, useReducer, useRef, useState } from "react"
import axios from '../../services/reactAPIServer.js'
import { useParams } from "react-router-dom";
import { validateEmail,validateName } from "../../utils/validationHelper.js";

function EditUser() {
  const [data, setData] = useState({}); //state for user data
  const fileRef = useRef(null);
  const { id } = useParams();

  //function for uploading profile picture
  const handleImageUpload = async (event) => {

    event.preventDefault();
    const file = event.target.files[0];

    if (file) {

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios
          .put(`/admin/upload/${id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );

        const responseData = response.data;

        if (responseData && responseData.imagePath) {
          setData((prevData) => (
            {
              ...prevData,
              image: responseData.imagePath
            }
          )
          );

          alert('Upload successful');

        }
        else console.error('File upload unsuccessfull:', responseData.message);

      } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed: ' + error.message);
      }
    }
  };

  //function for getting user details
  const fetchUserDetails = async () => {

    try {
      const result = await axios.get(`/admin/getSingleUser/${id}`);

      const { data } = result;

      if (data && data.userDetails) setData(data.userDetails);

    } catch (error) {
      console.log(`Error fetching user details: ${error.message}`); 
    }
  };

  //event handler for inputfiled 
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => (
      {
        ...prevData,
        [name]: value
      }
    ));

  }
  
  useEffect(() => {
      fetchUserDetails();
  }, [ id]); 
  

  //function for updating the user details
  const handleUpdation = async (e) => {

    e.preventDefault();

    const { name, email } = data

    try {

      const result = await axios.put(`/admin/updateUser/${id}`, { name, email });
      console.log(result)
    } catch (error) {
      if (error.response && error.response.status === 409) {
        updateError('email',error.response.data.message)
      }
      console.log(`Error while updating the details: ${error.message}`);
    }
  }

  return (
    <>
      <div className="p-3 max-auto">
        <h1 className="text-3xl font-semibold text-center my-7 uppercase">Profile</h1>
        <form className="flex flex-col gap-4 items-center" onSubmit={handleUpdation}>
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
            name="name"
            id='username'
            value={data?.name || ''}
            onChange={handleChange}
          />
          <input
            type='email'
            id='email'
            name="email"
            value={data?.email || ''}
            className='bg-slate-100 rounded-lg p-3 w-1/4 focus:outline-none'
            onChange={handleChange}
          />
          <button
            className="bg-blue-500 p-2 hover:bg-blue-700 hover:border-black font-sem w-1/4"
            type="submit">Update</button>
        </form>
      </div>
    </>
  )
}

export default EditUser;
