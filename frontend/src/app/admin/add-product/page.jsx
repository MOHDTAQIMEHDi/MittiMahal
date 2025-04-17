'use client'
import React from 'react'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ShoppingCart, Upload, X } from "lucide-react"
import { useFormik } from 'formik'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddProductPage = () => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)


    const categories = [
        "Pottery",
        "Clay Pots",
        "Earthenware",
        "Ceramic Vases",
        "Clay Sculptures",
        "Terracotta Items",
        "Decorative Items",
        "Kitchen Utensils",
        "Garden Pottery",
        "Other",
    ]

    const productForm = useFormik({
        initialValues: {
            name: "",
            category: "",
            price: "",
            description: "",
            features: "",
            stock: "",
            image: '',
        },
        onSubmit: (values, { resetForm, setSubmitting }) => {
            // axios
            axios.post('http://localhost:5000/product/add', values)
                .then((result) => {
                    toast.success('Product added successfully');
                    resetForm();
                    router.push('/browse-product');
                }).catch((err) => {
                    console.log(err);
                    toast.error('Something went wrong');
                    setSubmitting(false);
                });
        }
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) toast.error('No file selected');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'MittiMahal');
        formData.append('cloud_name', 'dqrqbx6oi');

        axios.post('http://api.cloudinary.com/v1_1/dqrqbx6oi/image/upload', formData)
            .then((result) => {
                toast.success('Image uploaded');
                productForm.setFieldValue('image', result.data.url);
            }).catch((err) => {
                toast.success('Image upload failed');
            });


    }

    const removeImage = () => {
        setFormData((prev) => ({ ...prev, image: null }))
        setImagePreview(null)
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
           
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-amber-800">Add Your Handcrafted Products</h1>
                        <p className="text-amber-600 mt-2"> </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
                        <h2 className="text-xl text-center font-semibold text-gray-800 mb-6">Product Details</h2>

                        <form onSubmit={productForm.handleSubmit} className="space-y-6">
                            {/* Product Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name*
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={productForm.values.name}
                                    onChange={productForm.handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Enter product name"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Category*
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={productForm.values.category}
                                    onChange={productForm.handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price and Stock (side by side on larger screens) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                        Price (₹)*
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        value={productForm.values.price}
                                        onChange={productForm.handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="0.00"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                                        Available Stock*
                                    </label>
                                    <input
                                        type="number"
                                        id="stock"
                                        value={productForm.values.stock}
                                        onChange={productForm.handleChange}
                                        required
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description*
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={productForm.values.description}
                                    onChange={productForm.handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Describe your product..."
                                />
                            </div>
                            {/* Features */}
                            <div>
                                <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">
                                    Features*
                                </label>
                                <textarea
                                    id="features"
                                    name="features"
                                    value={productForm.values.features}
                                    onChange={productForm.handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Describe your product..."
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image*</label>

                                {!imagePreview ? (
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="image-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        //required={!formData.image}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-1 relative">
                                        <div className="relative h-64 w-full overflow-hidden rounded-md">
                                            <img
                                                src={imagePreview || "/placeholder.svg"}
                                                alt="Product preview"
                                                fill
                                                className="object-contain"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                                            >
                                                <X className="h-5 w-5" />
                                                <span className="sr-only">Remove image</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={productForm.isSubmitting}
                                    className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm bg-[#854d27] text-white hover:bg-[#6e3b1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                                >
                                    {productForm.isSubmitting ? "Adding Product..." : "Add Product"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>All fields marked with * are required</p>
                    </div>
                </div>
            </div>
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

export default AddProductPage