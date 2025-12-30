'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, Clock, MapPin, Mail, Phone, User, DollarSign, Users, Music } from 'lucide-react'

interface Quote {
  id: number
  first_name: string
  last_name: string
  company_name: string | null
  email: string
  phone: string
  address: string
  city: string
  zip: string
  event_date: string
  start_time: string
  duration: string
  event_type: string | null
  indoor_outdoor: string | null
  special_request_1: string | null
  total_price: number | null
  deposit_amount: number | null
  balance_due: number | null
  num_musicians: number
  num_sets: number
  num_breaks: number
  status: string
  created_at: string
}

export default function QuoteDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const quoteId = params.id as string

  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    total_price: '',
    deposit_amount: '',
    num_musicians: '3',
    num_sets: '3',
    num_breaks: '2',
    status: 'pending'
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchQuote()
    }
  }, [status, router, quoteId])

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}`)
      if (response.ok) {
        const data = await response.json()
        setQuote(data)
        setFormData({
          total_price: data.total_price || '',
          deposit_amount: data.deposit_amount || '',
          num_musicians: data.num_musicians.toString(),
          num_sets: data.num_sets.toString(),
          num_breaks: data.num_breaks.toString(),
          status: data.status
        })
      }
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total_price: formData.total_price ? parseFloat(formData.total_price) : null,
          deposit_amount: formData.deposit_amount ? parseFloat(formData.deposit_amount) : null,
          num_musicians: parseInt(formData.num_musicians),
          num_sets: parseInt(formData.num_sets),
          num_breaks: parseInt(formData.num_breaks),
          status: formData.status
        })
      })

      if (response.ok) {
        await fetchQuote()
        setEditing(false)
      }
    } catch (error) {
      console.error('Error saving quote:', error)
      alert('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Quote not found</div>
      </div>
    )
  }

  const balanceDue = formData.total_price && formData.deposit_amount 
    ? parseFloat(formData.total_price) - parseFloat(formData.deposit_amount)
    : quote.balance_due

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Quote #{quote.id} - {quote.first_name} {quote.last_name}
              </h1>
              <p className="text-gray-400">
                Submitted {formatDate(quote.created_at)}
              </p>
            </div>
            
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-3 bg-salsa-600 hover:bg-salsa-500 rounded-lg font-medium transition-colors"
              >
                Edit Quote
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditing(false)
                    fetchQuote()
                  }}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Customer & Event Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="text-salsa-400" />
                Customer Information
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Name</label>
                  <p className="text-lg">{quote.first_name} {quote.last_name}</p>
                </div>
                
                {quote.company_name && (
                  <div>
                    <label className="text-gray-400 text-sm">Company/Event</label>
                    <p className="text-lg">{quote.company_name}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-gray-400 text-sm flex items-center gap-1">
                    <Mail size={14} /> Email
                  </label>
                  <a href={`mailto:${quote.email}`} className="text-salsa-400 hover:text-salsa-300">
                    {quote.email}
                  </a>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm flex items-center gap-1">
                    <Phone size={14} /> Phone
                  </label>
                  <a href={`tel:${quote.phone}`} className="text-salsa-400 hover:text-salsa-300">
                    {quote.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Event Location */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-salsa-400" />
                Event Location
              </h2>
              
              <div className="space-y-2">
                <p className="text-lg">{quote.address}</p>
                <p className="text-gray-400">{quote.city}, FL {quote.zip}</p>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="text-salsa-400" />
                Event Details
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Event Date</label>
                  <p className="text-lg">{formatDate(quote.event_date)}</p>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm flex items-center gap-1">
                    <Clock size={14} /> Start Time
                  </label>
                  <p className="text-lg">{formatTime(quote.start_time)}</p>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm">Duration</label>
                  <p className="text-lg">{quote.duration}</p>
                </div>
                
                {quote.event_type && (
                  <div>
                    <label className="text-gray-400 text-sm">Event Type</label>
                    <p className="text-lg">{quote.event_type}</p>
                  </div>
                )}
                
                {quote.indoor_outdoor && (
                  <div>
                    <label className="text-gray-400 text-sm">Setting</label>
                    <p className="text-lg capitalize">{quote.indoor_outdoor}</p>
                  </div>
                )}
              </div>

              {quote.special_request_1 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <label className="text-gray-400 text-sm">Special Requests</label>
                  <p className="text-gray-300 mt-1">{quote.special_request_1}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Business Terms */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Status</h2>
              
              {editing ? (
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="quoted">Quoted</option>
                  <option value="booked">Booked</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              ) : (
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-yellow-400/10 text-yellow-400 capitalize">
                  {quote.status}
                </span>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="text-green-400" />
                Pricing
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Total Price</label>
                  {editing ? (
                    <input
                      type="number"
                      value={formData.total_price}
                      onChange={(e) => setFormData({...formData, total_price: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white mt-1"
                      placeholder="1300.00"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-green-400">
                      {quote.total_price ? `$${quote.total_price.toFixed(2)}` : 'Not set'}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm">Deposit (50%)</label>
                  {editing ? (
                    <input
                      type="number"
                      value={formData.deposit_amount}
                      onChange={(e) => setFormData({...formData, deposit_amount: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white mt-1"
                      placeholder="650.00"
                    />
                  ) : (
                    <p className="text-xl">
                      {quote.deposit_amount ? `$${quote.deposit_amount.toFixed(2)}` : 'Not set'}
                    </p>
                  )}
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <label className="text-gray-400 text-sm">Balance Due</label>
                  <p className="text-xl font-bold">
                    {balanceDue ? `$${balanceDue.toFixed(2)}` : 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Details */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Music className="text-salsa-400" />
                Performance
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm flex items-center gap-1">
                    <Users size={14} /> Number of Musicians
                  </label>
                  {editing ? (
                    <input
                      type="number"
                      value={formData.num_musicians}
                      onChange={(e) => setFormData({...formData, num_musicians: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white mt-1"
                      min="1"
                      max="20"
                    />
                  ) : (
                    <p className="text-lg">{quote.num_musicians}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm">Number of Sets</label>
                  {editing ? (
                    <input
                      type="number"
                      value={formData.num_sets}
                      onChange={(e) => setFormData({...formData, num_sets: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white mt-1"
                      min="1"
                      max="10"
                    />
                  ) : (
                    <p className="text-lg">{quote.num_sets}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm">Number of Breaks</label>
                  {editing ? (
                    <input
                      type="number"
                      value={formData.num_breaks}
                      onChange={(e) => setFormData({...formData, num_breaks: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white mt-1"
                      min="0"
                      max="10"
                    />
                  ) : (
                    <p className="text-lg">{quote.num_breaks}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}