"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Save, Trash, Upload, Plus } from "lucide-react"

// Sample product data for editing
const sampleProduct = {
  id: 1,
  name: "Earthen Clay Pot",
  description: "Handcrafted clay pot made from premium quality clay. Perfect for both decorative and functional use.",
  category: "Pottery",
  price: 499,
  stock: 25,
  status: "active",
  featured: true,
  images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
  variants: [
    { id: 1, name: "Small", price: 499 },
    { id: 2, name: "Medium", price: 699 },
    { id: 3, name: "Large", price: 899 },
  ],
  specifications: [
    { key: "Material", value: "Clay" },
    { key: "Dimensions", value: "10 x 8 inches" },
    { key: "Weight", value: "1.2 kg" },
  ],
}

export default function UpdateProduct() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")
  const isNewProduct = !productId

  const [product, setProduct] = useState(
    isNewProduct
      ? {
          name: "",
          description: "",
          category: "",
          price: 0,
          stock: 0,
          status: "active",
          featured: false,
          images: [],
          variants: [],
          specifications: [],
        }
      : sampleProduct,
  )

  const [newVariant, setNewVariant] = useState({ name: "", price: 0 })
  const [newSpec, setNewSpec] = useState({ key: "", value: "" })
  const [activeTab, setActiveTab] = useState("basic")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSwitchChange = (name) => {
    setProduct({ ...product, [name]: !product[name] })
  }

  const addVariant = () => {
    if (newVariant.name && newVariant.price) {
      setProduct({
        ...product,
        variants: [...product.variants, { id: Date.now(), ...newVariant }],
      })
      setNewVariant({ name: "", price: 0 })
    }
  }

  const removeVariant = (id) => {
    setProduct({
      ...product,
      variants: product.variants.filter((v) => v.id !== id),
    })
  }

  const addSpecification = () => {
    if (newSpec.key && newSpec.value) {
      setProduct({
        ...product,
        specifications: [...product.specifications, { ...newSpec }],
      })
      setNewSpec({ key: "", value: "" })
    }
  }

  const removeSpecification = (index) => {
    const newSpecs = [...product.specifications]
    newSpecs.splice(index, 1)
    setProduct({
      ...product,
      specifications: newSpecs,
    })
  }

  const handleSave = () => {
    // Here you would typically save the product to your backend
    console.log("Saving product:", product)
    // Redirect to products page after save
    window.location.href = "/manage-product"
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/manage-product">
          <button className="rounded-md border border-gray-300 p-2 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4" />
          </button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{isNewProduct ? "Add New Product" : "Update Product"}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap -mb-px">
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "basic"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("basic")}
              >
                Basic Info
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "variants"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("variants")}
              >
                Variants
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "specifications"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "images"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("images")}
              >
                Images
              </button>
            </div>
          </div>

          {activeTab === "basic" && (
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enter the basic details of your product</p>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Product Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                    value={product.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter product description"
                    rows={5}
                    className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                    value={product.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 pr-8 appearance-none bg-white dark:border-gray-600 dark:bg-gray-800"
                        value={product.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select category</option>
                        <option value="Pottery">Pottery</option>
                        <option value="Home Decor">Home Decor</option>
                        <option value="Kitchenware">Kitchenware</option>
                        <option value="Lighting">Lighting</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="status" className="text-sm font-medium">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        id="status"
                        name="status"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 pr-8 appearance-none bg-white dark:border-gray-600 dark:bg-gray-800"
                        value={product.status}
                        onChange={handleInputChange}
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="price" className="text-sm font-medium">
                      Price (₹)
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0.00"
                      className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                      value={product.price}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="stock" className="text-sm font-medium">
                      Stock Quantity
                    </label>
                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      placeholder="0"
                      className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                      value={product.stock}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={product.featured}
                      onChange={() => handleSwitchChange("featured")}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium">Featured Product</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "variants" && (
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Product Variants</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add different variants of your product</p>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid gap-4">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <p className="font-medium">{variant.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">₹{variant.price.toFixed(2)}</p>
                      </div>
                      <button
                        className="rounded-md p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                        onClick={() => removeVariant(variant.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="grid gap-4">
                  <h3 className="text-sm font-medium">Add New Variant</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="variantName" className="text-sm font-medium">
                        Variant Name
                      </label>
                      <input
                        id="variantName"
                        placeholder="e.g. Small, Red, etc."
                        className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                        value={newVariant.name}
                        onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="variantPrice" className="text-sm font-medium">
                        Price (₹)
                      </label>
                      <input
                        id="variantPrice"
                        type="number"
                        placeholder="0.00"
                        className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                        value={newVariant.price}
                        onChange={(e) => setNewVariant({ ...newVariant, price: Number.parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>
                  <button
                    onClick={addVariant}
                    className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Variant
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Product Specifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add technical details and specifications</p>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <p className="font-medium">{spec.key}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{spec.value}</p>
                      </div>
                      <button
                        className="rounded-md p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                        onClick={() => removeSpecification(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="grid gap-4">
                  <h3 className="text-sm font-medium">Add New Specification</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="specKey" className="text-sm font-medium">
                        Specification
                      </label>
                      <input
                        id="specKey"
                        placeholder="e.g. Material, Size, etc."
                        className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                        value={newSpec.key}
                        onChange={(e) => setNewSpec({ ...newSpec, key: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="specValue" className="text-sm font-medium">
                        Value
                      </label>
                      <input
                        id="specValue"
                        placeholder="e.g. Cotton, 10 inches, etc."
                        className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                        value={newSpec.value}
                        onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    onClick={addSpecification}
                    className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Specification
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "images" && (
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Product Images</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Upload high-quality images of your product</p>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700"
                        onClick={() => {
                          const newImages = [...product.images]
                          newImages.splice(index, 1)
                          setProduct({ ...product, images: newImages })
                        }}
                      >
                        <Trash className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  <div className="flex aspect-square items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                      <p className="text-xs text-gray-500 dark:text-gray-400">Drag & drop or click to upload</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Product Preview</h3>
            </div>
            <div className="p-4">
              <div className="flex flex-col items-center">
                {product.images.length > 0 ? (
                  <div className="relative aspect-square w-full rounded-md overflow-hidden mb-4">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No image</p>
                  </div>
                )}

                <h3 className="text-lg font-medium">{product.name || "Product Name"}</h3>
                <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">{product.category || "Category"}</p>
                <p className="font-medium text-lg mt-2">₹{product.price?.toFixed(2) || "0.00"}</p>

                <div className="w-full mt-4">
                  <p className="text-sm font-medium mb-1">Stock Status:</p>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        product.stock > 10
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{product.stock} units</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Actions</h3>
            </div>
            <div className="p-4 space-y-4">
              <button
                className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleSave}
              >
                <Save className="mr-2 h-4 w-4" />
                {isNewProduct ? "Create Product" : "Save Changes"}
              </button>

              {!isNewProduct && (
                <button className="w-full inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-600 dark:hover:bg-red-700">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Product
                </button>
              )}

              <Link href="/manage-product">
                <button className="w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

