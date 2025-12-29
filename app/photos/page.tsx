'use client'

import { useState } from 'react'

export default function PhotosPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Placeholder for photos - you'll need to add your actual image paths
  const photos = [
    { src: '/images/photo1.jpg', title: 'Live Performance 1' },
    { src: '/images/photo2.jpg', title: 'Band Setup' },
    { src: '/images/photo3.jpg', title: 'Crowd Engagement' },
    { src: '/images/photo4.jpg', title: 'Stage Presence' },
    { src: '/images/photo5.jpg', title: 'Corporate Event' },
    { src: '/images/photo6.jpg', title: 'Wedding Performance' },
    { src: '/images/photo7.jpg', title: 'Festival Show' },
    { src: '/images/photo8.jpg', title: 'Private Party' },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Moments captured from our performances across Florida
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-800/50 border border-gray-700/50 hover:border-salsa-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedImage(photo.src)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-salsa-500/20 to-merengue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-full h-full bg-gradient-to-br from-salsa-900/30 to-merengue-900/30 flex items-center justify-center">
                <p className="text-white text-center font-semibold px-4">{photo.title}</p>
              </div>
              {/* When you add real images, replace the above div with:
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-semibold text-sm">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-[90vh]">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-salsa-400 transition-colors text-xl"
              >
                ✕ Close
              </button>
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Note for adding photos */}
        <div className="mt-12 p-6 rounded-xl bg-salsa-900/20 border border-salsa-500/30 text-center">
          <p className="text-gray-300">
            <strong className="text-salsa-400">Note:</strong> Add your band photos to the <code className="bg-gray-800 px-2 py-1 rounded">/public/images</code> folder and update the photo paths in this page.
          </p>
        </div>
      </div>
    </div>
  )
}
