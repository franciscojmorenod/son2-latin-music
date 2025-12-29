'use client'

export default function VideosPage() {
  const youtubeVideos = [
    { id: 'kHQKBdQHR1Q', title: 'Soberbiamente' },
    { id: 'bCLYmUtPmNE', title: 'Soy Lo Prohibido' },
    { id: 'OxQ3cRGBmO0', title: 'Cuatro Venezolano' },
    { id: 'r372aaF6t50', title: 'Cóncavo y Convexo' },
  ]

  const localVideos = [
    { file: 'SON2_TRAILER_BOQUITA SALA.mp4', title: "Boquita Sala'" },
    { file: 'SON2_TRAILER_Moliendo_Cafe-1.mp4', title: 'Moliendo Café' },
    { file: 'SON2_TRAILER_CALI.mp4', title: 'Cali Pachanguero' },
    { file: 'SON2_TRAILER_ LA GOTA FRIA.mp4', title: 'La Gota Fría' },
    { file: 'SON2_TRAILER_ABUSA_CALI_PALBAI.mp4', title: 'Varios - Mix 1' },
    { file: 'SON2_TRAILER_FM.mp4', title: 'Varios - Mix 2' },
    { file: 'SON2_TRAILER_Que Muchacho-1.mp4', title: 'Que Muchacho' },
    { file: 'SON2_TRAILER_ MOSAICO.mp4', title: 'Mosaico' },
    { file: 'SON2_TRAILER_Porro_Sabanero.mp4', title: 'Porro Sabanero' },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent">
            Video Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch Son2 Latin Music perform live and experience the energy we bring to every event
          </p>
        </div>

        {/* YouTube Videos Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-salsa-500 to-merengue-500 mr-4 rounded-full"></div>
            Featured Performances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {youtubeVideos.map((video, index) => (
              <div
                key={video.id}
                className="group rounded-xl overflow-hidden bg-gray-800/50 border border-gray-700/50 hover:border-salsa-500/50 transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white text-center group-hover:text-salsa-400 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Videos Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-cumbia-500 to-salsa-500 mr-4 rounded-full"></div>
            More Performances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localVideos.map((video, index) => (
              <div
                key={index}
                className="group rounded-xl overflow-hidden bg-gray-800/50 border border-gray-700/50 hover:border-salsa-500/50 transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video bg-gray-900">
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster="/son2video.png"
                  >
                    <source src={`/videos/${video.file}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white text-center group-hover:text-salsa-400 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center p-8 rounded-2xl bg-gradient-to-r from-salsa-900/30 to-merengue-900/30 border border-salsa-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            Like What You See?
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Book us for your next event and experience this energy live!
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
