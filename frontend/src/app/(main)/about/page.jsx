
import Image from 'next/image'
import React from 'react'

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
export default AboutUs