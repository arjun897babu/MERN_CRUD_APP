import React from "react"
const usersData = [
  { _id: 1, name: 'John Doe', email: 'john@example.com', gender: 'Male', status: 'Active' },
  { _id: 2, name: 'Jane Doe', email: 'jane@example.com', gender: 'Female', status: 'Inactive' },
];

const AdminHome = () => {

  
  return (

    <>
      <main id="site-main" className="container mx-auto p-4">
        <div className="table-responsive">
          <table className="table-auto w-full mt-2">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">NO</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">@Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={user._id} className="bg-white border-b">
                  <td className="text-center p-3">{index + 1}</td>
                  <td className="text-center p-3">{user.name}</td>
                  <td className="text-center p-3">{user.email}</td>
              
                  <td className="text-center p-3 flex space-x-2">
                    <a href={`/update-user?id=${user._id}`} className="text-blue-500">
                      <i className="bi bi-pencil-square"></i>
                    </a>
                    <button onClick={''} className="text-red-500">
                      <i className="bi bi-trash"></i>
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