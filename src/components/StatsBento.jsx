import React, { useEffect, useRef, useState } from 'react'
import { Users, Package, MessageCircle, TrendingUp, Sparkles } from 'lucide-react'

// Animated sentence slideshow component
function AnimatedPromoCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const sentences = [
    {
      text: "A chapter-led women's community with local roots and PAN-India reach",
      highlight: "chapter-led women's community",
      color: "#8b5cf6"
    },
    {
      text: "Connecting hundreds of women entrepreneurs and professionals across multiple cities",
      highlight: "hundreds of women entrepreneurs",
      color: "#f59e0b"
    },
    {
      text: "Through structured programs, verified members, and regular events",
      highlight: "verified members",
      color: "#10b981"
    },
    {
      text: "We create real opportunities for learning, visibility, and growth",
      highlight: "real opportunities",
      color: "#ec4899"
    },
    {
      text: "More than networking—a trusted ecosystem where women build together",
      highlight: "trusted ecosystem",
      color: "#3b82f6"
    },
    {
      text: "Women build businesses, careers, and confidence—together",
      highlight: "together",
      color: "#6366f1"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sentences.length)
        setIsAnimating(false)
      }, 500)
    }, 4000) // Change sentence every 4 seconds

    return () => clearInterval(interval)
  }, [sentences.length])

  const current = sentences[currentIndex]

  return (
    <div className="glass-card rounded-3xl p-8 card-hover col-span-2 relative overflow-hidden"
         style={{ 
           boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
           background: 'linear-gradient(135deg, rgba(180, 229, 142, 0.05) 0%, rgba(147, 181, 83, 0.05) 100%)',
           minHeight: '200px'
         }}>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0"
           style={{
             background: 'linear-gradient(135deg, rgba(180, 229, 142, 0.08) 0%, rgba(147, 181, 83, 0.08) 100%)',
             opacity: isAnimating ? 0.3 : 0,
             transition: 'opacity 0.5s ease'
           }} />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{
             background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
             backgroundSize: '200% 100%',
             animation: 'shimmer 3s infinite'
           }} />

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-5"
           style={{ 
             background: `radial-gradient(circle, ${current.color}, transparent)`,
             transition: 'background 0.5s ease'
           }} />
      
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-5"
           style={{ 
             background: 'radial-gradient(circle, #B4E58E, transparent)',
             animation: 'pulse 4s ease-in-out infinite'
           }} />

      <div className="relative z-10 flex flex-col justify-center h-full">
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center relative"
               style={{ background: 'linear-gradient(135deg, #B4E58E, #93B553)' }}>
            <Sparkles size={24} className="text-white" />
            <div className="absolute inset-0 rounded-xl opacity-30 animate-ping"
                 style={{
                   background: 'linear-gradient(135deg, #B4E58E, #93B553)'
                 }} />
          </div>
          <h3 className="font-black text-xl"
              style={{ 
                background: 'linear-gradient(135deg, #2D68C4, #93B553)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            Why Join Maadhurayam?
          </h3>
        </div>

        {/* Animated sentence display */}
        <div className="relative min-h-[120px] flex items-center">
          <p 
            className="text-2xl font-bold leading-relaxed text-gray-800 transition-all duration-500"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateY(20px) scale(0.95)' : 'translateY(0) scale(1)',
            }}
          >
            {current.text.split(current.highlight).map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < current.text.split(current.highlight).length - 1 && (
                  <span 
                    className="relative inline-block px-2 py-1 mx-1 rounded-lg transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${current.color}15, ${current.color}25)`,
                      color: current.color,
                      fontWeight: 900
                    }}
                  >
                    {current.highlight}
                    <span className="absolute inset-0 rounded-lg animate-pulse"
                          style={{ background: `${current.color}10` }} />
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>

      </div>
    </div>
  )
}

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function StatsBento() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-black mb-6 relative inline-block"
          style={{ color: '#1f2937' }}>
        Community at a Glance
        <div className="absolute -bottom-2 left-0 w-16 h-1 rounded-full"
             style={{ background: 'linear-gradient(90deg, #2D68C4, #FE6F5E)' }} />
      </h2>

      {/* Bento Grid Layout */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto' }}>
        {/* Large Card - Active Members */}
        <div className="glass-card rounded-3xl p-8 card-hover row-span-2 relative overflow-hidden"
             style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-10"
               style={{ background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)' }} />
          
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                 style={{ background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)' }}>
              <Users size={32} className="text-white" />
            </div>
            
            <div className="text-6xl font-black mb-2 gradient-text">
              <AnimatedCounter end={156} suffix="+" />
            </div>
            
            <p className="text-lg font-semibold text-gray-700 mb-4">Active Members</p>
            
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm font-bold">+12% this week</span>
            </div>

            {/* Member Avatars */}
            <div className="mt-6 flex -space-x-3">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md"
                     style={{ backgroundColor: '#94a3b8' }}>
                  <img src={`https://i.pravatar.cc/40?u=member${i}`} 
                       alt={`Member ${i}`}
                       className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center shadow-md">
                <span className="text-xs font-bold text-gray-600">+150</span>
              </div>
            </div>

            {/* Sparkline Chart */}
            <div className="mt-6 h-16 flex items-end gap-1">
              {[40, 55, 45, 65, 50, 70, 60, 75, 65, 80, 70, 85, 75, 90].map((height, i) => (
                <div key={i} className="flex-1 rounded-t transition-all duration-300 hover:opacity-70"
                     style={{ 
                       height: `${height}%`,
                       background: i === 13 ? 'linear-gradient(180deg, #2D68C4, #FE6F5E)' : '#e5e7eb'
                     }} />
              ))}
            </div>
          </div>
        </div>

        {/* Medium Card - Live Listings */}
        <div className="glass-card rounded-3xl p-6 card-hover relative overflow-hidden"
             style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 opacity-10"
               style={{ background: '#10b981' }} />
          
          <div className="relative">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                 style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <Package size={24} className="text-white" />
            </div>
            
            <div className="text-4xl font-black mb-1" style={{ color: '#10b981' }}>
              <AnimatedCounter end={70} suffix="+" />
            </div>
            
            <p className="text-sm font-semibold text-gray-700">Live Listings</p>
            
            <div className="mt-4 text-xs text-gray-600">
              <span className="font-semibold text-green-600">24 new</span> this week
            </div>
          </div>
        </div>

        {/* Medium Card - Recent Posts */}
        <div className="glass-card rounded-3xl p-6 card-hover relative overflow-hidden"
             style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 opacity-10"
               style={{ background: '#f59e0b' }} />
          
          <div className="relative">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                 style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <MessageCircle size={24} className="text-white" />
            </div>
            
            <div className="text-4xl font-black mb-1" style={{ color: '#f59e0b' }}>
              <AnimatedCounter end={24} />
            </div>
            
            <p className="text-sm font-semibold text-gray-700">Recent Posts</p>
            
            <div className="mt-4 text-xs text-gray-600">
              Last updated <span className="font-semibold">2 mins ago</span>
            </div>
          </div>
        </div>

        {/* Wide Card - Animated Promotional Message */}
        <AnimatedPromoCard />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
          .row-span-2 {
            grid-row: auto !important;
          }
          .col-span-2 {
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  )
}