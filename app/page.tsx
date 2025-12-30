'use client'

import Link from 'next/link'
import { Music, Users, Award, Calendar } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Music,
      title: 'Authentic Latin Sound',
      description: 'Prime-selected mixture of salsa, merengue, bachatas, boleros, cumbias, and vallenatos',
    },
    {
      icon: Users,
      title: 'Professional Musicians',
      description: 'Award-winning recording artists with over 10 years of experience',
    },
    {
      icon: Award,
      title: 'Proven Track Record',
      description: 'Performed at Hard Rock Cafe, Florida Fairgrounds, and countless private events',
    },
    {
      icon: Calendar,
      title: 'Statewide Service',
      description: 'Based in Tampa, serving all of Florida for your special occasions',
    },
  ]

  return (
    <div className="relative">
   <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
         <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover"
            onLoadedMetadata={(e) => {
              e.currentTarget.currentTime = 95; // Start at 1:00
            }}
            onTimeUpdate={(e) => {
              if (e.currentTarget.currentTime >= 155) { // Stop at 2:00
                e.currentTarget.currentTime = 95; // Loop back to 1:00
              }
            }}
          >
            <source src="/videos/SOBERBIAMENTE-4K.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-salsa-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-merengue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-salsa-400 via-merengue-400 to-cumbia-400 bg-clip-text text-transparent animate-slide-up drop-shadow-2xl">
                Son2
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2 bg-gradient-to-r from-cumbia-300 to-salsa-300 bg-clip-text text-transparent animate-slide-up drop-shadow-2xl" style={{ animationDelay: '0.2s' }}>
                Latín Music
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-white mb-4 font-display italic animate-slide-up drop-shadow-lg" style={{ animationDelay: '0.4s' }}>
              Our Latin Thing
            </p>
            
            <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-3xl mx-auto animate-slide-up drop-shadow-lg" style={{ animationDelay: '0.6s' }}>
              Award-winning Latin band bringing authentic salsa, merengue, and cumbia to Tampa Bay for over a decade
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <Link
                href="/quote"
                className="group relative px-8 py-4 bg-gradient-to-r from-salsa-600 to-merengue-600 rounded-full font-bold text-lg text-white hover:from-salsa-500 hover:to-merengue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-salsa-500/50 overflow-hidden"
              >
                <span className="relative z-10">Get a Free Quote</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              
              <Link
                href="/videos"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-salsa-400"
              >
                Watch Us Perform
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent">
              Why Choose Son2 Latin Music?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional musicians delivering unforgettable performances for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-salsa-500/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-salsa-500/0 to-merengue-500/0 group-hover:from-salsa-500/10 group-hover:to-merengue-500/10 rounded-2xl transition-all duration-300"></div>
                
                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-salsa-600 to-merengue-600 mb-4 group-hover:shadow-lg group-hover:shadow-salsa-500/50 transition-all duration-300">
                    <feature.icon size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-salsa-900/20 to-merengue-900/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Ready to Bring the Latin Flavor?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book Son2 Latin Music for your next event and experience the authentic sound that has captivated Tampa Bay for over 10 years
          </p>
          <Link
            href="/quote"
            className="inline-block px-10 py-5 bg-gradient-to-r from-salsa-600 to-merengue-600 rounded-full font-bold text-xl text-white hover:from-salsa-500 hover:to-merengue-500 transition-all duration-300 shadow-2xl hover:shadow-salsa-500/50 animate-pulse-glow"
          >
            Get Your Free Quote Now
          </Link>
        </div>
      </section>
    </div>
  )
}
