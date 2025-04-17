"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react"
import useCartContext from "@/context/CartContext"

// Mock related products for now
const relatedProducts = [
  {
    id: "terracotta-planter",
    name: "Terracotta Planter",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "ceramic-dinner-set",
    name: "Ceramic Dinner Set",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "clay-cooking-pot",
    name: "Clay Cooking Pot",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "earthen-tea-cups",
    name: "Earthen Tea Cups (Set of 4)",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function ProductPage({ params }) {
  const { id } = params
  const [product, setProduct] = useState(null)
  const [mainImage, setMainImage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeTab, setActiveTab] = useState("description")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {addItemToCart} = useCartContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/getbyid/${id}`)
        const productData = response.data
        setProduct(productData)
        setMainImage(productData.image)
        if (productData.colors?.length) setSelectedColor(productData.colors[0])
        if (productData.sizes?.length) setSelectedSize(productData.sizes[1])
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError(err.message)
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id])

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
  }

  if (loading) {
    return <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center">
      <div className="text-[#854d27]">Loading...</div>
    </div>
  }

  if (error) {
    return <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center">
      <div className="text-red-600">Error: {error}</div>
    </div>
  }

  if (!product) {
    return <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center">
      <div className="text-[#854d27]">Product not found</div>
    </div>
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
                3
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#854d27]">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/category/kitchenware" className="hover:text-[#854d27]">
            Kitchenware
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-[#854d27] font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200 h-[400px] md:h-[500px] flex items-center justify-center">
              <img
                src={mainImage || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="object-contain h-full w-full p-4"
              />
            </div>
            {product.images?.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`bg-white rounded-md overflow-hidden border ${
                      mainImage === image ? "border-[#854d27] ring-2 ring-[#854d27]/20" : "border-gray-200"
                    } h-24 flex items-center justify-center`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-contain h-full w-full p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#854d27]">{product.name}</h1>
              {product.rating && (
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            <div className="text-2xl font-bold text-[#854d27]">
              ${(product.price || 0).toFixed(2)}
            </div>

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 w-10 rounded-full border-2 ${selectedColor?.name === color.name ? "border-[#854d27] ring-2 ring-[#854d27]/20" : "border-gray-300"}`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">{selectedColor?.name}</p>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md text-sm ${selectedSize === size ? "bg-[#854d27] text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => updateQuantity(quantity - 1)}
                    className="p-2 text-gray-600 hover:text-[#854d27] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-center w-12">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(quantity + 1)}
                    className="p-2 text-gray-600 hover:text-[#854d27] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button 
                onClick={() => addItemToCart(product)}
                className="flex-1 bg-[#854d27] text-white py-3 px-6 rounded-md hover:bg-[#6e3b1e] transition-colors duration-300 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

                <button
                  className="p-3 rounded-md border border-gray-300 text-gray-600 hover:text-[#854d27] hover:border-[#854d27] transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5" />
                </button>

                <button
                  className="p-3 rounded-md border border-gray-300 text-gray-600 hover:text-[#854d27] hover:border-[#854d27] transition-colors"
                  aria-label="Share product"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                {product.inStock ? (
                  <span className="text-green-600 font-medium">✓ In stock and ready to ship</span>
                ) : (
                  <span className="text-red-600 font-medium">× Out of stock</span>
                )}
              </div>
            </div>

            {/* Product Information Tabs */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`py-3 px-4 text-sm font-medium ${activeTab === "description" ? "text-[#854d27] border-b-2 border-[#854d27]" : "text-gray-500 hover:text-[#854d27]"}`}
                >
                  Description
                </button>
                {product.features?.length > 0 && (
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`py-3 px-4 text-sm font-medium ${activeTab === "features" ? "text-[#854d27] border-b-2 border-[#854d27]" : "text-gray-500 hover:text-[#854d27]"}`}
                  >
                    Features
                  </button>
                )}
                {product.details && (
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`py-3 px-4 text-sm font-medium ${activeTab === "details" ? "text-[#854d27] border-b-2 border-[#854d27]" : "text-gray-500 hover:text-[#854d27]"}`}
                  >
                    Details
                  </button>
                )}
              </div>

              <div className="py-4">
                {activeTab === "description" && product.description && (
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                )}

                {activeTab === "features" && product.features?.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}

                {activeTab === "details" && product.details && (
                  <pre className="whitespace-pre-line text-gray-700 font-sans">{product.details}</pre>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#854d27] mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <div key={item.id} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[#854d27] font-medium text-sm md:text-base group-hover:text-[#6e3b1e]">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 font-bold mt-1">${item.price.toFixed(2)}</p>
                    <button className="mt-2 w-full py-2 bg-[#e9e2d0] text-[#854d27] rounded text-sm font-medium hover:bg-[#d4a373] hover:text-white transition-colors duration-300">
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

