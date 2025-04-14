"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MoreHorizontal, Plus, Edit, Trash, Grid, List } from "lucide-react"
import axios from "axios"; // Ensure axios is imported

export default function ManageProducts() {
  const [products, setProducts] = useState([]); // Define products state
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [activeTab, setActiveTab] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product/getall"); // Fetch products from backend
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "in-stock" && product.status === "In Stock") return matchesSearch;
    if (activeTab === "low-stock" && product.status === "Low Stock") return matchesSearch;
    if (activeTab === "out-of-stock" && product.status === "Out of Stock") return matchesSearch;

    return activeTab === "all" ? matchesSearch : false;
  });

  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Products</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage all products of Mitti Mahal</p>
        </div>
        <Link href="/admin/add-product">
          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </button>
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-lg font-semibold">All Products</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="search"
                  placeholder="Search products..."
                  className="rounded-md border border-gray-300 pl-8 py-1.5 w-full md:w-[250px] dark:border-gray-600 dark:bg-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center border rounded-md">
                <button
                  className={`p-2 ${viewMode === "grid" ? "bg-gray-200 dark:bg-gray-700" : "bg-white dark:bg-gray-800"} rounded-l-md`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  className={`p-2 ${viewMode === "list" ? "bg-gray-200 dark:bg-gray-700" : "bg-white dark:bg-gray-800"} rounded-r-md`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
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
                All Products
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "in-stock"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("in-stock")}
              >
                In Stock
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "low-stock"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("low-stock")}
              >
                Low Stock
              </button>
              <button
                className={`inline-block p-4 text-sm font-medium ${
                  activeTab === "out-of-stock"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("out-of-stock")}
              >
                Out of Stock
              </button>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Image</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Category
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Stock</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3 text-sm">
                        <img
                          src={product.image || "/placeholder.svg"} // Fallback to placeholder if image is undefined
                          alt={product.name || "Product Image"} // Fallback to generic alt text
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">{product.name || "Unnamed Product"}</td>
                      <td className="px-4 py-3 text-sm">{product.category || "Uncategorized"}</td>
                      <td className="px-4 py-3 text-sm">{product.price ? `₹${product.price}` : "Price not available"}</td>
                      <td className="px-4 py-3 text-sm">{product.stock ?? "N/A"}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            product.stock > 10
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : product.stock > 0
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {product.stock > 10
                            ? "In Stock"
                            : product.stock > 0
                              ? "Low Stock"
                              : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(product._id)}
                            className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </button>
                          {openDropdown === product._id && (
                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
                              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                                Actions
                              </div>
                              <hr className="my-1 border-gray-200 dark:border-gray-700" />
                              <button
                                onClick={() => alert(`Viewing details for ${product.name}`)}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                              >
                                View Details
                              </button>
                              <Link
                                href={`/update-product?id=${product._id}`}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                              >
                                <div className="flex items-center">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Product
                                </div>
                              </Link>
                              <button
                                onClick={() => alert(`Deleting product: ${product.name}`)}
                                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                              >
                                <div className="flex items-center">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete Product
                                </div>
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="aspect-square relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name || "Product Image"} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{product.name || "Unnamed Product"}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{product.category || "Uncategorized"}</span>
                      <span className="font-medium">{product.price ? `₹${product.price}` : "Price not available"}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          product.status === "In Stock"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : product.status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {product.status || "Unknown"}
                      </span>
                      <Link href={`/update-product?id=${product.id}`}>
                        <button className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <Edit className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

