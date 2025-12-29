import React, { useState } from 'react'
import HeroSection from '../components/HeroSection'
import StatsBento from '../components/StatsBento'
import EnhancedCategoryCarousel from '../components/EnhancedCategoryCarousel'
import TrendingCards from '../components/TrendingCards'
import ActivityFeed from '../components/ActivityFeed'

export default function Home() {
  const [showFacebookModal, setShowFacebookModal] = useState(false)

  return (
    <>
      {/* Hero Section - Full Page */}
      <HeroSection />

      <div className="min-h-screen" style={{ background: '#f8fafc' }}>
        <div className="container py-10">

          {/* Stats Bento Grid */}
          <StatsBento />

          {/* Video & Recent Posts Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-black mb-6 relative inline-block"
                style={{ color: '#1f2937' }}>
              Featured Content
              <div className="absolute -bottom-2 left-0 w-16 h-1 rounded-full"
                   style={{ background: 'linear-gradient(90deg, #2D68C4, #FE6F5E)' }} />
            </h2>

            <div className="grid gap-6" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
              {/* Video Card */}
              <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-96">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/51uVH-sEvk0?autoplay=0&mute=1&controls=1&showinfo=0&rel=0"
                    title="Community Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-3xl"
                  />
                </div>
              </div>

              {/* Recent Posts & Community Card */}
              <div className="flex flex-col gap-6">
                {/* Recent Posts */}
                <div className="glass-card rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-bold text-gray-900">Recent Posts</h3>
                    <a href="/feed" className="text-blue-600 font-bold hover:underline text-sm flex items-center gap-1">
                      View All →
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 1, time: '2h ago' },
                      { id: 2, time: '4h ago' }
                    ].map((post) => (
                      <div key={post.id} className="relative aspect-square rounded-2xl overflow-hidden
                                                     group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300
                                      flex items-center justify-center text-5xl">
                          📷
                        </div>
                        
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                        
                        <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold"
                             style={{ background: 'rgba(45, 104, 196, 0.95)', color: 'white', backdropFilter: 'blur(10px)' }}>
                          Share ↗
                        </div>
                        
                        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg text-xs font-semibold"
                             style={{ background: 'rgba(0, 0, 0, 0.7)', color: 'white', backdropFilter: 'blur(10px)' }}>
                          {post.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Community Highlight Card */}
                <div className="glass-card rounded-3xl p-6 shadow-xl relative overflow-hidden">
                  {/* Subtle gradient border effect */}
                  <div className="absolute inset-0 rounded-3xl"
                       style={{
                         background: 'linear-gradient(135deg, rgba(45, 104, 196, 0.1), rgba(254, 111, 94, 0.1))',
                         zIndex: 0
                       }} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-3 shadow-md"
                           style={{ background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)' }}>
                        <span className="text-xl">👥</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Our Community</h3>
                        <p className="text-xs text-gray-600 font-semibold">Join 156+ active members</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      Discover amazing services and products from your local community members.
                    </p>
                    
                    <div className="flex gap-2">
                      <a href="/community-stories" className="flex-1">
                        <button className="w-full py-2.5 rounded-xl font-bold text-white transition-all duration-300
                                         hover:-translate-y-1 hover:shadow-lg text-sm"
                                style={{ background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)' }}>
                          Explore
                        </button>
                      </a>
                      <button className="flex-1 py-2.5 rounded-xl font-bold border-2 transition-all duration-300
                                       hover:-translate-y-1 text-sm"
                              style={{ borderColor: '#2D68C4', color: '#2D68C4' }}>
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              @media (max-width: 1024px) {
                .grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
          </section>

          {/* Enhanced Category Carousel */}
          <EnhancedCategoryCarousel />

          {/* Trending Cards */}
          <TrendingCards />

          {/* Facebook CTA - Made less prominent */}
          <section className="mb-12">
            <div className="glass-card rounded-3xl p-6 flex items-center justify-between gap-6"
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.05), rgba(37, 99, 235, 0.05))',
                   border: '2px solid rgba(59, 130, 246, 0.2)'
                 }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold shadow-md"
                     style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', color: 'white' }}>
                  f
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Follow us on Facebook</h3>
                  <p className="text-gray-600 text-sm">Get updates, events, and community highlights</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowFacebookModal(true)}
                className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-300
                           hover:-translate-y-1 hover:shadow-xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}>
                View Page →
              </button>
            </div>
          </section>

          {/* Activity Feed */}
          <ActivityFeed />
        </div>
      </div>

      {/* Facebook Modal */}
      {showFacebookModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setShowFacebookModal(false)}
        >
          <div
            className="w-11/12 max-w-5xl h-5/6 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ animation: 'slideIn 0.3s ease' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b flex items-center justify-between"
                 style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center
                                text-xl font-bold"
                     style={{ color: '#2563eb' }}>
                  f
                </div>
                <div>
                  <div className="font-bold text-white">Facebook Page</div>
                  <div className="text-sm text-white/90">Community Updates & Announcements</div>
                </div>
              </div>
              <button
                onClick={() => setShowFacebookModal(false)}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 text-white
                           flex items-center justify-center text-2xl font-bold
                           transition-all duration-300"
              >
                ×
              </button>
            </div>

            {/* Facebook Iframe */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src="https://www.facebook.com/share/19zBwb5zUW/"
                className="w-full h-full border-0"
                title="Facebook Page"
                allow="encrypted-media"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  )
}