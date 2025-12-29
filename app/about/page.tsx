'use client'

import Link from 'next/link'
import { Briefcase, MapPin, Heart } from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      icon: Briefcase,
      title: 'Professionals',
      description: 'We have done plenty of private, corporate and family events. WE ARE PROFESSIONAL MUSICIANS & Recording Artists. We show and leave on time. We are never intrusive and do everything strictly by the book for your peace of mind.',
    },
    {
      icon: MapPin,
      title: 'StateWide',
      description: 'We are based in Tampa FL, but We cover the entire state. We have performed in national and international events. So DO NOT HESITATE to make us an offer we can\'t refuse, and WE WILL BE THERE to bring the GENUINE LATIN FLAVOR to your special day.',
    },
    {
      icon: Heart,
      title: 'Personal Touch',
      description: 'We always manage to find the special note that makes it unique to the group or family. We perform music according to The Best Tradition of our musical treasure.',
    },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent">
            About Son2 Latin Music
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed italic font-display">
            "Our prime-selected mixture of salsa, merengue, bachatas, boleros, cumbias, vallenatos, folkloric and so much more will set the perfect mood for a great time"
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 hover:border-salsa-500/50 transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-salsa-500/0 to-merengue-500/0 group-hover:from-salsa-500/10 group-hover:to-merengue-500/10 rounded-2xl transition-all duration-300"></div>
              
              <div className="relative">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-salsa-600 to-merengue-600 mb-6 group-hover:shadow-lg group-hover:shadow-salsa-500/50 transition-all duration-300">
                  <feature.icon size={40} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                
                {index === features.length - 1 && (
                  <div className="mt-6 space-y-2">
                    <p className="text-center font-bold text-salsa-400">You will NOT be disappointed.</p>
                    <p className="text-center font-bold text-merengue-400">That is OUR GUARANTEE !!!</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-salsa-500/30">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Get In Touch
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Phone</p>
                <a href="tel:352-575-4933" className="text-salsa-400 hover:text-salsa-300 transition-colors font-medium block">
                  352-575-4933
                </a>
                <a href="tel:352-575-5439" className="text-salsa-400 hover:text-salsa-300 transition-colors font-medium block">
                  352-575-5439
                </a>
              </div>
              
              <div className="text-center">
                <p className="text-gray-400 mb-2">Email</p>
                <a href="mailto:son2latinmusic@gmail.com" className="text-salsa-400 hover:text-salsa-300 transition-colors font-medium">
                  son2latinmusic@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="px-8 py-4 bg-gradient-to-r from-salsa-600 to-merengue-600 rounded-full font-bold text-center text-white hover:from-salsa-500 hover:to-merengue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-salsa-500/50"
              >
                Get a Quote
              </Link>
              
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-salsa-400"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
