'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCartContext } from '@/context/CartContext';
import toast from 'react-hot-toast';

export function ProductBrowser({ 
  category,
  material,
  minPrice,
  maxPrice,
  colors,
  sort,
  featured,
  bestseller,
  new: isNew,
  search,
  page = 1
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItemToCart } = useCartContext();

  const buildUrl = (newPage) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage);
    return url.toString();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:5000/product/getall');
        let filteredProducts = response.data;

        // Apply filters
        if (category) {
          filteredProducts = filteredProducts.filter(p => p.category === category);
        }
        if (material) {
          filteredProducts = filteredProducts.filter(p => p.material === material);
        }
        if (minPrice) {
          filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
        }
        if (maxPrice) {
          filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
        }
        if (colors?.length) {
          filteredProducts = filteredProducts.filter(p => colors.includes(p.color));
        }
        if (featured) {
          filteredProducts = filteredProducts.filter(p => p.featured);
        }
        if (bestseller) {
          filteredProducts = filteredProducts.filter(p => p.bestseller);
        }
        if (isNew) {
          filteredProducts = filteredProducts.filter(p => p.isNew);
        }
        if (search) {
          const searchLower = search.toLowerCase();
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchLower) || 
            p.description?.toLowerCase().includes(searchLower)
          );
        }

        // Apply sorting
        if (sort) {
          switch (sort) {
            case 'price-asc':
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case 'price-desc':
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case 'newest':
              filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              break;
            case 'popular':
              filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
              break;
          }
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, material, minPrice, maxPrice, colors, sort, featured, bestseller, isNew, search]);

  if (loading) {
    return <ProductsLoading />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-red-600 mb-2">Error</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-600">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  // Calculate pagination
  const productsPerPage = 9;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleAddToCart = (product) => {
    try {
      addItemToCart(product);
      toast.success('Added to cart successfully');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{products.length} products found</p>
        <select 
          className="p-2 border border-gray-300 rounded-md text-sm"
          value={sort || ''}
          onChange={(e) => {
            const url = new URL(window.location.href);
            url.searchParams.set('sort', e.target.value);
            window.location.href = url.toString();
          }}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
            <Link href={`/view-product/${product._id}`} className="block relative">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-[#d4a373] text-white text-xs px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
              </div>
            </Link>

            <div className="p-4">
              <Link href={`/view-product/${product._id}`}>
                <h3 className="text-lg font-medium text-[#854d27] mb-2 group-hover:text-[#6e3b1e]">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating || '0.0'}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-xl font-bold text-[#854d27]">
                  ₹{product.price?.toFixed(2) || '0.00'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-[#854d27] text-white py-2 px-4 rounded-md hover:bg-[#6e3b1e] transition-colors duration-300 flex items-center justify-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </button>
                <button className="p-2 rounded-md border border-gray-300 text-gray-600 hover:text-[#854d27] hover:border-[#854d27] transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <Link
                  key={pageNum}
                  href={buildUrl(pageNum)}
                  className={`px-4 py-2 rounded-md ${
                    pageNum === page
                      ? "bg-[#854d27] text-white"
                      : "bg-white text-[#854d27] hover:bg-[#f8f5f2]"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
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
