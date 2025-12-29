'use client'

import { Facebook, Mail, MessageCircle, Twitter, Phone } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    {
      name: 'Messenger',
      href: 'https://m.me/francisco.j.moreno.d?text=Send a quote',
      icon: MessageCircle,
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/francisco.j.moreno.d',
      icon: Facebook,
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/+13525754933?text=Send a quote',
      icon: MessageCircle,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/messages/compose?recipient_id=944948624286461952',
      icon: Twitter,
    },
  ]

  const contactInfo = [
    { icon: Phone, text: '352-575-4933' },
    { icon: Phone, text: '352-575-5439' },
    { icon: Mail, text: 'son2latinmusic@gmail.com' },
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-salsa-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-display font-bold bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent mb-4">
              Son2 Latin Music
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Award-winning Latin band bringing the authentic flavors of salsa, merengue, cumbia, and more to Tampa Bay for over 10 years.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-2">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center text-gray-400 text-sm">
                  <item.icon size={16} className="mr-2 text-salsa-500" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/quote" className="block text-gray-400 hover:text-salsa-400 transition-colors text-sm">
                Request a Quote
              </a>
              <a href="/about" className="block text-gray-400 hover:text-salsa-400 transition-colors text-sm">
                About the Band
              </a>
              <a href="/videos" className="block text-gray-400 hover:text-salsa-400 transition-colors text-sm">
                Watch Videos
              </a>
              <a href="https://business.google.com/v/son2-latin-music/012385120011381777261/255a/_/rev/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block text-gray-400 hover:text-salsa-400 transition-colors text-sm">
                Read Reviews
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-8 pb-8 border-b border-gray-800">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label={social.name}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-salsa-500 to-merengue-500 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gray-800 hover:bg-gradient-to-r from-salsa-600 to-merengue-600 p-3 rounded-full transition-all duration-300">
                  <social.icon size={20} className="text-gray-300 group-hover:text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Son2 Latin Music. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Best Latin Band in Town
          </p>
        </div>
      </div>
    </footer>
  )
}
