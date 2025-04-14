// import React from 'react';

// const ManageOrderPage = () => {
//     return (
//         <div>
//             <h1>Manage Orders</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Order ID</th>
//                         <th>Customer Name</th>
//                         <th>Order Date</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {/* Example row */}
//                     <tr>
//                         <td>12345</td>
//                         <td>John Doe</td>
//                         <td>2023-10-01</td>
//                         <td>Pending</td>
//                         <td>
//                             <button>View</button>
//                             <button>Edit</button>
//                             <button>Delete</button>
//                         </td>
//                     </tr>
//                     {/* Add more rows as needed */}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ManageOrderPage;

"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Eye, Truck, CheckCircle, Clock, XCircle } from "lucide-react"

// Sample order data
const orders = [
  {
    id: "#ORD-1234",
    customer: "Rahul Sharma",
    date: "Jan 12, 2023",
    status: "delivered",
    total: "₹2,499.00",
    items: 3,
    payment: "Completed",
  },
  {
    id: "#ORD-1235",
    customer: "Priya Patel",
    date: "Jan 15, 2023",
    status: "processing",
    total: "₹1,299.00",
    items: 2,
    payment: "Completed",
  },
  {
    id: "#ORD-1236",
    customer: "Amit Kumar",
    date: "Jan 18, 2023",
    status: "shipped",
    total: "₹3,599.00",
    items: 4,
    payment: "Completed",
  },
  {
    id: "#ORD-1237",
    customer: "Neha Singh",
    date: "Jan 20, 2023",
    status: "cancelled",
    total: "₹899.00",
    items: 1,
    payment: "Refunded",
  },
  {
    id: "#ORD-1238",
    customer: "Vikram Joshi",
    date: "Jan 22, 2023",
    status: "pending",
    total: "₹4,999.00",
    items: 5,
    payment: "Pending",
  },
]

export default function ManageOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [openDropdown, setOpenDropdown] = useState(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && order.status === activeTab
  })

  const viewOrderDetails = (order) => {
    setSelectedOrder(order)
    setOpenDialog(true)
  }

  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(id)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      case "shipped":
        return <Truck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Orders</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage all orders from Mitti Mahal</p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-lg font-semibold">All Orders</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                type="search"
                placeholder="Search orders..."
                className="rounded-md border border-gray-300 pl-8 py-1.5 w-full md:w-[250px] dark:border-gray-600 dark:bg-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap -mb-px">
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "all"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Orders
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "pending"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pending
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "processing"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("processing")}
              >
                Processing
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "shipped"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("shipped")}
              >
                Shipped
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "delivered"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("delivered")}
              >
                Delivered
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "cancelled"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("cancelled")}
              >
                Cancelled
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Items</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Total</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Payment</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                    <td className="px-4 py-3 text-sm">{order.customer}</td>
                    <td className="px-4 py-3 text-sm">{order.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{order.items}</td>
                    <td className="px-4 py-3 text-sm">{order.total}</td>
                    <td className="px-4 py-3 text-sm">{order.payment}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(order.id)}
                          className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </button>
                        {openDropdown === order.id && (
                          <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
                            <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                              Actions
                            </div>
                            <hr className="my-1 border-gray-200 dark:border-gray-700" />
                            <button
                              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                              onClick={() => {
                                viewOrderDetails(order)
                                toggleDropdown(order.id)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                              <Truck className="mr-2 h-4 w-4" />
                              Update status
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700">
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel order
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedOrder && openDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-[600px] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Order Details - {selectedOrder.id}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Placed on {selectedOrder.date} by {selectedOrder.customer}
              </p>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Shipping Information</h3>
                  <p className="text-sm">
                    {selectedOrder.customer}
                    <br />
                    123 Main Street
                    <br />
                    Apartment 4B
                    <br />
                    New Delhi, 110001
                    <br />
                    India
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadgeClass(selectedOrder.status)}`}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment:</span>
                      <span>{selectedOrder.payment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Items:</span>
                      <span>{selectedOrder.items}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span>{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Order Items</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                        Product
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                        Quantity
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(selectedOrder.items)].map((_, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-sm">Sample Product {index + 1}</td>
                        <td className="px-4 py-3 text-sm">1</td>
                        <td className="px-4 py-3 text-sm text-right">₹{(499 * (index + 1)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setOpenDialog(false)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

