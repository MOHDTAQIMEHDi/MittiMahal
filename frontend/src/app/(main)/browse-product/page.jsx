'use client';

import { Suspense } from "react"
import { useSearchParams } from 'next/navigation'
import { ProductBrowser } from "./product-browser"
import { categories, materials, colors } from "@/lib/db"
import Link from "next/link"

export default function BrowsePage() {
  const searchParams = useSearchParams()
  
  const category = searchParams.get('category')
  const material = searchParams.get('material')
  const minPrice = searchParams.get('minPrice') ? Number.parseFloat(searchParams.get('minPrice')) : undefined
  const maxPrice = searchParams.get('maxPrice') ? Number.parseFloat(searchParams.get('maxPrice')) : undefined
  const sort = searchParams.get('sort')
  const featured = searchParams.get('featured') === 'true'
  const bestseller = searchParams.get('bestseller') === 'true'
  const newProducts = searchParams.get('new') === 'true'
  const search = searchParams.get('search')
  const page = searchParams.get('page') ? Number.parseInt(searchParams.get('page')) : 1

  // Extract color filters (can be multiple)
  let selectedColors = []
  if (searchParams.getAll('colors').length > 0) {
    selectedColors = searchParams.getAll('colors')
  }

  const handlePriceFilter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const min = formData.get('minPrice');
    const max = formData.get('maxPrice');
    
    const url = new URL(window.location.href);
    if (min) url.searchParams.set('minPrice', min);
    if (max) url.searchParams.set('maxPrice', max);
    window.location.href = url.toString();
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <header className="bg-[#854d27] text-white p-4 shadow-md">
        <nav className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">Mitti Mahal</Link>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="hover:text-[#d4a373] transition-colors duration-200">Cart</Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-[#854d27] mb-2">Browse Our Collection</h1>
        <p className="text-gray-600 mb-8">Discover our handcrafted pottery and ceramic products</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-[#854d27] mb-6">Filters</h2>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.name} className="flex items-center">
                      <a
                        href={`/browse-product?category=${cat.name}`}
                        className={`flex items-center text-sm ${category === cat.name ? "font-semibold text-[#854d27]" : "text-gray-600 hover:text-[#854d27]"}`}
                      >
                        {cat.name} <span className="ml-auto text-gray-400">({cat.count})</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Materials</h3>
                <div className="space-y-2">
                  {materials.map((mat) => (
                    <div key={mat.name} className="flex items-center">
                      <a
                        href={`/browse-product?material=${mat.name}`}
                        className={`flex items-center text-sm ${material === mat.name ? "font-semibold text-[#854d27]" : "text-gray-600 hover:text-[#854d27]"}`}
                      >
                        {mat.name} <span className="ml-auto text-gray-400">({mat.count})</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <form onSubmit={handlePriceFilter} className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    defaultValue={minPrice}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    defaultValue={maxPrice}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                  <button type="submit" className="bg-[#854d27] text-white p-2 rounded-md text-sm">
                    Go
                  </button>
                </form>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <a
                      key={color.name}
                      href={`/browse-product?colors=${color.name}`}
                      className={`h-8 w-8 rounded-full border-2 ${selectedColors.includes(color.name) ? "border-[#854d27] ring-2 ring-[#854d27]/20" : "border-gray-300"}`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      aria-label={`Filter by ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Product Status */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Product Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <a
                      href="/browse-product?featured=true"
                      className={`text-sm ${featured ? "font-semibold text-[#854d27]" : "text-gray-600 hover:text-[#854d27]"}`}
                    >
                      Featured Products
                    </a>
                  </div>
                  <div className="flex items-center">
                    <a
                      href="/browse-product?bestseller=true"
                      className={`text-sm ${bestseller ? "font-semibold text-[#854d27]" : "text-gray-600 hover:text-[#854d27]"}`}
                    >
                      Bestsellers
                    </a>
                  </div>
                  <div className="flex items-center">
                    <a
                      href="/browse-product?new=true"
                      className={`text-sm ${newProducts ? "font-semibold text-[#854d27]" : "text-gray-600 hover:text-[#854d27]"}`}
                    >
                      New Arrivals
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <a href="/browse-product" className="text-[#854d27] hover:text-[#6e3b1e] text-sm font-medium">
                  Clear All Filters
                </a>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <Suspense fallback={<ProductsLoading />}>
              <ProductBrowser
                category={category}
                material={material}
                minPrice={minPrice}
                maxPrice={maxPrice}
                colors={selectedColors}
                sort={sort}
                featured={featured}
                bestseller={bestseller}
                new={newProducts}
                search={search}
                page={page}
              />
            </Suspense>
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

function ProductsLoading() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
