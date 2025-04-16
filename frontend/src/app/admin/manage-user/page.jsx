"use client"

import { useEffect, useState } from "react"
import { Search, MoreHorizontal, UserPlus, User } from "lucide-react"
import axios from "axios"

// Sample user data
// const users = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     email: "rahul@example.com",
//     status: "active",
//     role: "Customer",
//     orders: 12,
//     joined: "Jan 12, 2023",
//   },
//   {
//     id: 2,
//     name: "Priya Patel",
//     email: "priya@example.com",
//     status: "active",
//     role: "Customer",
//     orders: 8,
//     joined: "Feb 23, 2023",
//   },
//   {
//     id: 3,
//     name: "Amit Kumar",
//     email: "amit@example.com",
//     status: "inactive",
//     role: "Customer",
//     orders: 3,
//     joined: "Mar 15, 2023",
//   },
//   {
//     id: 4,
//     name: "Neha Singh",
//     email: "neha@example.com",
//     status: "active",
//     role: "Admin",
//     orders: 0,
//     joined: "Apr 5, 2023",
//   },
//   {
//     id: 5,
//     name: "Vikram Joshi",
//     email: "vikram@example.com",
//     status: "active",
//     role: "Customer",
//     orders: 15,
//     joined: "May 18, 2023",
//   },
// ]

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [user, setUser] = useState([]);
  
    const fetchUserData = () => {
      axios.get('http://localhost:5000/user/getall')
        .then((result) => {
          console.log(result.data);
          setUser(result.data);
  
        }).catch((err) => {
          console.log(err);
  
        });
    }
  
    useEffect(() => {
      fetchUserData();
    }, [])


  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/user/delete/${id}`)
      .then((result) => {
        console.log(result.data);
        fetchUserData(); // Refresh the user data after deletion
      }).catch((err) => {
        console.log(err);
      });
  }



  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  // )

  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(id)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage all users of Mitti Mahal</p>
        </div>
        <button
          onClick={() => setOpenDialog(true)}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-lg font-semibold">All Users</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="search"
                  placeholder="Search users..."
                  className="rounded-md border border-gray-300 pl-8 py-1.5 w-full md:w-[250px] dark:border-gray-600 dark:bg-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="rounded-md border border-gray-300 py-1.5 px-3 pr-8 appearance-none bg-white dark:border-gray-600 dark:bg-gray-800 w-[120px]"
                  defaultValue="all"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="admin">Admins</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Email</th>
                  {/* <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Role</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Orders</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Joined</th> */}
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {user.map((users,index) => (
                  <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-sm font-medium">{users.name}</td>
                    <td className="px-4 py-3 text-sm">{users.email}</td>
                    <td>
                      <button className="bg-red-500 rounded px-4 py-2" onClick={() => deleteUser(users._id)}>Delete</button>
                    </td>
                    {/* <td className="px-4 py-3 text-sm">{user.role}</td> */}
                    {/* <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.orders}</td>
                    <td className="px-4 py-3 text-sm">{user.joined}</td> */}
                    {/* <td className="px-4 py-3 text-sm text-right">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(user.id)}
                          className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </button>
                        {openDropdown === user.id && (
                          <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
                            <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                              Actions
                            </div>
                            <hr className="my-1 border-gray-200 dark:border-gray-700" />
                            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                              View details
                            </button>
                            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                              Edit user
                            </button>
                            <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700">
                              Delete user
                            </button>
                          </div>
                        )}
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Add New User</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new user account for Mitti Mahal.</p>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  placeholder="Enter full name"
                  className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <div className="relative">
                  <select
                    id="role"
                    className="w-full rounded-md border border-gray-300 py-2 px-3 pr-8 appearance-none bg-white dark:border-gray-600 dark:bg-gray-800"
                    defaultValue="customer"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpenDialog(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

