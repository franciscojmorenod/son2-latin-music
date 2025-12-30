'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Mail, Phone, User } from 'lucide-react'

export default function QuotePage() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    date: '',
    duration: '',
    starttime: '',
    inoutdoor: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Send form data to API
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstname,
          lastName: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          eventDate: formData.date,
          startTime: formData.starttime,
          duration: formData.duration,
          indoorOutdoor: formData.inoutdoor,
          message: formData.message,
        }),
      })
    
      const result = await response.json()
    
      if (result.success) {
        console.log('Quote saved! ID:', result.quoteId)
        setSubmitted(true)
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false)
          setFormData({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            zip: '',
            date: '',
            duration: '',
            starttime: '',
            inoutdoor: '',
            message: '',
          })
        }, 3000)
      } else {
        alert('Error submitting quote. Please try again.')
        console.error('API error:', result.error)
      }
    } catch (error) {
      alert('Error submitting quote. Please try again.')
      console.error('Submit error:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent">
            Get a Free Quote
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you within 24 hours with a personalized quote for your event
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <User className="mr-3 text-salsa-500" />
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2 font-medium">
                  Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                    placeholder="(352) 575-4933"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Location */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MapPin className="mr-3 text-salsa-500" />
              Event Location
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="address" className="block text-gray-300 mb-2 font-medium">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                  placeholder="123 Main Street"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="city" className="block text-gray-300 mb-2 font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                    placeholder="Tampa"
                  />
                </div>
                
                <div>
                  <label htmlFor="zip" className="block text-gray-300 mb-2 font-medium">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                    placeholder="33601"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Calendar className="mr-3 text-salsa-500" />
              Event Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="date" className="block text-gray-300 mb-2 font-medium">
                  Event Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="starttime" className="block text-gray-300 mb-2 font-medium">
                  Start Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  <input
                    type="time"
                    id="starttime"
                    name="starttime"
                    value={formData.starttime}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-gray-300 mb-2 font-medium">
                  Duration *
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                  placeholder="3 hours"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="inoutdoor" className="block text-gray-300 mb-2 font-medium">
                Indoor or Outdoor? *
              </label>
              <select
                id="inoutdoor"
                name="inoutdoor"
                value={formData.inoutdoor}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
              >
                <option value="">Select one...</option>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
                <option value="both">Both (Indoor & Outdoor)</option>
              </select>
            </div>
          </div>

          {/* Additional Information */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-bold text-white mb-6">
              Additional Information
            </h2>
            
            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                Tell us about your event
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none resize-none"
                placeholder="Tell us about your event, special requests, number of guests, etc."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={submitted}
              className="px-12 py-5 bg-gradient-to-r from-salsa-600 to-merengue-600 rounded-full font-bold text-xl text-white hover:from-salsa-500 hover:to-merengue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-salsa-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitted ? 'Quote Submitted! ✓' : 'Get My Free Quote'}
            </button>
            
            {submitted && (
              <p className="mt-4 text-green-400 animate-fade-in">
                Thank you! We'll get back to you within 24 hours.
              </p>
            )}
          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-12 p-6 rounded-2xl bg-salsa-900/20 border border-salsa-500/30 text-center">
          <p className="text-gray-300 mb-2">
            <strong className="text-white">Prefer to call?</strong>
          </p>
          <p className="text-gray-300">
            Call us at{' '}
            <a href="tel:352-575-4933" className="text-salsa-400 hover:text-salsa-300 font-semibold">
              352-575-4933
            </a>{' '}
            or{' '}
            <a href="tel:352-575-5439" className="text-salsa-400 hover:text-salsa-300 font-semibold">
              352-575-5439
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
