'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function PhotosPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const photos = [
    { src: '/images/F_Ccartoon.jpg', title: 'Photo F_Ccartoon' },
    { src: '/images/F_Cicon.png', title: 'Photo F_Cicon' },
    { src: '/images/_FM1b.jpg', title: 'Photo FM1b' },
    { src: '/images/_pic05.jpg', title: 'Photo 5' },
    { src: '/images/_pic06.jpg', title: 'Photo 6' },
    { src: '/images/_pic07.jpg', title: 'Photo 7' },
    { src: '/images/_pic08.jpg', title: 'Photo 8' },
    { src: '/images/_pic09.jpg', title: 'Photo 9' },
    { src: '/images/_pic10.jpg', title: 'Photo 10' },
    { src: '/images/_pic11.jpg', title: 'Photo 11' },
    { src: '/images/_pic12.jpg', title: 'Photo 12' },
    { src: '/images/_pic13.jpg', title: 'Photo 13' },
    { src: '/images/_pic14.jpg', title: 'Photo 14' },
    { src: '/images/_pic15.jpg', title: 'Photo 15' },
    { src: '/images/_pic16.jpg', title: 'Photo 16' },
    { src: '/images/_pic17.jpg', title: 'Photo 17' },
    { src: '/images/_pic18.jpg', title: 'Photo 18' },
    { src: '/images/_pic19.jpg', title: 'Photo 19' },
    { src: '/images/_pic20.jpg', title: 'Photo 20' },
    { src: '/images/_pic21.jpg', title: 'Photo 21' },
    { src: '/images/_pic22.jpg', title: 'Photo 22' },
    { src: '/images/_pic23.jpg', title: 'Photo 23' },
    { src: '/images/_pic24.jpg', title: 'Photo 24' },
    { src: '/images/_pic25.jpg', title: 'Photo 25' },
    { src: '/images/_pic26.jpg', title: 'Photo 26' },
    { src: '/images/_pic27.jpg', title: 'Photo 27' },
    { src: '/images/_pic28.jpg', title: 'Photo 28' },
    { src: '/images/_pic29.jpg', title: 'Photo 29' },
    { src: '/images/_pic30.jpg', title: 'Photo 30' },
    { src: '/images/_pic31.jpg', title: 'Photo 31' },
    { src: '/images/_pic32.jpg', title: 'Photo 32' },
    { src: '/images/_pic33.jpg', title: 'Photo 33' },
    { src: '/images/_pic34.jpg', title: 'Photo 34' },
    { src: '/images/_pic35.jpg', title: 'Photo 35' },
    { src: '/images/_pic36.jpg', title: 'Photo 36' },
    { src: '/images/_pic37.jpg', title: 'Photo 37' },
    { src: '/images/_pic38.jpg', title: 'Photo 38' },
    { src: '/images/_pic39.jpg', title: 'Photo 39' },
    { src: '/images/_pic40.jpg', title: 'Photo 40' },
    { src: '/images/_pic41.jpg', title: 'Photo 41' },
    { src: '/images/_pic42.jpg', title: 'Photo 42' },
    { src: '/images/_pic43.jpg', title: 'Photo 43' },
    { src: '/images/_pic44.jpg', title: 'Photo 44' },
    { src: '/images/_pic45.jpg', title: 'Photo 45' },
    { src: '/images/_pic46.jpg', title: 'Photo 46' },
    { src: '/images/_pic47.jpg', title: 'Photo 47' },
    { src: '/images/_pic48.jpg', title: 'Photo 48' },
    { src: '/images/_pic49.jpg', title: 'Photo 49' },
    { src: '/images/_pic50.jpg', title: 'Photo 50' },
    { src: '/images/_pic51.jpg', title: 'Photo 51' },
    { src: '/images/_pic52.jpg', title: 'Photo 52' },
    { src: '/images/_pic53.jpg', title: 'Photo 53' },
    { src: '/images/_pic54.jpg', title: 'Photo 54' },
    { src: '/images/_pic55.jpg', title: 'Photo 55' },
    { src: '/images/_pic56.jpg', title: 'Photo 56' },
    { src: '/images/_pic57.jpg', title: 'Photo 57' },
    { src: '/images/_pic58.jpg', title: 'Photo 58' },
    { src: '/images/_pic59.jpg', title: 'Photo 59' },
    { src: '/images/_pic60.jpg', title: 'Photo 60' },
    { src: '/images/_pic61.jpg', title: 'Photo 61' },
    { src: '/images/_pic62.jpg', title: 'Photo 62' },
    { src: '/images/_pic63.jpg', title: 'Photo 63' },
    { src: '/images/_pic64.jpg', title: 'Photo 64' },
    { src: '/images/_pic65.jpg', title: 'Photo 65' },
    { src: '/images/_pic66.jpg', title: 'Photo 66' },
    { src: '/images/_pic67.jpg', title: 'Photo 67' },
    { src: '/images/_pic68.jpg', title: 'Photo 68' },
    { src: '/images/_pic69.jpg', title: 'Photo 69' },
    { src: '/images/_pic70.jpg', title: 'Photo 70' },
    { src: '/images/_pic71.jpg', title: 'Photo 71' },
    { src: '/images/_pic72.jpg', title: 'Photo 72' },
    { src: '/images/_pic73.jpg', title: 'Photo 73' },
    { src: '/images/_pic74.jpg', title: 'Photo 74' },
    { src: '/images/_pic75.jpg', title: 'Photo 75' },
    { src: '/images/_pic76.jpg', title: 'Photo 76' },
    { src: '/images/_pic77.jpg', title: 'Photo 77' },
    { src: '/images/_pic78.jpg', title: 'Photo 78' },
    { src: '/images/_pic79.jpg', title: 'Photo 79' },
    { src: '/images/_pic80.jpg', title: 'Photo 80' },
    { src: '/images/_pic81.jpg', title: 'Photo 81' },
    { src: '/images/_pic81y.JPG', title: 'Photo 81y' },
    { src: '/images/_pic82.jpg', title: 'Photo 82' },
    { src: '/images/_pic83.jpg', title: 'Photo 83' },
    { src: '/images/_pic84.jpg', title: 'Photo 84' },
    { src: '/images/_pic85.jpg', title: 'Photo 85' },
    { src: '/images/_pic86.jpg', title: 'Photo 86' },
    { src: '/images/_pic86x.jpg', title: 'Photo 86x' },
    { src: '/images/_pic87.jpg', title: 'Photo 87' },
    { src: '/images/_pic87y.JPG', title: 'Photo 87y' },
    { src: '/images/_pic88.jpg', title: 'Photo 88' },
    { src: '/images/_pic89.jpg', title: 'Photo 89' },
    { src: '/images/_pic90.jpg', title: 'Photo 90' },
    { src: '/images/_pic91.jpg', title: 'Photo 91' },
    { src: '/images/_pic92.jpg', title: 'Photo 92' },
    { src: '/images/_pic93.jpg', title: 'Photo 93' },
    { src: '/images/_pic94.jpg', title: 'Photo 94' },
    { src: '/images/_pic95.jpg', title: 'Photo 95' },
    { src: '/images/_pic96.jpg', title: 'Photo 96' },
    { src: '/images/_pic97.jpg', title: 'Photo 97' },
    { src: '/images/_pic98.jpg', title: 'Photo 98' },
    { src: '/images/_pic99.jpg', title: 'Photo 99' },
    { src: '/images/_pic100.jpg', title: 'Photo 100' },
    { src: '/images/_pic101.jpg', title: 'Photo 101' },
    { src: '/images/_pic102.jpg', title: 'Photo 102' },
    { src: '/images/_pic103.jpg', title: 'Photo 103' },
    { src: '/images/_pic104.jpg', title: 'Photo 104' },
    { src: '/images/_pic105.jpg', title: 'Photo 105' },
    { src: '/images/_pic106.jpg', title: 'Photo 106' },
    { src: '/images/_pic107.jpg', title: 'Photo 107' },
    { src: '/images/_pic108.jpg', title: 'Photo 108' },
    { src: '/images/_pic109.jpg', title: 'Photo 109' },
    { src: '/images/_pic110.jpg', title: 'Photo 110' },
    { src: '/images/_pic111.jpg', title: 'Photo 111' },
    { src: '/images/_pic112.jpg', title: 'Photo 112' },
    { src: '/images/_pic113.jpg', title: 'Photo 113' },
    { src: '/images/_pic114.jpg', title: 'Photo 114' },
    { src: '/images/_pic115.jpg', title: 'Photo 115' },
    { src: '/images/_pic116.jpg', title: 'Photo 116' },
    { src: '/images/_pic117.jpg', title: 'Photo 117' },
    { src: '/images/_pic118.jpg', title: 'Photo 118' },
    { src: '/images/_pic119.jpg', title: 'Photo 119' },
    { src: '/images/_pic120.jpg', title: 'Photo 120' },
    { src: '/images/_pic121.jpg', title: 'Photo 121' },
    { src: '/images/_pic122.jpg', title: 'Photo 122' },
    { src: '/images/_pic123.jpg', title: 'Photo 123' },
    { src: '/images/_pic124.jpg', title: 'Photo 124' },
    { src: '/images/_pic125.jpg', title: 'Photo 125' },
    { src: '/images/_pic126.jpg', title: 'Photo 126' },
    { src: '/images/_pic127.jpg', title: 'Photo 127' },
    { src: '/images/_pic128.jpg', title: 'Photo 128' },
    { src: '/images/_pic129.jpg', title: 'Photo 129' },
    { src: '/images/_pic130.jpg', title: 'Photo 130' },
    { src: '/images/_pic131.jpg', title: 'Photo 131' },
    { src: '/images/_pic132.jpg', title: 'Photo 132' },
    { src: '/images/_pic133.jpg', title: 'Photo 133' },
    { src: '/images/_pic134.jpg', title: 'Photo 134' },
    { src: '/images/_pic135.jpg', title: 'Photo 135' },
    { src: '/images/_pic136.jpg', title: 'Photo 136' },
    { src: '/images/_zpic0e.jpg', title: 'Photo Zpic0e' },
    { src: '/images/_pic0a.jpg', title: 'Photo 0a' },
    { src: '/images/_pic0b.jpg', title: 'Photo 0b' },
    { src: '/images/_pic0c.jpg', title: 'Photo 0c' },
    { src: '/images/_pic0d.jpg', title: 'Photo 0d' },
    { src: '/images/_pic01.jpg', title: 'Photo 01' },
    { src: '/images/_pic02.jpg', title: 'Photo 02' },
    { src: '/images/_pic03.jpg', title: 'Photo 03' },
    { src: '/images/_pic04.jpg', title: 'Photo 04' },
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
              {/* Actual Image */}
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              
              {/* Fallback placeholder (hidden by default, shows if image fails) */}
              <div className="hidden w-full h-full bg-gradient-to-br from-salsa-900/30 to-merengue-900/30 flex items-center justify-center">
                <p className="text-white text-center font-semibold px-4">{photo.title}</p>
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-salsa-500/20 to-merengue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                className="absolute -top-12 right-0 text-white hover:text-salsa-400 transition-colors text-xl font-bold bg-gray-800 px-4 py-2 rounded-lg"
              >
                ✕ Close
              </button>
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}