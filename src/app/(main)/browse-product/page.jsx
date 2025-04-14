
'use client';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '@/context/CartContext'; // Adjust the import path as needed

const BrowseProduct = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext

  const fetchProducts = () => {
    axios.get('http://localhost:5000/product/getall')
      .then((result) => {
        console.log(result.data);
        setProducts(result.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Browse Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">RS.{product.price}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => addToCart(product)} // Add product to cart
            >
              Add to Cart
            </button>
            <Link
              href={'/view-product/' + product._id}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseProduct;

