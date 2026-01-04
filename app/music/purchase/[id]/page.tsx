'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Music, Upload, ArrowLeft } from 'lucide-react'

interface Track {
  id: number
  title: string
  artist: string
  price: number
}

export default function PurchasePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [track, setTrack] = useState<Track | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [screenshot, setScreenshot] = useState<File | null>(null)

  useEffect(() => {
    fetchTrack()
  }, [])

  const fetchTrack = async () => {
    try {
      const response = await fetch(`/api/music/tracks/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setTrack(data.track)
      }
    } catch (error) {
      console.error('Error fetching track:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Upload screenshot to Vercel Blob
      let screenshotUrl = ''
      if (screenshot) {
        const formData = new FormData()
        formData.append('file', screenshot)
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          screenshotUrl = uploadData.url
        }
      }

      // Submit order
      const response = await fetch('/api/music/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackId: params.id,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          paymentScreenshotUrl: screenshotUrl,
        }),
      })

      if (response.ok) {
        alert('Order submitted! We\'ll email you the download link within 24 hours after confirming payment.')
        router.push('/music')
      } else {
        alert('Error submitting order. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Track not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push('/music')}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Music Store
        </button>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {/* Track Info */}
          <div className="bg-gradient-to-r from-salsa-600 to-merengue-600 p-6 text-white">
            <div className="flex items-center mb-4">
              <Music size={48} className="mr-4" />
              <div>
                <h1 className="text-3xl font-bold">{track.title}</h1>
                <p className="text-salsa-100">{track.artist}</p>
              </div>
            </div>
            <div className="text-4xl font-bold">${track.price}</div>
          </div>

          {/* Payment Instructions */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Payment Instructions</h2>
            
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-yellow-400 font-bold mb-2">📱 Pay with Zelle</h3>
              <p className="text-gray-300 mb-2">Send <strong className="text-white">${track.price}</strong> to:</p>
              <div className="bg-gray-900 p-3 rounded text-center">
                <p className="text-salsa-400 text-xl font-bold">son2latinmusic@gmail.com</p>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Use Zelle app or your bank's Zelle feature
              </p>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                  placeholder="john@example.com"
                />
                <p className="text-gray-400 text-sm mt-1">We'll send the download link here</p>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Phone (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-salsa-500 focus:ring-2 focus:ring-salsa-500/20 transition-all outline-none"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Payment Screenshot (Optional but speeds up processing)
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-salsa-500/50 transition-colors">
                  <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                    className="hidden"
                    id="screenshot"
                  />
                  <label htmlFor="screenshot" className="cursor-pointer">
                    <span className="text-salsa-400 hover:text-salsa-300">
                      {screenshot ? screenshot.name : 'Click to upload screenshot'}
                    </span>
                    <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-salsa-600 to-merengue-600 hover:from-salsa-500 hover:to-merengue-500 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Order'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
              <p className="text-gray-300 text-sm">
                ✅ After submitting, we'll verify your payment and email you a download link within 24 hours (usually much faster!)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}