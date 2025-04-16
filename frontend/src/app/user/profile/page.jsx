"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Camera, Edit, Heart, LogOut, Package, Settings, ShoppingBag, User } from "lucide-react"

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-800">Mitti Mahal</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100">
              <ShoppingBag className="h-6 w-6 text-gray-600" />
            </Link>
            <Link href="/wishlist" className="p-2 rounded-full hover:bg-gray-100">
              <Heart className="h-6 w-6 text-gray-600" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex gap-8">
          {/* Profile Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              <div className="relative h-32 bg-gradient-to-r from-amber-500 to-amber-700">
                <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="px-4 py-5 sm:px-6 -mt-16 flex flex-col items-center">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="User profile"
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-white bg-white object-cover"
                  />
                  <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-bold">Rahul Sharma</h2>
                <p className="text-sm text-gray-500">rahul.sharma@example.com</p>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
              </div>
            </div>

            <nav className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "orders" ? "bg-amber-50 text-amber-800" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Package className="mr-3 h-5 w-5" />
                      My Orders
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "profile" ? "bg-amber-50 text-amber-800" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <User className="mr-3 h-5 w-5" />
                      Profile Information
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "settings" ? "bg-amber-50 text-amber-800" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      Account Settings
                    </button>
                  </li>
                  <li>
                    <button className="w-full flex items-center px-4 py-2 text-sm rounded-md text-red-600 hover:bg-red-50">
                      <LogOut className="mr-3 h-5 w-5" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 mt-6 md:mt-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {activeTab === "orders" && (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">My Orders</h3>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((order) => (
                      <div key={order} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-medium">Order #{order}23456</p>
                            <p className="text-sm text-gray-500">Placed on {new Date().toLocaleDateString()}</p>
                          </div>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Delivered</span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Image
                              src="/placeholder.svg?height=64&width=64"
                              alt="Product"
                              width={64}
                              height={64}
                              className="rounded-md"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">Handcrafted Clay Pot</p>
                            <p className="text-sm text-gray-500">Quantity: 1</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹1,299</p>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <button className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-md hover:bg-amber-100">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "profile" && (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            defaultValue="Rahul"
                            className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            defaultValue="Sharma"
                            className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue="rahul.sharma@example.com"
                            className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone number
                        </label>
                        <div className="mt-1">
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            defaultValue="+91 98765 43210"
                            className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Password</h4>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Update your password regularly to keep your account secure.
                        </p>
                        <button className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-md hover:bg-amber-100">
                          Change Password
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900">Notifications</h4>
                      <div className="mt-2">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="email-notifications"
                              name="email-notifications"
                              type="checkbox"
                              defaultChecked
                              className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email-notifications" className="font-medium text-gray-700">
                              Email notifications
                            </label>
                            <p className="text-gray-500">Get emails about your orders and account activity.</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="sms-notifications"
                              name="sms-notifications"
                              type="checkbox"
                              defaultChecked
                              className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="sms-notifications" className="font-medium text-gray-700">
                              SMS notifications
                            </label>
                            <p className="text-gray-500">Receive text messages for order updates.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900">Delete Account</h4>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <div className="mt-4">
                          <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

