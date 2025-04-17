'use client';
import useCartContext from "@/context/CartContext";
import {
    ChevronDown,
    ShoppingBag,
    Search,
    Menu,
    X,
    Heart,
    User,
    MapPin,
    Phone,
    Mail,
    Clock,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    ArrowRight,
    ArrowLeft,
    Users,
    Package,
    Award,
    CheckCircle,
    Quote,
    Star,
  } from "lucide-react"
import Link from "next/link";

const { default: useAppContext } = require("@/context/AppContext")
const { useState, useRef, useEffect } = require("react")

function MainNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAccountOpen, setIsAccountOpen] = useState(false)
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const categoryRef = useRef(null)
    const accountRef = useRef(null)

    const { userLoggedIn, setUserLoggedIn, logout } = useAppContext();
      const { cartItems, addItemToCart, removeItemFromCart, calculateTotalAmount } = useCartContext()
    

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryOpen(false)
            }
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setIsAccountOpen(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <>
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-[#5D4037] to-[#8B4513] text-white py-2 px-4 hidden sm:block">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            <span>info@mittimahal.com</span>
                        </div>
                    </div>` `
                    <div className="flex items-center space-x-4 text-xs">
                        <Link href="/track-order" className="hover:text-[#E6C2A0] transition-colors duration-200">
                            Track Order
                        </Link>
                        <Link href="/shipping" className="hover:text-[#E6C2A0] transition-colors duration-200">
                            Shipping
                        </Link>
                        <div className="flex items-center space-x-2">
                            <Link href="#" className="hover:text-[#E6C2A0] transition-colors duration-200">
                                <Facebook className="h-3 w-3" />
                            </Link>
                            <Link href="#" className="hover:text-[#E6C2A0] transition-colors duration-200">
                                <Instagram className="h-3 w-3" />
                            </Link>
                            <Link href="#" className="hover:text-[#E6C2A0] transition-colors duration-200">
                                <Twitter className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={`sticky top-0 z-50 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-[#F5EFE7]"} transition-all duration-300`}
            >
                <div className="container mx-auto px-4 py-3 md:py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/Screenshot_16-4-2025_202821_www.design.com-removebg-preview.png"
                                    alt="Mitti Mahal Logo"
                                    width={40}
                                    height={40}
                                    className="mr-2"
                                />
                                <span className="text-xl md:text-2xl font-bold text-[#8B4513]">
                                    MITTI<span className="text-[#D2691E]">MAHAL</span>
                                </span>
                            </Link>
                        </div>

                        {/* Search Bar */}
                        {/* <div
                className={`${isSearchOpen ? "flex absolute top-full left-0 right-0 p-4 bg-white shadow-md md:shadow-none md:static md:bg-transparent md:p-0" : "hidden md:flex"} flex-1 max-w-xl mx-4 relative`}
              >
                <input
                  type="text"
                  placeholder="Search for clay products..."
                  className="w-full px-4 py-2 rounded-full border border-[#D2B48C] focus:outline-none focus:ring-2 focus:ring-[#8B4513] bg-white/90 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B4513]">
                  <Search className="h-4 w-4" />
                </button>
              </div> */}

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-6">
                            <div className="relative" ref={categoryRef}>
                                <button
                                    className="flex items-center text-[#5D4037] hover:text-[#8B4513] font-medium transition-colors duration-200 text-sm"
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                >
                                    Categories{" "}
                                    <ChevronDown
                                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {isCategoryOpen && (
                                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-10 border border-[#E6C2A0]">
                                        <div className="grid grid-cols-1 gap-1">
                                            <Link
                                                href="/categories/home-decor"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#F5EFE7] hover:text-[#8B4513]"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-[#F5EFE7] flex items-center justify-center mr-3">
                                                    <Image src="/placeholder.svg?height=20&width=20" alt="Home Decor" width={20} height={20} />
                                                </span>
                                                Home Decor
                                            </Link>
                                            <Link
                                                href="/categories/kitchen"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#F5EFE7] hover:text-[#8B4513]"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-[#F5EFE7] flex items-center justify-center mr-3">
                                                    <Image src="/placeholder.svg?height=20&width=20" alt="Kitchen" width={20} height={20} />
                                                </span>
                                                Kitchen & Dining
                                            </Link>
                                            <Link
                                                href="/categories/garden"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#F5EFE7] hover:text-[#8B4513]"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-[#F5EFE7] flex items-center justify-center mr-3">
                                                    <Image src="/placeholder.svg?height=20&width=20" alt="Garden" width={20} height={20} />
                                                </span>
                                                Garden Pottery
                                            </Link>
                                            <Link
                                                href="/categories/sculptures"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#F5EFE7] hover:text-[#8B4513]"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-[#F5EFE7] flex items-center justify-center mr-3">
                                                    <Image src="/placeholder.svg?height=20&width=20" alt="Sculptures" width={20} height={20} />
                                                </span>
                                                Artistic Sculptures
                                            </Link>
                                            <Link
                                                href="/categories/traditional"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#F5EFE7] hover:text-[#8B4513]"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-[#F5EFE7] flex items-center justify-center mr-3">
                                                    <Image src="/placeholder.svg?height=20&width=20" alt="Traditional" width={20} height={20} />
                                                </span>
                                                Traditional Pottery
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* <Link
                  href="/new-arrivals"
                  className="text-[#5D4037] hover:text-[#8B4513] font-medium transition-colors duration-200 text-sm"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/bestsellers"
                  className="text-[#5D4037] hover:text-[#8B4513] font-medium transition-colors duration-200 text-sm"
                >
                  Bestsellers
                </Link>
                <Link
                  href="/artisans"
                  className="text-[#5D4037] hover:text-[#8B4513] font-medium transition-colors duration-200 text-sm"
                >
                  Artisans
                </Link> */}
                            <Link
                                href="/about"
                                className="text-[#5D4037] hover:text-[#8B4513] font-medium transition-colors duration-200 text-sm"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                className="text-[#5D4037] hover:text-[#8B4513] font-medium transition-colors duration-200 text-sm"
                            >
                                Contact Us
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-3">
                            {
                                userLoggedIn ? (
                                    <button className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] hover:from-[#A0522D] hover:to-[#CD853F] text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg" onClick={logout}>Logout</button>
                                ) : (
                                    <>
                                        <Link
                                            href="/signup"
                                            className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] hover:from-[#A0522D] hover:to-[#CD853F] text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                        >
                                            Sign Up
                                        </Link>
                                        <Link
                                            href="/login"
                                            className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] hover:from-[#A0522D] hover:to-[#CD853F] text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                        >
                                            Log In
                                        </Link>
                                    </>
                                )
                            }

                            <div className="relative" ref={accountRef}>
                                <button
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F5EFE7] text-[#5D4037] hover:bg-[#E6C2A0] hover:text-[#8B4513] transition-colors duration-200"
                                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                                >
                                    <User className="h-5 w-5" />
                                </button>
                                {isAccountOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 border border-[#E6C2A0]">
                                        {/* <Link
                        href="/auth/user-login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5EFE7] hover:text-[#8B4513]"
                      >
                        User Login
                      </Link>
                      <Link
                        href="/auth/user-signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5EFE7] hover:text-[#8B4513]"
                      >
                        User Signup
                      </Link> */}
                                        <div className="border-t border-gray-200 my-1"></div>
                                        <Link
                                            href="/auth/seller-login"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5EFE7] hover:text-[#8B4513]"
                                        >
                                            Seller Login
                                        </Link>
                                        <Link
                                            href="/auth/seller-signup"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5EFE7] hover:text-[#8B4513]"
                                        >
                                            Seller Signup
                                        </Link>
                                        <div className="border-t border-gray-200 my-1"></div>
                                        <Link
                                            href="/admin"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5EFE7] hover:text-[#8B4513]"
                                        >
                                            Admin Portal
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <button className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F5EFE7] text-[#5D4037] hover:bg-[#E6C2A0] hover:text-[#8B4513] transition-colors duration-200 relative">
                                <Heart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-[#D2691E] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <button className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F5EFE7] text-[#5D4037] hover:bg-[#E6C2A0] hover:text-[#8B4513] transition-colors duration-200 relative">
                                <ShoppingBag className="h-5 w-5" />
                                <span className="absolute -top-2 -right-2 bg-[#d4a373] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                                </span>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-2">
                            <Link
                                href="/auth/signup"
                                className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] hover:from-[#A0522D] hover:to-[#CD853F] text-white text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                Sign Up
                            </Link>
                            <button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                <Search className="h-4 w-4 text-[#5D4037]" />
                            </button>
                            <button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X className="h-5 w-5 text-[#5D4037]" /> : <Menu className="h-5 w-5 text-[#5D4037]" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white shadow-md max-h-[80vh] overflow-y-auto">
                        <div className="px-4 py-2 space-y-2 divide-y divide-gray-100">
                            <div className="py-2">
                                <div className="font-medium text-[#5D4037] mb-2">Categories</div>
                                <div className="pl-4 space-y-2">
                                    <Link
                                        href="/categories/home-decor"
                                        className="flex items-center py-1 text-sm text-[#5D4037] hover:text-[#8B4513]"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#F5EFE7] flex items-center justify-center mr-2">
                                            <Image src="/placeholder.svg?height=16&width=16" alt="Home Decor" width={16} height={16} />
                                        </span>
                                        Home Decor
                                    </Link>
                                    <Link
                                        href="/categories/kitchen"
                                        className="flex items-center py-1 text-sm text-[#5D4037] hover:text-[#8B4513]"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#F5EFE7] flex items-center justify-center mr-2">
                                            <Image src="/placeholder.svg?height=16&width=16" alt="Kitchen" width={16} height={16} />
                                        </span>
                                        Kitchen & Dining
                                    </Link>
                                    <Link
                                        href="/categories/garden"
                                        className="flex items-center py-1 text-sm text-[#5D4037] hover:text-[#8B4513]"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#F5EFE7] flex items-center justify-center mr-2">
                                            <Image src="/placeholder.svg?height=16&width=16" alt="Garden" width={16} height={16} />
                                        </span>
                                        Garden Pottery
                                    </Link>
                                    <Link
                                        href="/categories/sculptures"
                                        className="flex items-center py-1 text-sm text-[#5D4037] hover:text-[#8B4513]"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#F5EFE7] flex items-center justify-center mr-2">
                                            <Image src="/placeholder.svg?height=16&width=16" alt="Sculptures" width={16} height={16} />
                                        </span>
                                        Artistic Sculptures
                                    </Link>
                                    <Link
                                        href="/categories/traditional"
                                        className="flex items-center py-1 text-sm text-[#5D4037] hover:text-[#8B4513]"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#F5EFE7] flex items-center justify-center mr-2">
                                            <Image src="/placeholder.svg?height=16&width=16" alt="Traditional" width={16} height={16} />
                                        </span>
                                        Traditional Pottery
                                    </Link>
                                </div>
                            </div>
                            <div className="py-2 space-y-2">
                                <Link href="/new-arrivals" className="block py-1 text-[#5D4037] hover:text-[#8B4513]">
                                    New Arrivals
                                </Link>
                                <Link href="/bestsellers" className="block py-1 text-[#5D4037] hover:text-[#8B4513]">
                                    Bestsellers
                                </Link>
                                <Link href="/artisans" className="block py-1 text-[#5D4037] hover:text-[#8B4513]">
                                    Artisans
                                </Link>
                                <Link href="/about" className="block py-1 text-[#5D4037] hover:text-[#8B4513]">
                                    About Us
                                </Link>
                            </div>
                            <div className="py-2">
                                <div className="font-medium text-[#5D4037] mb-2">Account</div>
                                <div className="pl-4 space-y-2">
                                    <Link href="/auth/user-login" className="block py-1 text-sm text-[#5D4037] hover:text-[#8B4513]">
                                        User Login
                                    </Link>
                                    <Link href="/auth/user-signup" className="block py-1 text-sm text-[#5D4037] hover:text-[#8B4513]">
                                        User Signup
                                    </Link>
                                    <Link href="/auth/seller-login" className="block py-1 text-sm text-[#5D4037] hover:text-[#8B4513]">
                                        Seller Login
                                    </Link>
                                    <Link href="/auth/seller-signup" className="block py-1 text-sm text-[#5D4037] hover:text-[#8B4513]">
                                        Seller Signup
                                    </Link>
                                    <Link href="/admin" className="block py-1 text-sm text-[#5D4037] hover:text-[#8B4513]">
                                        Admin Portal
                                    </Link>
                                </div>
                            </div>
                            <div className="py-2 flex space-x-4">
                                <button className="text-[#5D4037] hover:text-[#8B4513] transition-colors duration-200 relative">
                                    <Heart className="h-5 w-5" />
                                    <span className="absolute -top-2 -right-2 bg-[#D2691E] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        3
                                    </span>
                                </button>
                                <button className="text-[#5D4037] hover:text-[#8B4513] transition-colors duration-200 relative">
                                    <ShoppingBag className="h-5 w-5" />
                                    <Link href="/user/cart" className="absolute inset-0"></Link>
                                    <span className="absolute -top-2 -right-2 bg-[#D2691E] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        2
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}

export default MainNavbar;