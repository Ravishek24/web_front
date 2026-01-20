import React from 'react'
import { Star, MapPin, Heart, BadgeCheck } from 'lucide-react'

const trendingItems = [
  {
    id: 1,
    title: 'Handmade Ceramic Bowl',
    price: 25,
    image: 'https://images.unsplash.com/photo-1603697486934-686e0b3c9f06?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxQcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBoYW5kbWFkZSUyMGl0ZW1zJTIwYXJ0aXNhbiUyMGNyYWZ0cyUyMG1hcmtldHBsYWNlJTIwZ29vZHMlMjBjZXJhbWljJTIwcG90dGVyeXxlbnwwfDJ8fHwxNzY2ODQ3NDkyfDA&ixlib=rb-4.1.0&q=85',
    attribution: 'Meghna R on Unsplash',
    seller: 'Sarah Chen',
    rating: 4.9,
    location: 'Downtown',
    category: 'Art',
    verified: true,
    saved: 12
  },
  {
    id: 2,
    title: 'Guitar Lessons (Beginner)',
    price: 35,
    image: 'https://images.unsplash.com/photo-1682988447436-90a24d7623bf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxNb2Rlcm4lMjBndWl0YXIlMjBtdXNpY2FsJTIwaW5zdHJ1bWVudCUyMGNsb3NlJTIwdXAlMjBkZXRhaWxlZCUyMHByb2Zlc3Npb25hbCUyMHBob3RvZ3JhcGh5fGVufDB8MHx8fDE3NjY4NDc0OTN8MA&ixlib=rb-4.1.0&q=85',
    attribution: 'Rafael Rodrigues on Unsplash',
    seller: 'Mike Davis',
    rating: 5.0,
    location: 'Midtown',
    category: 'Music',
    verified: true,
    saved: 28
  },
  {
    id: 3,
    title: 'Organic Raw Honey',
    price: 18,
    image: 'https://pixabay.com/get/gfafafd0fa3e846c8230497430e269743552fa7a6b04b6d63ffecbd2135ead251152bd91e0be8f982b2a303218aac830b.jpg',
    attribution: 'Daria-Yakovleva on Pixabay',
    seller: 'Emma Wilson',
    rating: 4.8,
    location: 'Westside',
    category: 'Food',
    verified: false,
    saved: 15
  }
]

export default function TrendingCards() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black relative inline-block"
            style={{ color: '#1f2937' }}>
          Trending Now
          <div className="absolute -bottom-2 left-0 w-16 h-1 rounded-full"
               style={{ background: 'linear-gradient(90deg, #2D68C4, #FE6F5E)' }} />
        </h2>
        
        <a href="/marketplace" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
          View All
          <span>→</span>
        </a>
      </div>

      <div className="trending-grid">
        {trendingItems.map((item, index) => (
          <article key={item.id} 
                   className="glass-card rounded-3xl overflow-hidden card-hover group cursor-pointer"
                   style={{ 
                     boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                     animation: `fadeIn 0.6s ease ${index * 0.1}s backwards`
                   }}>
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-gray-200">
              <img 
                src={item.image}
                alt={`${item.title} - ${item.attribution}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: '#d9d9d9' }}
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                   style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}>
                {item.category}
              </div>
              
              {/* Favorite Button */}
              <button className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center
                                 bg-white/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 
                                 transition-all duration-300 hover:scale-110"
                      onClick={(e) => e.stopPropagation()}>
                <Heart size={18} className="text-gray-700" />
              </button>

              {/* Saved Count */}
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
                   style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
                <Heart size={12} className="text-red-500" fill="currentColor" />
                {item.saved}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Title and Price */}
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-gray-900 text-lg flex-1 leading-tight">
                  {item.title}
                </h4>
                <span className="font-black text-xl ml-2" style={{ color: '#2D68C4' }}>
                  ${item.price}
                </span>
              </div>

              {/* Seller Info */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                  <img src={`https://i.pravatar.cc/32?u=${item.seller}`}
                       alt={item.seller}
                       className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{item.seller}</span>
                {item.verified && (
                  <BadgeCheck size={16} className="text-blue-600" fill="currentColor" />
                )}
              </div>

              {/* Location and Rating */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin size={14} />
                  <span className="font-medium">{item.location}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-500" fill="currentColor" />
                  <span className="font-bold text-gray-800">{item.rating}</span>
                </div>
              </div>
            </div>

            {/* Quick Action on Hover */}
            <div className="px-5 pb-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                 style={{ marginTop: '-10px' }}>
              <button className="w-full py-2.5 rounded-xl font-bold text-white transition-all duration-300
                                 hover:shadow-lg hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)' }}>
                View Details
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}