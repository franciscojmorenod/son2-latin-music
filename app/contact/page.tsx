'use client'

import { useState } from 'react'
import { Mail, Phone, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    
    setSubmitted(true)
    
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: '',
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['352-575-4933', '352-575-5439'],
      links: ['tel:352-575-4933', 'tel:352-575-5439'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['son2latinmusic@gmail.com'],
      links: ['mailto:son2latinmusic@gmail.com'],
    },
    {
      icon: MessageCircle,
      title: 'Social Media',
      details: ['Facebook', 'WhatsApp', 'Messenger'],
      links: [
        'https://www.facebook.com/francisco.j.moreno.d',
        'https://wa.me/+13525754933?text=Hello',
        'https://m.me/francisco.j.moreno.d',
      ],
    },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-slide-in-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstname" className="block text-gray-300 mb-2 font-medium">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastname" className="block text-gray-300 mb-2 font-medium">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-300 mb-2 font-medium">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                    placeholder="(352) 575-4933"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full px-8 py-4 bg-gradient-to-r from-salsa-600 to-merengue-600 rounded-lg font-bold text-lg text-white hover:from-salsa-500 hover:to-merengue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-salsa-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitted ? 'Message Sent! ✓' : 'Send Message'}
                </button>
                
                {submitted && (
                  <p className="mt-4 text-green-400 text-center animate-fade-in">
                    Thank you for your message! We'll be in touch soon.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="animate-slide-in-right space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Whether you're planning a wedding, corporate event, or private party, we'd love to hear from you. Reach out through any of these channels:
              </p>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-900/30 border border-gray-700/30 hover:border-salsa-500/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-r from-salsa-600 to-merengue-600">
                      <method.icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-2">{method.title}</h3>
                      <div className="space-y-1">
                        {method.details.map((detail, idx) => (
                          <a
                            key={idx}
                            href={method.links[idx]}
                            className="block text-gray-400 hover:text-salsa-400 transition-colors"
                            target={method.title === 'Social Media' ? '_blank' : undefined}
                            rel={method.title === 'Social Media' ? 'noopener noreferrer' : undefined}
                          >
                            {detail}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-salsa-900/20 to-merengue-900/20 border border-salsa-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Looking for something specific?</h3>
              <div className="space-y-3">
                <a
                  href="/quote"
                  className="block px-6 py-3 rounded-lg bg-gradient-to-r from-salsa-600 to-merengue-600 text-white font-semibold text-center hover:from-salsa-500 hover:to-merengue-500 transition-all duration-300"
                >
                  Request a Quote →
                </a>
                <a
                  href="/about"
                  className="block px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Learn More About Us →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
