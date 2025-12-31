'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, Clock, MapPin, Mail, Phone, User, DollarSign, Edit, Save, X } from 'lucide-react'

interface Quote {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  event_date: string
  start_time: string
  duration: string
  indoor_outdoor: string | null
  special_request_1: string | null
  total_price: number | string | null
  deposit_amount: number | string | null
  balance_due: number | string | null
  num_musicians: number
  num_sets: number
  num_breaks: number
  status: string
  created_at: string
}

// Helper to safely format currency
const formatCurrency = (value: any): string => {
  if (!value) return 'Not set';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return 'Not set';
  return `$${num.toFixed(2)}`;
};

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
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    event_date: '',
    start_time: '',
    duration: '',
    indoor_outdoor: '',
    special_request_1: '',
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
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          zip: data.zip || '',
          event_date: data.event_date || '',
          start_time: data.start_time || '',
          duration: data.duration || '',
          indoor_outdoor: data.indoor_outdoor || '',
          special_request_1: data.special_request_1 || '',
          total_price: data.total_price?.toString() || '',
          deposit_amount: data.deposit_amount?.toString() || '',
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
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          event_date: formData.event_date,
          start_time: formData.start_time,
          duration: formData.duration,
          indoor_outdoor: formData.indoor_outdoor || null,
          special_request_1: formData.special_request_1 || null,
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
        alert('Quote updated successfully!')
      } else {
        alert('Failed to save changes')
      }
    } catch (error) {
      console.error('Error saving quote:', error)
      alert('Error saving changes')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditing(false)
    if (quote) {
      setFormData({
        first_name: quote.first_name || '',
        last_name: quote.last_name || '',
        email: quote.email || '',
        phone: quote.phone || '',
        address: quote.address || '',
        city: quote.city || '',
        zip: quote.zip || '',
        event_date: quote.event_date || '',
        start_time: quote.start_time || '',
        duration: quote.duration || '',
        indoor_outdoor: quote.indoor_outdoor || '',
        special_request_1: quote.special_request_1 || '',
        total_price: quote.total_price?.toString() || '',
        deposit_amount: quote.deposit_amount?.toString() || '',
        num_musicians: quote.num_musicians.toString(),
        num_sets: quote.num_sets.toString(),
        num_breaks: quote.num_breaks.toString(),
        status: quote.status
      })
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

  const calculateBalance = () => {
    if (formData.total_price && formData.deposit_amount) {
      return (parseFloat(formData.total_price) - parseFloat(formData.deposit_amount)).toFixed(2)
    }
    if (quote?.balance_due) {
      const num = typeof quote.balance_due === 'string' ? parseFloat(quote.balance_due) : quote.balance_due;
      return num.toFixed(2);
    }
    return '0.00'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-400/10 text-yellow-400'
      case 'quoted': return 'bg-blue-400/10 text-blue-400'
      case 'booked': return 'bg-green-400/10 text-green-400'
      case 'completed': return 'bg-gray-400/10 text-gray-400'
      case 'cancelled': return 'bg-red-400/10 text-red-400'
      default: return 'bg-gray-400/10 text-gray-400'
    }
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
                className="flex items-center gap-2 px-6 py-3 bg-salsa-600 hover:bg-salsa-500 rounded-lg font-medium transition-colors"
              >
                <Edit size={18} />
                Edit Quote
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Information - EDITABLE */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="text-salsa-400" />
              Customer Information
            </h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-sm block mb-1">First Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  />
                ) : (
                  <p className="text-lg">{quote.first_name}</p>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Last Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  />
                ) : (
                  <p className="text-lg">{quote.last_name}</p>
                )}
              </div>
              
              <div>
                <label className="text-gray-400 text-sm flex items-center gap-1 mb-1">
                  <Mail size={14} /> Email
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  />
                ) : (
                  <a href={`mailto:${quote.email}`} className="text-salsa-400 hover:text-salsa-300">
                    {quote.email}
                  </a>
                )}
              </div>
              
              <div>
                <label className="text-gray-400 text-sm flex items-center gap-1 mb-1">
                  <Phone size={14} /> Phone
                </label>
                {editing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  />
                ) : (
                  <a href={`tel:${quote.phone}`} className="text-salsa-400 hover:text-salsa-300">
                    {quote.phone}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Event Location - EDITABLE */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-salsa-400" />
              Event Location
            </h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Address</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  />
                ) : (
                  <p className="text-lg">{quote.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">City</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                    />
                  ) : (
                    <p className="text-lg">{quote.city}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-1">ZIP</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.zip}
                      onChange={(e) => setFormData({...formData, zip: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                    />
                  ) : (
                    <p className="text-lg">{quote.zip}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Event Details - EDITABLE */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="text-salsa-400" />
              Event Details
            </h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Event Date</label>
                {editing ? (
                  <input
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  />
                ) : (
                  <p className="text-lg">{formatDate(quote.event_date)}</p>
                )}
              </div>
              
              <div>
                <label className="text-gray-400 text-sm flex items-center gap-1 mb-1">
                  <Clock size={14} /> Start Time
                </label>
                {editing ? (
                  <input
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  />
                ) : (
                  <p className="text-lg">{formatTime(quote.start_time)}</p>
                )}
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-1">Duration</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                    placeholder="3 hours"
                  />
                ) : (
                  <p className="text-lg">{quote.duration}</p>
                )}
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-1">Setting</label>
                {editing ? (
                  <select
                    value={formData.indoor_outdoor}
                    onChange={(e) => setFormData({...formData, indoor_outdoor: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="both">Both</option>
                  </select>
                ) : (
                  <p className="text-lg capitalize">{quote.indoor_outdoor || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Special Requests</label>
                {editing ? (
                  <textarea
                    value={formData.special_request_1}
                    onChange={(e) => setFormData({...formData, special_request_1: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none resize-none"
                  />
                ) : (
                  <p className="text-gray-300">{quote.special_request_1 || 'None'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Status - EDITABLE */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="text-green-400" />
              Pricing & Status
            </h2>
            
            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Quote Status</label>
                {editing ? (
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="quoted">Quoted</option>
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(quote.status)}`}>
                    {quote.status}
                  </span>
                )}
              </div>

              {/* Total Price */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Total Price</label>
                {editing ? (
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.total_price}
                      onChange={(e) => setFormData({...formData, total_price: e.target.value})}
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                      placeholder="1300.00"
                    />
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-green-400">
                    {formatCurrency(quote.total_price)}
                  </p>
                )}
              </div>
              
              {/* Deposit */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Deposit Amount</label>
                {editing ? (
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.deposit_amount}
                      onChange={(e) => setFormData({...formData, deposit_amount: e.target.value})}
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                      placeholder="650.00"
                    />
                  </div>
                ) : (
                  <p className="text-xl">
                    {formatCurrency(quote.deposit_amount)}
                  </p>
                )}
              </div>
              
              {/* Balance Due */}
              <div className="pt-4 border-t border-gray-700">
                <label className="text-gray-400 text-sm">Balance Due</label>
                <p className="text-xl font-bold">
                  ${calculateBalance()}
                </p>
              </div>

              {/* Musicians */}
              <div className="pt-4 border-t border-gray-700">
                <label className="text-gray-400 text-sm block mb-2">Number of Musicians</label>
                {editing ? (
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.num_musicians}
                    onChange={(e) => setFormData({...formData, num_musicians: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  />
                ) : (
                  <p className="text-lg">{quote.num_musicians}</p>
                )}
              </div>

              {/* Sets */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Number of Sets</label>
                {editing ? (
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.num_sets}
                    onChange={(e) => setFormData({...formData, num_sets: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
                  />
                ) : (
                  <p className="text-lg">{quote.num_sets}</p>
                )}
              </div>

              {/* Breaks */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Number of Breaks</label>
                {editing ? (
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.num_breaks}
                    onChange={(e) => setFormData({...formData, num_breaks: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 outline-none"
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
  )
}