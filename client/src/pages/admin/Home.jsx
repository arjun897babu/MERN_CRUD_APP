import React, { useEffect, useState } from "react"
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GiFastBackwardButton } from "react-icons/gi";
import axios from "../../services/reactAPIServer";
import { useDispatch } from "react-redux";
import { setAdminLogout } from "../../redux/adminSlice";
import { toastMessage } from "../../utils/sweetalert";



const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchUsers = async () => {
    try {
      const result = await axios.get('/admin/allUser');
      const { data } = result;
      if (data && data.users) setUsers(data.users);
    } catch (error) {
      console.log(`error in fetching user details :${error.message}`)
      if (error.response && error.response.status === 401) {
        dispatch(setAdminLogout())
        navigate('/adminLogin')
      }
    }
  }
  useEffect(() => {
    fetchUsers()
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  const handleDelete = async (e, userId) => {
    e.preventDefault();
    
    if (!confirm('Delete user?')) {
      return;
    }

    try {
      const result = await axios.delete(`/admin/delete/${userId}`);
      if (result.status === 200) {
        setTimeout(() => {
          toastMessage('success','removed user successfully')
        }, 200);
        fetchUsers();
      } else {
        toastMessage('error','Failed to delete the user')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(setAdminLogout())
        navigate('/adminLogin')
      }
      toastMessage('error',error.message)
    }
  }


  // filter based on search input
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );


  return (

    <>
      <main id="" className="p-4">
        <div className="  bg-gray-100 py-4">
          <div className=" p-2 mx-auto flex justify-between">
            <input className="w-1/4 placeholder:p-2 focus:outline-none" type="text" name="search" id="" placeholder="search" onChange={handleSearchChange} />
            <Link to="/adminAddUser" className="mr-2">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Add user +
              </button>
            </Link>
          </div>
        </div>

        <div className="">
          <table className="table-auto w-full mt-2">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">NO</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">@Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="bg-white border-b">
                  <td className="text-center p-3">{index + 1}</td>
                  <td className="text-center p-3">{user.name}</td>
                  <td className="text-center p-3">{user.email}</td>
                  <td className="justify-center p-3 flex space-x-6">
                    <Link to={`/adminEditUser/${user._id}`} className="hover:bg-blue-500 p-2">
                      <FaPencil size={22} />
                    </Link>
                    <button onClick={(e) => handleDelete(e, user._id)} className="hover:bg-red-500 p-1">
                      <MdDelete size={25} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default AdminHome