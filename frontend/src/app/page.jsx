"use client"

import Link from "next/link"
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
//import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import useAppContext from "@/context/AppContext"
import Navbar from "./user/navbar"

// Main component is exported at the end of the file


function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      image: "/pexels-retosatti-22823.jpg",
      title: "Handcrafted Clay Artistry",
      subtitle: "Discover unique clay products crafted by skilled artisans from across the country",
      cta: "Shop Collection",
      position: "left",
      color: "brown",
    },
    {
      image: "/pexels-ludakavun-12915928.jpg",
      title: "Traditional Pottery Reimagined",
      subtitle: "Blending ancient techniques with contemporary designs",
      cta: "Explore Now",
      position: "right",
      color: "terracotta",
    },
    {
      image: "/pexels-quang-nguyen-vinh-222549-2134816.jpg",
      title: "Artisan Spotlight",
      subtitle: "Meet the master craftspeople behind our exclusive collections",
      cta: "Meet Artisans",
      position: "center",
      color: "earth",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const getTextColor = (color) => {
    switch (color) {
      case "brown":
        return "text-[#8B4513]"
      case "terracotta":
        return "text-[#D2691E]"
      case "earth":
        return "text-[#A0522D]"
      default:
        return "text-[#8B4513]"
    }
  }

  const getTextPosition = (position) => {
    switch (position) {
      case "left":
        return "items-start text-left"
      case "right":
        return "items-end text-right"
      case "center":
        return "items-center text-center"
      default:
        return "items-start text-left"
    }
  }

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div
              className={`relative container mx-auto px-4 h-full flex flex-col justify-center ${getTextPosition(slide.position)}`}
            >
              <div className="max-w-2xl">
                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 text-white ${getTextColor(slide.color)}`}
                >
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-8 text-white">{slide.subtitle}</p>
                <button className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-6 text-sm sm:text-base md:text-lg rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-1 md:p-2 backdrop-blur-sm transition-all duration-300"
      >
        <ArrowLeft className="h-4 w-4 md:h-6 md:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-1 md:p-2 backdrop-blur-sm transition-all duration-300"
      >
        <ArrowRight className="h-4 w-4 md:h-6 md:w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white scale-125" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  )
}


function SiteStats() {
  return (
    <section className="py-8 bg-gradient-to-r from-[#8B4513]/10 to-[#D2691E]/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-center">
            <div className="w-12 h-12 bg-[#8B4513]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-[#8B4513]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-1">100+</h3>
            <p className="text-[#5D4037] text-sm">Artisans Supported</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-center">
            <div className="w-12 h-12 bg-[#D2691E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-6 w-6 text-[#D2691E]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#D2691E] mb-1">5000+</h3>
            <p className="text-[#5D4037] text-sm">Products Sold</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-center">
            <div className="w-12 h-12 bg-[#A0522D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-[#A0522D]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#A0522D] mb-1">15+</h3>
            <p className="text-[#5D4037] text-sm">Years of Excellence</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-center">
            <div className="w-12 h-12 bg-[#8B4513]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-[#8B4513]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-1">10K+</h3>
            <p className="text-[#5D4037] text-sm">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedCollections() {
  const collections = [
    {
      id: 1,
      title: "Home Decor",
      image: "/pexels-kseniachernaya-15170521.jpg",
      description: "Beautiful clay items to adorn your living space",
    },
    {
      id: 2,
      title: "Kitchen & Dining",
      image: "/pexels-fariphotography-905844.jpg",
      description: "Traditional cookware and dining essentials",
    },
    {
      id: 3,
      title: "Garden Pottery",
      image: "/pexels-tara-winstead-6692145.jpg",
      description: "Planters and outdoor decorations items",
    },
    {
      id: 4,
      title: "Artistic Sculptures",
      image: "/pexels-mikhail-nilov-9304487.jpg",
      description: "Unique art pieces crafted by master artisans",
    },
  ]

  return (
    <section className="py-10 md:py-16 bg-[#F5EFE7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#E6C2A0] text-[#8B4513] text-sm font-medium rounded-full mb-3">
            Curated Collections
          </span>
          <h2 className="text-3xl font-bold text-[#5D4037] mb-2">Featured Collections</h2>
          <p className="text-[#8B4513]/80 max-w-2xl mx-auto">
            Explore our curated collections of handcrafted clay products from talented artisans
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button
                    variant="outline"
                    className="w-full bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-[#8B4513]"
                  >
                    View Collection
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#8B4513] mb-2 group-hover:text-[#D2691E] transition-colors duration-300">
                  {collection.title}
                </h3>
                <p className="text-[#5D4037]/80 mb-4">{collection.description}</p>
                <button
                  variant="link"
                  className="text-[#8B4513] p-0 hover:text-[#D2691E] group-hover:underline transition-all duration-300"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrowseProducts() {
  const products = [
    {
      id: 1,
      name: "Terracotta Planter",
      price: 1200,
      image: "/pexels-joaquin-carfagna-3131171-17756196.jpg",
      rating: 4.5,
      isNew: true,
      discount: null,
    },
    {
      id: 2,
      name: "Clay Water Pot",
      price: 850,
      image: "/pexels-tara-winstead-6692127.jpg",
      rating: 4.8,
      isNew: false,
      discount: 15,
    },
    {
      id: 3,
      name: "Decorative Wall Hanging",
      price: 1500,
      image: "/pexels-matreding-12777204.jpg",
      rating: 4.2,
      isNew: false,
      discount: null,
    },
    {
      id: 4,
      name: "Clay Dinner Set",
      price: 3200,
      image: "/pexels-icon0-216571.jpg",
      rating: 4.7,
      isNew: true,
      discount: 10,
    },
    {
      id: 5,
      name: "Handpainted Vase",
      price: 1800,
      image: "/pexels-muffinsaurs-993626.jpg",
      rating: 4.6,
      isNew: false,
      discount: null,
    },
    {
      id: 6,
      name: "Clay Oil Lamp",
      price: 450,
      image: "/pexels-yankrukov-8819259.jpg",
      rating: 4.3,
      isNew: false,
      discount: null,
    },
  ]

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
          <div>
            <span className="inline-block px-3 py-1 bg-[#E6C2A0] text-[#8B4513] text-sm font-medium rounded-full mb-3">
              Bestsellers
            </span>
            <h2 className="text-3xl font-bold text-[#5D4037] mb-2">Popular Products</h2>
            <p className="text-[#8B4513]/80">Discover our bestselling handcrafted clay products</p>
          </div>
          <Link href="/browse-product" className="bg-[#8B4513] hover:bg-[#A0522D] text-white rounded-full text-sm font-medium px-2 py-1">
            View All Products <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100"
            >
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.isNew && (
                  <div className="absolute top-3 left-3 bg-[#D2691E] text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-[#8B4513] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.discount}% OFF
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white rounded-full w-10 h-10 p-0 flex items-center justify-center">
                      <Search className="h-4 w-4" />
                    </button>
                    <button className="bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white rounded-full w-10 h-10 p-0 flex items-center justify-center">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white rounded-full w-10 h-10 p-0 flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#5D4037] mb-2 group-hover:text-[#8B4513] transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    {product.discount ? (
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-[#D2691E]">
                          ₹{Math.round(product.price * (1 - product.discount / 100))}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">₹{product.price}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-[#8B4513]">₹{product.price}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-${i < Math.floor(product.rating) ? "[#FFD700]" : "gray-300"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-gray-600">({product.rating})</span>
                  </div>
                </div>
                <button className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white rounded-full transform transition-transform duration-300 group-hover:scale-105">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Delhi",
      image: "/pexels-olly-733872.jpg",
      rating: 5,
      text: "The clay water pot I purchased keeps water naturally cool even in summer. The craftsmanship is exceptional, and it adds a traditional touch to my kitchen. Highly recommend!",
      product: "Clay Water Pot",
    },
    {
      id: 2,
      name: "Rajesh Patel",
      location: "Mumbai",
      image: "/pexels-italo-melo-881954-2379004.jpg",
      rating: 4,
      text: "I bought several planters for my balcony garden, and they're beautiful! The natural texture and earthy colors complement my plants perfectly. The quality is outstanding.",
      product: "Garden Planters",
    },
    {
      id: 3,
      name: "Ananya Gupta",
      location: "Jaipur",
      image: "/pexels-samad-ismayilov-231721-1270076.jpg",
      rating: 5,
      text: "The decorative wall hanging I ordered is a masterpiece! It's become the focal point of my living room. The intricate details show the incredible skill of the artisan.",
      product: "Decorative Wall Hanging",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#E6C2A0] text-[#8B4513] text-sm font-medium rounded-full mb-3">
            Customer Stories
          </span>
          <h2 className="text-3xl font-bold text-[#5D4037] mb-2">What Our Customers Say</h2>
          <p className="text-[#8B4513]/80 max-w-2xl mx-auto">
            Hear from our satisfied customers about their experience with our handcrafted clay products
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 left-0 text-[#8B4513]/10 transform -translate-x-1/2">
            <Quote className="w-24 h-24" />
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#F5EFE7] p-6 md:p-10 shadow-md">
            <div
              className="transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              <div className="flex flex-nowrap">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? "text-[#FFD700] fill-[#FFD700]" : "text-gray-300"
                                }`}
                            />
                          ))}
                        </div>
                        <p className="text-[#5D4037] mb-4 italic">"{testimonial.text}"</p>
                        <div>
                          <h4 className="font-semibold text-[#8B4513]">{testimonial.name}</h4>
                          <p className="text-sm text-[#8B4513]/70">
                            {testimonial.location} • Purchased {testimonial.product}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-[#8B4513] rounded-full p-2 shadow-md hover:bg-[#8B4513] hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-[#8B4513] rounded-full p-2 shadow-md hover:bg-[#8B4513] hover:text-white transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentTestimonial === index ? "bg-[#8B4513] w-6" : "bg-[#8B4513]/30"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center text-[#8B4513] hover:text-[#D2691E] font-medium transition-colors duration-200"
          >
            Read More Customer Reviews <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function AboutUs() {
  return (
    <section className="py-10 md:py-16 bg-[#F5EFE7]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/pexels-shkrabaanthony-4706134 (1).jpg"
                alt="About Mitti Mahal"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-3">
                  Since 2010
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">Preserving Traditions, Crafting Futures</h3>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <span className="inline-block px-3 py-1 bg-[#E6C2A0] text-[#8B4513] text-sm font-medium rounded-full mb-3">
              Our Story
            </span>
            <h2 className="text-3xl font-bold text-[#5D4037] mb-4">About Mitti Mahal</h2>
            <p className="text-[#8B4513]/80 mb-6">
              Mitti Mahal was founded with a vision to preserve and promote the rich tradition of Indian clay
              craftsmanship. We provide a platform for skilled artisans from across the country to showcase their
              exceptional work and connect with customers who appreciate handcrafted excellence.
            </p>
            <p className="text-[#8B4513]/80 mb-6">
              Our mission is to support local artisans, preserve traditional techniques, and bring sustainable,
              eco-friendly clay products to modern homes. Each piece in our collection tells a story of cultural
              heritage and artistic passion.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-[#8B4513] mb-2 text-xl">100+ Artisans</h3>
                <p className="text-sm text-[#5D4037]/80">Supporting talented craftspeople across India</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-[#8B4513] mb-2 text-xl">1000+ Products</h3>
                <p className="text-sm text-[#5D4037]/80">Unique handcrafted items for every taste</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-[#8B4513] mb-2 text-xl">Pan India</h3>
                <p className="text-sm text-[#5D4037]/80">Representing diverse clay traditions</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-[#8B4513] mb-2 text-xl">Eco-Friendly</h3>
                <p className="text-sm text-[#5D4037]/80">Sustainable materials and practices</p>
              </div>
            </div>
            <button className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactUs() {
  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#E6C2A0] text-[#8B4513] text-sm font-medium rounded-full mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl font-bold text-[#5D4037] mb-2">Contact Us</h2>
          <p className="text-[#8B4513]/80 max-w-2xl mx-auto">
            Have questions or feedback? We&apos;d love to hear from you!
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          <div className="bg-[#F5EFE7] p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#8B4513] mb-6">Send Us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#5D4037] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-[#E6C2A0] focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] bg-white/90"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#5D4037] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-[#E6C2A0] focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] bg-white/90"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#5D4037] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-[#E6C2A0] focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] bg-white/90"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#5D4037] mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-[#E6C2A0] focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] bg-white/90"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white py-3 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-[1.02]">
                Send Message
              </button>
            </form>
          </div>
          <div>
            <div className="bg-[#F5EFE7] p-8 rounded-2xl shadow-md mb-8">
              <h3 className="text-xl font-semibold text-[#8B4513] mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-[#E6C2A0] text-[#8B4513]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-[#5D4037]">Address</h4>
                    <p className="mt-1 text-[#8B4513]/80">
                      123 Pottery Lane, Craft District
                      <br />
                      New Delhi, 110001, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-[#E6C2A0] text-[#8B4513]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-[#5D4037]">Phone</h4>
                    <p className="mt-1 text-[#8B4513]/80">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-[#E6C2A0] text-[#8B4513]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-[#5D4037]">Email</h4>
                    <p className="mt-1 text-[#8B4513]/80">info@mittimahal.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-[#E6C2A0] text-[#8B4513]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-[#5D4037]">Business Hours</h4>
                    <p className="mt-1 text-[#8B4513]/80">
                      Monday - Saturday: 10:00 AM - 8:00 PM
                      <br />
                      Sunday: 12:00 PM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#F5EFE7] p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-[#8B4513] mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-colors duration-300 shadow-sm"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-colors duration-300 shadow-sm"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-colors duration-300 shadow-sm"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-colors duration-300 shadow-sm"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert(`Thank you for subscribing with: ${email}`)
    setEmail("")
  }

  return (
    <footer className="bg-[#5D4037] text-white">
      {/* Newsletter Section */}
      <div className="bg-[#8B4513] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-white/80">
                Stay updated with our latest collections, artisan stories, and exclusive offers.
              </p>
            </div>
            <div className="md:w-1/2 w-full">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E6C2A0] text-white placeholder-white/60 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-[#E6C2A0] hover:bg-[#D2B48C] text-[#5D4037] font-medium rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="Mitti Mahal Logo"
                width={50}
                height={50}
                className="mr-2"
              />
              <span className="text-2xl font-bold text-white">
                MITTI<span className="text-[#E6C2A0]">MAHAL</span>
              </span>
            </div>
            <p className="text-white/70 mb-6">
              Mitti Mahal is an online platform dedicated to showcasing and selling handcrafted clay products from
              artisans across India. Our mission is to promote traditional craftsmanship and provide sustainable
              livelihoods for local communities.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E6C2A0]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/collections"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/bestsellers"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  href="/artisans"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> Artisans
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E6C2A0]">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shipping"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" /> FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E6C2A0]">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-[#E6C2A0] flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  123 Pottery Lane, Craft District
                  <br />
                  New Delhi, 110001, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#E6C2A0] flex-shrink-0" />
                <span className="text-white/70">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#E6C2A0] flex-shrink-0" />
                <span className="text-white/70">info@mittimahal.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-[#E6C2A0] flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Monday - Saturday: 10:00 AM - 8:00 PM
                  <br />
                  Sunday: 12:00 PM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 md:py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Mitti Mahal. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 sm:space-x-4 mt-4 md:mt-0">
            <Image src="/placeholder.svg?height=24&width=40" alt="Payment Method" width={40} height={24} />
            <Image src="/placeholder.svg?height=24&width=40" alt="Payment Method" width={40} height={24} />
            <Image src="/placeholder.svg?height=24&width=40" alt="Payment Method" width={40} height={24} />
            <Image src="/placeholder.svg?height=24&width=40" alt="Payment Method" width={40} height={24} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSlider />
      <SiteStats />
      <FeaturedCollections />
      <BrowseProducts />
      <Testimonials />
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  )
}

