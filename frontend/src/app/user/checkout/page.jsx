"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, CreditCard, Info, Package, ShoppingCart, Truck } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import useCartContext from "@/context/CartContext"

// Mock cart items data
// const cartItems = [
//   {
//     id: 1,
//     name: "Terracotta Planter",
//     description: "Handcrafted terracotta planter with natural finish",
//     price: 24.99,
//     quantity: 1,
//     image: "/placeholder.svg?height=80&width=80",
//   },
//   {
//     id: 2,
//     name: "Clay Water Pot",
//     description: "Traditional clay water pot for natural cooling",
//     price: 34.99,
//     quantity: 2,
//     image: "/placeholder.svg?height=80&width=80",
//   },
//   {
//     id: 3,
//     name: "Ceramic Dinner Set",
//     description: "6-piece handmade ceramic dinner set",
//     price: 89.99,
//     quantity: 1,
//     image: "/placeholder.svg?height=80&width=80",
//   },
// ]

// Shipping options
const shippingOptions = [
  { id: "standard", name: "Standard Shipping", price: 5.99, days: "5-7 business days" },
  { id: "express", name: "Express Shipping", price: 12.99, days: "2-3 business days" },
  { id: "overnight", name: "Overnight Shipping", price: 24.99, days: "Next business day" },
]

// Validation schemas
const ShippingSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("ZIP code is required"),
  country: Yup.string().required("Country is required"),
  shippingMethod: Yup.string().required("Please select a shipping method"),
})

const PaymentSchema = Yup.object().shape({
  paymentMethod: Yup.string().required("Please select a payment method"),
  cardNumber: Yup.string().when("paymentMethod", {
    is: "credit-card",
    then: (schema) => schema.required("Card number is required"),
    otherwise: (schema) => schema,
  }),
  cardName: Yup.string().when("paymentMethod", {
    is: "credit-card",
    then: (schema) => schema.required("Name on card is required"),
    otherwise: (schema) => schema,
  }),
  expiryDate: Yup.string().when("paymentMethod", {
    is: "credit-card",
    then: (schema) => schema.required("Expiry date is required"),
    otherwise: (schema) => schema,
  }),
  cvv: Yup.string().when("paymentMethod", {
    is: "credit-card",
    then: (schema) => schema.required("CVV is required"),
    otherwise: (schema) => schema,
  }),
})

export default function CheckoutPage() {
  // State for checkout steps
  const { cartItems, addItemToCart, removeItemFromCart, calculateTotalAmount } = useCartContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    shippingMethod: "standard",

    // Payment info
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  // Calculate order summary
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getShippingCost = () => {
    const selectedShipping = shippingOptions.find((option) => option.id === formData.shippingMethod)
    return selectedShipping ? selectedShipping.price : 0
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.08 // 8% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + getShippingCost()
  }

  // Handle form submissions
  const handleShippingSubmit = (values) => {
    setFormData({ ...formData, ...values })
    setCurrentStep(2)
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (values) => {
    setFormData({ ...formData, ...values })
    setCurrentStep(3)
    window.scrollTo(0, 0)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    setCurrentStep(4)
    window.scrollTo(0, 0)
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
        <h1 className="text-3xl font-bold text-[#854d27] mb-8">Checkout</h1>

        {/* Checkout Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-[#854d27] text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {currentStep > 1 ? <Check className="h-5 w-5" /> : 1}
              </div>
              <span className="text-sm mt-2 text-center">Shipping</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div className="h-full bg-[#854d27]" style={{ width: currentStep > 1 ? "100%" : "0%" }}></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-[#854d27] text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {currentStep > 2 ? <Check className="h-5 w-5" /> : 2}
              </div>
              <span className="text-sm mt-2 text-center">Payment</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div className="h-full bg-[#854d27]" style={{ width: currentStep > 2 ? "100%" : "0%" }}></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-[#854d27] text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {currentStep > 3 ? <Check className="h-5 w-5" /> : 3}
              </div>
              <span className="text-sm mt-2 text-center">Review</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div className="h-full bg-[#854d27]" style={{ width: currentStep > 3 ? "100%" : "0%" }}></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 4 ? "bg-[#854d27] text-white" : "bg-gray-200 text-gray-500"}`}
              >
                4
              </div>
              <span className="text-sm mt-2 text-center">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#854d27] mb-6">Shipping Information</h2>
                <Formik
                  initialValues={{
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                    shippingMethod: formData.shippingMethod,
                  }}
                  validationSchema={ShippingSchema}
                  onSubmit={handleShippingSubmit}
                >
                  {({ errors, touched, setFieldValue, values }) => (
                    <Form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name*
                          </label>
                          <Field
                            type="text"
                            id="firstName"
                            name="firstName"
                            className={`w-full p-2 border ${errors.firstName && touched.firstName ? "border-red-500" : "border-gray-300"} rounded-md`}
                          />
                          <ErrorMessage name="firstName" component="p" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name*
                          </label>
                          <Field
                            type="text"
                            id="lastName"
                            name="lastName"
                            className={`w-full p-2 border ${errors.lastName && touched.lastName ? "border-red-500" : "border-gray-300"} rounded-md`}
                          />
                          <ErrorMessage name="lastName" component="p" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address*
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className={`w-full p-2 border ${errors.email && touched.email ? "border-red-500" : "border-gray-300"} rounded-md`}
                          />
                          <ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number*
                          </label>
                          <Field
                            type="tel"
                            id="phone"
                            name="phone"
                            className={`w-full p-2 border ${errors.phone && touched.phone ? "border-red-500" : "border-gray-300"} rounded-md`}
                          />
                          <ErrorMessage name="phone" component="p" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address*
                        </label>
                        <Field
                          type="text"
                          id="address"
                          name="address"
                          className={`w-full p-2 border ${errors.address && touched.address ? "border-red-500" : "border-gray-300"} rounded-md`}
                        />
                        <ErrorMessage name="address" component="p" className="text-red-500 text-xs mt-1" />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="col-span-2">
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City*
                          </label>
                          <Field
                            type="text"
                            id="city"
                            name="city"
                            className={`w-full p-2 border ${errors.city && touched.city ? "border-red-500" : "border-gray-300"} rounded-md`}
                          />
                          <ErrorMessage name="city" component="p" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State*
                          </label>
                          <Field
                            type="text"
                            id="state"
                            name="state"
                            className={`w-full p-2 border ${errors.state && touched.state ? "border-red-500" : "border-gray-300"} rounded-md`}
                          />
                          <ErrorMessage name="state" component="p" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code*
                          </label>
                          <Field
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            className={`w-full p-2 border ${errors.zipCode && touched.zipCode ? "border-red-500" : "border-gray-300"} rounded-md`}
                          />
                          <ErrorMessage name="zipCode" component="p" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country*
                        </label>
                        <Field
                          as="select"
                          id="country"
                          name="country"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="India">India</option>
                        </Field>
                        <ErrorMessage name="country" component="p" className="text-red-500 text-xs mt-1" />
                      </div>

                      <h3 className="text-lg font-semibold text-[#854d27] mb-4">Shipping Method</h3>
                      <div className="space-y-3 mb-6">
                        {shippingOptions.map((option) => (
                          <label
                            key={option.id}
                            className={`flex items-start p-3 border rounded-md cursor-pointer ${values.shippingMethod === option.id ? "border-[#854d27] bg-[#f8f5f2]" : "border-gray-300"}`}
                          >
                            <Field
                              type="radio"
                              name="shippingMethod"
                              value={option.id}
                              className="mt-1 mr-3"
                              onChange={() => setFieldValue("shippingMethod", option.id)}
                            />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="font-medium">{option.name}</span>
                                <span className="font-medium">${option.price.toFixed(2)}</span>
                              </div>
                              <p className="text-sm text-gray-500">{option.days}</p>
                            </div>
                          </label>
                        ))}
                        <ErrorMessage name="shippingMethod" component="p" className="text-red-500 text-xs mt-1" />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-[#854d27] text-white py-3 px-6 rounded-md hover:bg-[#6e3b1e] transition-colors duration-300"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#854d27] mb-6">Payment Information</h2>
                <Formik
                  initialValues={{
                    paymentMethod: formData.paymentMethod,
                    cardNumber: formData.cardNumber,
                    cardName: formData.cardName,
                    expiryDate: formData.expiryDate,
                    cvv: formData.cvv,
                  }}
                  validationSchema={PaymentSchema}
                  onSubmit={handlePaymentSubmit}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-3">Payment Method</h3>
                        <div className="space-y-3">
                          <label
                            className={`flex items-center p-3 border rounded-md cursor-pointer ${values.paymentMethod === "credit-card" ? "border-[#854d27] bg-[#f8f5f2]" : "border-gray-300"}`}
                          >
                            <Field
                              type="radio"
                              name="paymentMethod"
                              value="credit-card"
                              className="mr-3"
                              onChange={() => setFieldValue("paymentMethod", "credit-card")}
                            />
                            <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                            <span>Credit / Debit Card</span>
                          </label>
                          <label
                            className={`flex items-center p-3 border rounded-md cursor-pointer ${values.paymentMethod === "paypal" ? "border-[#854d27] bg-[#f8f5f2]" : "border-gray-300"}`}
                          >
                            <Field
                              type="radio"
                              name="paymentMethod"
                              value="paypal"
                              className="mr-3"
                              onChange={() => setFieldValue("paymentMethod", "paypal")}
                            />
                            <span className="font-semibold text-blue-600">Pay</span>
                            <span className="font-semibold text-blue-800">Pal</span>
                          </label>
                          <ErrorMessage name="paymentMethod" component="p" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      {values.paymentMethod === "credit-card" && (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number*
                            </label>
                            <Field
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className={`w-full p-2 border ${errors.cardNumber && touched.cardNumber ? "border-red-500" : "border-gray-300"} rounded-md`}
                            />
                            <ErrorMessage name="cardNumber" component="p" className="text-red-500 text-xs mt-1" />
                          </div>
                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                              Name on Card*
                            </label>
                            <Field
                              type="text"
                              id="cardName"
                              name="cardName"
                              className={`w-full p-2 border ${errors.cardName && touched.cardName ? "border-red-500" : "border-gray-300"} rounded-md`}
                            />
                            <ErrorMessage name="cardName" component="p" className="text-red-500 text-xs mt-1" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date*
                              </label>
                              <Field
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                placeholder="MM/YY"
                                className={`w-full p-2 border ${errors.expiryDate && touched.expiryDate ? "border-red-500" : "border-gray-300"} rounded-md`}
                              />
                              <ErrorMessage name="expiryDate" component="p" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV*
                              </label>
                              <Field
                                type="text"
                                id="cvv"
                                name="cvv"
                                placeholder="123"
                                className={`w-full p-2 border ${errors.cvv && touched.cvv ? "border-red-500" : "border-gray-300"} rounded-md`}
                              />
                              <ErrorMessage name="cvv" component="p" className="text-red-500 text-xs mt-1" />
                            </div>
                          </div>
                        </div>
                      )}

                      {values.paymentMethod === "paypal" && (
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
                          <p className="text-sm text-gray-700">
                            You will be redirected to PayPal to complete your payment securely.
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between mt-8">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-[#854d27] font-medium hover:text-[#6e3b1e]"
                        >
                          Back to Shipping
                        </button>
                        <button
                          type="submit"
                          className="bg-[#854d27] text-white py-3 px-6 rounded-md hover:bg-[#6e3b1e] transition-colors duration-300"
                        >
                          Continue to Review
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#854d27] mb-6">Review Your Order</h2>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      Shipping Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>
                        <span className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </p>
                      <p className="text-gray-600">{formData.address}</p>
                      <p className="text-gray-600">
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                      <p className="text-gray-600">{formData.country}</p>
                      <p className="text-gray-600 mt-2">
                        <span className="font-medium">Email:</span> {formData.email}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span> {formData.phone}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Shipping Method
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium">
                        {shippingOptions.find((option) => option.id === formData.shippingMethod)?.name}
                      </p>
                      <p className="text-gray-600">
                        {shippingOptions.find((option) => option.id === formData.shippingMethod)?.days}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Method
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      {formData.paymentMethod === "credit-card" ? (
                        <div>
                          <p className="font-medium">Credit / Debit Card</p>
                          <p className="text-gray-600">**** **** **** {formData.cardNumber.slice(-4) || "1234"}</p>
                          <p className="text-gray-600">{formData.cardName || "Card Holder"}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium">
                            <span className="font-semibold text-blue-600">Pay</span>
                            <span className="font-semibold text-blue-800">Pal</span>
                          </p>
                          <p className="text-gray-600">{formData.email}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Order Items
                    </h3>
                    <div className="border rounded-md overflow-hidden">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-[#e9e2d0]">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                          </div>
                          <div className="flex items-center justify-end">
                            <p className="text-sm font-medium text-gray-900 mr-4">
                              {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-[#854d27] font-medium hover:text-[#6e3b1e]"
                    >
                      Back to Payment
                    </button>
                    <button
                      type="submit"
                      className="bg-[#854d27] text-white py-3 px-6 rounded-md hover:bg-[#6e3b1e] transition-colors duration-300"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Order Confirmation */}
            {currentStep === 4 && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#854d27] mb-2">Thank You for Your Order!</h2>
                <p className="text-gray-600 mb-6">
                  Your order has been placed successfully. We've sent a confirmation email to {formData.email}.
                </p>

                <div className="bg-[#f8f5f2] p-4 rounded-md inline-block mb-6">
                  <p className="text-lg font-medium">Order #: MM-{Math.floor(Math.random() * 10000)}</p>
                </div>

                <div className="text-left mb-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Order Summary</h3>
                  <div className="border-t border-b py-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between py-2">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="py-4">
                    <div className="flex justify-between py-1">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Shipping</span>
                      <span>${getShippingCost().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Tax</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold text-[#854d27]">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/"
                    className="bg-[#854d27] text-white py-3 px-6 rounded-md hover:bg-[#6e3b1e] transition-colors duration-300"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    href="/account/orders"
                    className="bg-white border border-[#854d27] text-[#854d27] py-3 px-6 rounded-md hover:bg-[#f8f5f2] transition-colors duration-300"
                  >
                    View My Orders
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-[#854d27] mb-6 pb-2 border-b border-gray-200">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-[#e9e2d0]">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <h3 className="line-clamp-1">{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.description}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-b py-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${getShippingCost().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%)</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg text-[#854d27]">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>

              {currentStep < 4 && (
                <div className="mt-6 flex items-center">
                  <Info className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-xs text-gray-500">
                    Your personal data will be used to process your order, support your experience throughout this
                    website, and for other purposes described in our privacy policy.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
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
