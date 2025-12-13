"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Smartphone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-700 relative overflow-hidden border-t border-gray-200">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#61a444] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5a9c3a] rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center mb-6 group">
              <img
                src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                alt="Yarvest"
                className="h-10 transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-600 leading-relaxed text-sm">
              Connecting communities with fresh, locally-grown produce. Supporting farmers and bringing the best to your table.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="bg-white hover:bg-[#61a444] p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#61a444]/30 border border-gray-200 hover:border-[#61a444]">
                <Facebook className="w-5 h-5 text-gray-600 hover:text-white transition-colors" />
              </a>
              <a href="#" className="bg-white hover:bg-[#61a444] p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#61a444]/30 border border-gray-200 hover:border-[#61a444]">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-white transition-colors" />
              </a>
              <a href="#" className="bg-white hover:bg-[#61a444] p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#61a444]/30 border border-gray-200 hover:border-[#61a444]">
                <Instagram className="w-5 h-5 text-gray-600 hover:text-white transition-colors" />
              </a>
              <a href="#" className="bg-white hover:bg-[#61a444] p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#61a444]/30 border border-gray-200 hover:border-[#61a444]">
                <Linkedin className="w-5 h-5 text-gray-600 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-gray-900 font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#61a444] to-transparent"></span>
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-[#61a444] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-1.5 h-0.5 bg-[#61a444] transition-all duration-300"></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/producers" className="text-gray-600 hover:text-[#61a444] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-1.5 h-0.5 bg-[#61a444] transition-all duration-300"></span>
                  Our Producers
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-600 hover:text-[#61a444] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-1.5 h-0.5 bg-[#61a444] transition-all duration-300"></span>
                  Events
                </Link>
              </li>
              <li>
                <Link href="/shops" className="text-gray-600 hover:text-[#61a444] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-1.5 h-0.5 bg-[#61a444] transition-all duration-300"></span>
                  Shops
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-600 hover:text-[#61a444] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-1.5 h-0.5 bg-[#61a444] transition-all duration-300"></span>
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-gray-900 font-bold text-lg mb-6 relative inline-block">
              Customer Service
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#61a444] to-transparent"></span>
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#61a444] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-1.5 h-0.5 bg-[#61a444] transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#61a444] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-1.5 h-0.5 bg-[#61a444] transition-all duration-300"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#61a444] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-1.5 h-0.5 bg-[#61a444] transition-all duration-300"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-[#61a444] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-1.5 h-0.5 bg-[#61a444] transition-all duration-300"></span>
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-[#61a444] transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-1.5 h-0.5 bg-[#61a444] transition-all duration-300"></span>
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Mobile Apps */}
          <div className="space-y-8">
            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-gray-900 font-bold text-lg mb-4 relative inline-block">
                Newsletter
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#61a444] to-transparent"></span>
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Subscribe to get special offers, fresh recipes, and updates from local farmers.
              </p>
              <form className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#61a444] focus:ring-2 focus:ring-[#61a444]/20 transition-all duration-300 rounded-xl shadow-sm"
                />
                <Button className="w-full bg-gradient-to-r from-[#61a444] to-[#5a9c3a] hover:from-[#5a9c3a] hover:to-[#61a444] text-white font-semibold rounded-xl shadow-lg shadow-[#61a444]/30 hover:shadow-xl hover:shadow-[#61a444]/40 transition-all duration-300 hover:scale-[1.02] group">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Mobile Apps Section */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-900 font-bold text-base mb-4">
                <div className="p-1.5 bg-gradient-to-br from-[#61a444]/10 to-[#61a444]/5 rounded-lg border border-[#61a444]/20">
                  <Smartphone className="w-4 h-4 text-[#61a444]" />
                </div>
                <span>Download Our App</span>
              </div>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://apps.apple.com/app/yarvest" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#61a444] rounded-2xl px-4 py-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-[#61a444]/20 hover:scale-[1.02] hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#61a444]/0 via-[#61a444]/5 to-[#61a444]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-9 h-9 text-gray-900 group-hover:text-[#61a444] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wide">Download on the</span>
                      <span className="text-sm font-bold text-gray-900 group-hover:text-[#61a444] leading-tight transition-colors">App Store</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#61a444] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </div>
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.yarvest" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#61a444] rounded-2xl px-4 py-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-[#61a444]/20 hover:scale-[1.02] hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#61a444]/0 via-[#61a444]/5 to-[#61a444]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-9 h-9 text-gray-900 group-hover:text-[#61a444] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wide">Get it on</span>
                      <span className="text-sm font-bold text-gray-900 group-hover:text-[#61a444] leading-tight transition-colors">Google Play</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#61a444] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="bg-gradient-to-br from-[#61a444]/10 to-[#61a444]/5 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-[#61a444]/20 group-hover:to-[#61a444]/10 transition-all duration-300 border border-[#61a444]/20 group-hover:border-[#61a444]/40 group-hover:shadow-lg group-hover:shadow-[#61a444]/20">
                <Mail className="w-5 h-5 text-[#61a444] group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Email</p>
                <p className="text-gray-900 font-medium group-hover:text-[#61a444] transition-colors">hello@yarvest.health</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="bg-gradient-to-br from-[#61a444]/10 to-[#61a444]/5 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-[#61a444]/20 group-hover:to-[#61a444]/10 transition-all duration-300 border border-[#61a444]/20 group-hover:border-[#61a444]/40 group-hover:shadow-lg group-hover:shadow-[#61a444]/20">
                <Phone className="w-5 h-5 text-[#61a444] group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Phone</p>
                <p className="text-gray-900 font-medium group-hover:text-[#61a444] transition-colors">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="bg-gradient-to-br from-[#61a444]/10 to-[#61a444]/5 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-[#61a444]/20 group-hover:to-[#61a444]/10 transition-all duration-300 border border-[#61a444]/20 group-hover:border-[#61a444]/40 group-hover:shadow-lg group-hover:shadow-[#61a444]/20">
                <MapPin className="w-5 h-5 text-[#61a444] group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Address</p>
                <p className="text-gray-900 font-medium group-hover:text-[#61a444] transition-colors">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Yarvest. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-[#61a444] transition-colors duration-300 relative group">
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#61a444] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-[#61a444] transition-colors duration-300 relative group">
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#61a444] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/cookies" className="text-gray-600 hover:text-[#61a444] transition-colors duration-300 relative group">
              Cookie Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#61a444] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

