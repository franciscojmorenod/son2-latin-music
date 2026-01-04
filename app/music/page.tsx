'use client'

import { useState, useEffect } from 'react'
import { Music, ShoppingCart, Play, Pause, DollarSign } from 'lucide-react'

interface Track {
  id: number
  title: string
  artist: string
  genre: string
  price: number
  preview_url: string
  description: string
  duration_seconds: number
}

export default function MusicStorePage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)
  const [audioElements, setAudioElements] = useState<{ [key: number]: HTMLAudioElement }>({})

  useEffect(() => {
    fetchTracks()
  }, [])

  const fetchTracks = async () => {
    try {
      const response = await fetch('/api/music/tracks')
      if (response.ok) {
        const data = await response.json()
        setTracks(data.tracks)
      }
    } catch (error) {
      console.error('Error fetching tracks:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePlay = (trackId: number, previewUrl: string) => {
    if (playingTrack === trackId) {
      // Pause current track
      audioElements[trackId]?.pause()
      setPlayingTrack(null)
    } else {
      // Stop all other tracks
      Object.values(audioElements).forEach(audio => audio.pause())
      
      // Play this track
      if (!audioElements[trackId]) {
        const audio = new Audio(previewUrl)
        audio.onended = () => setPlayingTrack(null)
        setAudioElements(prev => ({ ...prev, [trackId]: audio }))
        audio.play()
      } else {
        audioElements[trackId].play()
      }
      setPlayingTrack(trackId)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading music store...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent">
            Music Store
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Download our original Latin music tracks - High quality MP3s for your collection
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-salsa-500/50 transition-all duration-300"
            >
              <div className="p-6">
                {/* Track Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{track.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{track.artist}</p>
                    <span className="inline-block px-3 py-1 bg-salsa-600/20 text-salsa-400 rounded-full text-xs font-medium">
                      {track.genre}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-salsa-400">${track.price}</div>
                    <div className="text-gray-500 text-xs">USD</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4">{track.description}</p>

                {/* Duration */}
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <Music size={16} className="mr-2" />
                  <span>{formatDuration(track.duration_seconds)} (Full Track)</span>
                </div>

                {/* Preview Player */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-900/50 rounded-lg">
                  <button
                    onClick={() => togglePlay(track.id, track.preview_url)}
                    className="w-12 h-12 flex items-center justify-center bg-salsa-600 hover:bg-salsa-500 rounded-full transition-colors"
                  >
                    {playingTrack === track.id ? (
                      <Pause size={20} className="text-white" />
                    ) : (
                      <Play size={20} className="text-white ml-1" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">60-Second Preview</p>
                    <p className="text-gray-400 text-xs">Sample quality - Full track is high quality MP3</p>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => window.location.href = `/music/purchase/${track.id}`}
                  className="w-full py-3 bg-gradient-to-r from-salsa-600 to-merengue-600 hover:from-salsa-500 hover:to-merengue-500 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Buy Full Track - ${track.price}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-salsa-900/20 border border-salsa-500/30 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-3">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
            <div>
              <div className="text-3xl mb-2">🎵</div>
              <p className="font-semibold mb-1">1. Preview</p>
              <p className="text-sm">Listen to 60-second samples</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💰</div>
              <p className="font-semibold mb-1">2. Pay with Zelle</p>
              <p className="text-sm">Quick & secure payment</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⬇️</div>
              <p className="font-semibold mb-1">3. Download</p>
              <p className="text-sm">Get your high-quality MP3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}