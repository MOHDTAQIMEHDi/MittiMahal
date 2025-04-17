import { Clock, Facebook, Instagram, Mail, MapPin, Phone, ShoppingCart, Twitter, Youtube } from 'lucide-react'
import React from 'react'

function ContactUs() {
  return (
    <div className='min-h-screen bg-[#f8f5f2]'>
        {/* <header className="bg-[#854d27] text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <span className="text-2xl font-bold">
                Mitti Mahal
              </span>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-[#d4a373] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </div>
              </div>
            </div>
          </header> */}
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
                    placeholder="Enter your name"
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
                    placeholder="name@example.com"
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

export default ContactUs