'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Calendar, Users, FileText, CheckCircle, Clock, LogOut, DollarSign, CheckCheck } from 'lucide-react'

interface Quote {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  city: string
  event_date: string
  status: string
  created_at: string
}

interface Stats {
  total: number
  pending: number
  quoted: number
  booked: number
  deposit_paid: number
  fully_booked: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [stats, setStats] = useState<Stats>({ 
    total: 0, 
    pending: 0, 
    quoted: 0, 
    booked: 0,
    deposit_paid: 0,
    fully_booked: 0
  })
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchQuotes()
    }
  }, [status, router])

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/admin/quotes')
      if (response.ok) {
        const data = await response.json()
        setQuotes(data.quotes)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'quoted': return 'text-blue-400 bg-blue-400/10'
      case 'booked': return 'text-green-400 bg-green-400/10'
      case 'deposit_paid': return 'text-purple-400 bg-purple-400/10'
      case 'fully_booked': return 'text-emerald-400 bg-emerald-400/10'
      case 'completed': return 'text-gray-400 bg-gray-400/10'
      case 'cancelled': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getDisplayStatus = (status: string) => {
    switch (status) {
      case 'fully_booked': return 'Fully Booked'
      case 'deposit_paid': return 'Deposit Paid'
      default: return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const filteredQuotes = statusFilter === 'all' 
    ? quotes 
    : quotes.filter(q => q.status === statusFilter)

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent">
                SON2 LATIN MUSIC
              </h1>
              <p className="text-gray-400 text-sm">Admin Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">
                Welcome, {session?.user?.name || 'Admin'}!
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-salsa-400" size={24} />
              <span className="text-3xl font-bold">{stats.total}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Quotes</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Clock className="text-yellow-400" size={24} />
              <span className="text-3xl font-bold">{stats.pending}</span>
            </div>
            <p className="text-gray-400 text-sm">Pending</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-blue-400" size={24} />
              <span className="text-3xl font-bold">{stats.quoted}</span>
            </div>
            <p className="text-gray-400 text-sm">Quoted</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="text-green-400" size={24} />
              <span className="text-3xl font-bold">{stats.booked}</span>
            </div>
            <p className="text-gray-400 text-sm">Booked</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-purple-400" size={24} />
              <span className="text-3xl font-bold">{stats.deposit_paid}</span>
            </div>
            <p className="text-gray-400 text-sm">Deposit Paid</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <CheckCheck className="text-emerald-400" size={24} />
              <span className="text-3xl font-bold">{stats.fully_booked}</span>
            </div>
            <p className="text-gray-400 text-sm">Fully Booked</p>
          </div>
        </div>

        {/* Status Filters */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'all' 
                  ? 'bg-salsa-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'pending' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setStatusFilter('quoted')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'quoted' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Quoted ({stats.quoted})
            </button>
            <button
              onClick={() => setStatusFilter('booked')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'booked' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Booked ({stats.booked})
            </button>
            <button
              onClick={() => setStatusFilter('deposit_paid')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'deposit_paid' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Deposit Paid ({stats.deposit_paid})
            </button>
            <button
              onClick={() => setStatusFilter('fully_booked')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'fully_booked' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Fully Booked ({stats.fully_booked})
            </button>
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">
              {statusFilter === 'all' ? 'All Quote Requests' : `${getDisplayStatus(statusFilter)} Quotes`}
            </h2>
          </div>

          {filteredQuotes.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p>No {statusFilter === 'all' ? '' : statusFilter} quotes yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Event Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{quote.first_name} {quote.last_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">{quote.email}</div>
                        <div className="text-sm text-gray-400">{quote.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          {formatDate(quote.event_date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {quote.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                          {getDisplayStatus(quote.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(quote.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => router.push(`/admin/quotes/${quote.id}`)}
                          className="text-salsa-400 hover:text-salsa-300 font-medium"
                        >
                          View Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}