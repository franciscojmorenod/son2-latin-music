'use client'

import { Play, Pause } from 'lucide-react'
import { useState, useRef } from 'react'

export default function AudiosPage() {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null)
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])

  // Add your actual audio files here
  const tracks = [
    { file: '/audio/track1.mp3', title: 'Salsa Caliente', artist: 'Son2 Latin Music' },
    { file: '/audio/track2.mp3', title: 'Merengue Fever', artist: 'Son2 Latin Music' },
    { file: '/audio/track3.mp3', title: 'Cumbia Nights', artist: 'Son2 Latin Music' },
    { file: '/audio/track4.mp3', title: 'Bachata Dreams', artist: 'Son2 Latin Music' },
    { file: '/audio/track5.mp3', title: 'Vallenato Soul', artist: 'Son2 Latin Music' },
    { file: '/audio/track6.mp3', title: 'Bolero Romance', artist: 'Son2 Latin Music' },
  ]

  const togglePlay = (index: number) => {
    const audio = audioRefs.current[index]
    if (!audio) return

    if (currentPlaying === index) {
      audio.pause()
      setCurrentPlaying(null)
    } else {
      // Pause currently playing track
      if (currentPlaying !== null && audioRefs.current[currentPlaying]) {
        audioRefs.current[currentPlaying]!.pause()
      }
      audio.play()
      setCurrentPlaying(index)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent">
            Audio Samples
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Listen to our authentic Latin sound and feel the rhythm
          </p>
        </div>

        {/* Audio Player List */}
        <div className="space-y-4">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700/50 hover:border-salsa-500/50 transition-all duration-300 hover:transform hover:scale-102 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                {/* Play Button */}
                <button
                  onClick={() => togglePlay(index)}
                  className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-r from-salsa-600 to-merengue-600 flex items-center justify-center hover:from-salsa-500 hover:to-merengue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-salsa-500/50"
                >
                  {currentPlaying === index ? (
                    <Pause size={24} className="text-white" />
                  ) : (
                    <Play size={24} className="text-white ml-1" />
                  )}
                </button>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg truncate group-hover:text-salsa-400 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{track.artist}</p>
                </div>

                {/* Audio Element (Hidden) */}
                <audio
                  ref={(el) => {
                    audioRefs.current[index] = el
                  }}
                  src={track.file}
                  onEnded={() => setCurrentPlaying(null)}
                />

                {/* Visual Indicator */}
                {currentPlaying === index && (
                  <div className="flex gap-1 items-end h-8">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className="w-1 bg-gradient-to-t from-salsa-500 to-merengue-500 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 100 + 20}%`,
                          animationDelay: `${bar * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Progress Bar (HTML5 Audio Controls) */}
              <div className="mt-4">
                <audio
                  controls
                  className="w-full"
                  style={{ display: currentPlaying === index ? 'block' : 'none' }}
                >
                  <source src={track.file} type="audio/mpeg" />
                </audio>
              </div>
            </div>
          ))}
        </div>

        {/* Note for adding audio */}
        <div className="mt-12 p-6 rounded-xl bg-salsa-900/20 border border-salsa-500/30 text-center">
          <p className="text-gray-300">
            <strong className="text-salsa-400">Note:</strong> Add your audio files to the <code className="bg-gray-800 px-2 py-1 rounded">/public/audio</code> folder and update the track paths in this page.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-salsa-900/30 to-merengue-900/30 border border-salsa-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            Love Our Sound?
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Book Son2 Latin Music for your event and bring the party to life!
          </p>
          <a
            href="/quote"
            className="inline-block px-8 py-4 bg-gradient-to-r from-salsa-600 to-merengue-600 rounded-full font-bold text-white hover:from-salsa-500 hover:to-merengue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-salsa-500/50"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </div>
  )
}
