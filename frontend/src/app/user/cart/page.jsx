"use client"

import { useContext } from "react"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import useCartContext from "@/context/CartContext"

export default function CartPage() {
  const { cartItems, addItemToCart, removeItemFromCart, calculateTotalAmount } = useCartContext()

  const calculateTax = () => {
    return calculateTotalAmount() * 0.08 // 8% tax
  }

  const calculateTotal = () => {
    return calculateTotalAmount() + calculateTax() + 5.99 // Adding shipping cost
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      {/* Header */}
      <header className="bg-[#854d27] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Mitti Mahal
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-[#d4a373] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-[#854d27] mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-[#d4a373] mb-4" />
            <h2 className="text-2xl font-semibold text-[#854d27] mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link
              href="/"
              className="inline-block bg-[#854d27] text-white px-6 py-3 rounded-md hover:bg-[#6e3b1e] transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="hidden md:grid md:grid-cols-12 bg-[#e9e2d0] p-4 text-[#854d27] font-semibold">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 md:grid-cols-12 p-4 border-b border-gray-200 items-center hover:bg-[#f8f5f2] transition-colors duration-200"
                  >
                    {/* Product */}
                    <div className="col-span-6 flex items-center space-x-4 mb-4 md:mb-0">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-[#e9e2d0]">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-[#854d27]">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center text-gray-700 mb-4 md:mb-0">
                      <span className="md:hidden font-medium text-[#854d27] mr-2">Price:</span>${item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center mb-4 md:mb-0">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => removeItemFromCart(item._id)}
                          className="p-2 text-gray-600 hover:text-[#854d27] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 text-center w-12">{item.quantity}</span>
                        <button
                          onClick={() => addItemToCart(item)}
                          className="p-2 text-gray-600 hover:text-[#854d27] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-center text-gray-700 flex justify-between md:justify-center items-center">
                      <span className="md:hidden font-medium text-[#854d27] mr-2">Total:</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeItemFromCart(item._id)}
                        className="ml-4 text-red-500 hover:text-red-700 transition-colors md:absolute md:right-8"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-bold text-[#854d27] mb-6 pb-2 border-b border-gray-200">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{calculateTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>₹{calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₹5.99</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg text-[#854d27]">
                      <span>Total</span>
                      <span>₹{calculateTotal().toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Including VAT</p>
                  </div>
                </div>

                <Link href="\user\checkout" className="w-full mt-6 bg-[#854d27] text-white py-3 px-4 rounded-md hover:bg-[#6e3b1e] transition-colors duration-300 flex items-center justify-center">
                  Proceed to Checkout
                </Link>

                <div className="mt-6 text-center">
                  <Link href="/" className="text-[#854d27] hover:text-[#6e3b1e] text-sm font-medium">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#854d27] text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Mitti Mahal</h3>
            <p className="text-sm opacity-75">Handcrafted pottery for your home</p>
            <p className="text-xs mt-4 opacity-60">© {new Date().getFullYear()} Mitti Mahal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

