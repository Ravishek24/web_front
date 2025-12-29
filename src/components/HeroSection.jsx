import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { MoveRight, Users, TrendingUp, Package, User } from 'lucide-react'
import AnimatedGradientBackground from './AnimatedGradientBackground'

export default function HeroSection() {
  const heroRef = useRef(null)
  const [hoveredNode, setHoveredNode] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero content on mount
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })
      
      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      })
      
      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
      })
      
      gsap.from('.hero-stats', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      })

      // Floating animation for hero illustration
      gsap.to('.hero-float', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      })

      // Animate decorative shapes
      gsap.to('.shape-1', {
        rotation: 360,
        duration: 20,
        ease: 'linear',
        repeat: -1
      })
      
      gsap.to('.shape-2', {
        rotation: -360,
        duration: 15,
        ease: 'linear',
        repeat: -1
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative overflow-hidden w-full flex items-center"
         style={{
           height: 'calc(100vh - 60px)',
           padding: '40px 60px',
           boxShadow: '0 20px 60px rgba(45, 104, 196, 0.3)'
         }}>
      
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground containerRef={heroRef} />

      <div className="hero-grid relative z-20 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="hero-title text-white font-black mb-6"
              style={{ fontSize: '4rem', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Connect, Trade, and <span className="relative">
              Grow
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12">
                <path d="M0,8 Q50,2 100,8 T200,8" fill="none" stroke="#93B553" strokeWidth="4" />
              </svg>
            </span>
          </h1>
          
          <p className="hero-subtitle text-white/95 text-2xl mb-8 font-medium max-w-xl">
            Building meaningful connections that drive growth. Join a trusted, women-led community of local businesses and creative professionals.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-wrap gap-4 mb-12">
            <button className="btn-primary flex items-center gap-2 bg-white text-blue-600 shadow-2xl"
                    style={{ fontSize: '1.1rem' }}>
              Join our family
              <MoveRight size={20} />
            </button>
            <a href="/marketplace">
              <button className="btn-secondary bg-white/20 text-white border-white/40 flex items-center gap-2"
                      style={{ backdropFilter: 'blur(10px)', fontSize: '1.1rem' }}>
                Browse Marketplace
                <MoveRight size={20} />
              </button>
            </a>
          </div>

          {/* Social Proof Stats */}
          <div className="flex flex-wrap gap-8">
            <div className="hero-stats">
              <div className="flex items-center gap-2 text-white">
                <Users size={20} className="opacity-80" />
                <span className="text-2xl font-bold">156+</span>
              </div>
              <p className="text-white/80 text-sm font-medium mt-1">Active Members</p>
            </div>
            <div className="hero-stats">
              <div className="flex items-center gap-2 text-white">
                <Package size={20} className="opacity-80" />
                <span className="text-2xl font-bold">70+</span>
              </div>
              <p className="text-white/80 text-sm font-medium mt-1">Live Listings</p>
            </div>
            <div className="hero-stats">
              <div className="flex items-center gap-2 text-white">
                <TrendingUp size={20} className="opacity-80" />
                <span className="text-2xl font-bold">↑ 12%</span>
              </div>
              <p className="text-white/80 text-sm font-medium mt-1">Growth This Week</p>
            </div>
          </div>

          {/* Live Activity Indicator */}
          <div className="mt-8 flex items-center gap-3 hero-stats">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                     style={{ backgroundColor: '#94a3b8' }}>
                  <img src="https://i.pravatar.cc/32?u=user${i}" 
                       alt="Member avatar"
                       className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-sm font-semibold">5 members active now</span>
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="hero-float relative hidden lg:block">
          <div className="relative w-full h-96">
            {/* Glowing backdrop effect */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30"
                 style={{
                   background: 'radial-gradient(circle at center, rgba(254, 111, 94, 0.4) 0%, rgba(45, 104, 196, 0.3) 50%, transparent 100%)',
                   transform: 'scale(1.2)'
                 }} />
            

            {/* Enhanced Network Visualization */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {/* Animated Connection Lines with Gradient Flow */}
              <svg 
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 1 }}
              >
                <defs>
                  {/* Gradient for flowing lines */}
                  <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#76EFE3" stopOpacity="0">
                      <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="50%" stopColor="#B4E58E" stopOpacity="0.8">
                      <animate attributeName="offset" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#76EFE3" stopOpacity="0">
                      <animate attributeName="offset" values="1;1;1" dur="3s" repeatCount="indefinite" />
                    </stop>
                  </linearGradient>

                  <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#76EFE3" stopOpacity="0">
                      <animate attributeName="offset" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                    </stop>
                    <stop offset="50%" stopColor="#93B553" stopOpacity="0.8">
                      <animate attributeName="offset" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                    </stop>
                    <stop offset="100%" stopColor="#76EFE3" stopOpacity="0">
                      <animate attributeName="offset" values="1;1;1" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                    </stop>
                  </linearGradient>

                  {/* Blur filter for glow */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Main connection lines with base color */}
                <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#76EFE3" strokeWidth="2" opacity="0.3" />
                <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#76EFE3" strokeWidth="2" opacity="0.3" />
                <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="#76EFE3" strokeWidth="2" opacity="0.3" />
                <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="#76EFE3" strokeWidth="2" opacity="0.3" />
                <line x1="20%" y1="30%" x2="30%" y2="70%" stroke="#76EFE3" strokeWidth="1.5" opacity="0.25" />
                <line x1="80%" y1="30%" x2="70%" y2="70%" stroke="#76EFE3" strokeWidth="1.5" opacity="0.25" />

                {/* Animated flowing lines on top */}
                <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="url(#flowGradient1)" strokeWidth="3" filter="url(#glow)" />
                <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="url(#flowGradient2)" strokeWidth="3" filter="url(#glow)" />
                <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="url(#flowGradient1)" strokeWidth="3" filter="url(#glow)" style={{ animationDelay: '1s' }} />
                <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="url(#flowGradient2)" strokeWidth="3" filter="url(#glow)" style={{ animationDelay: '1.5s' }} />

                {/* Animated data packets traveling along connections */}
                <circle r="4" fill="#B4E58E" filter="url(#glow)">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M 20,30 L 50,50" />
                </circle>
                <circle r="4" fill="#93B553" filter="url(#glow)">
                  <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s" path="M 50,50 L 80,30" />
                </circle>
                <circle r="4" fill="#B4E58E" filter="url(#glow)">
                  <animateMotion dur="3.5s" repeatCount="indefinite" begin="1s" path="M 30,70 L 50,50" />
                </circle>
                <circle r="4" fill="#93B553" filter="url(#glow)">
                  <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.5s" path="M 50,50 L 70,70" />
                </circle>
              </svg>

              {/* Person 1 - Top Left - Enhanced with pulse animation */}
              <div 
                className="absolute top-[20%] left-[15%] z-10 cursor-pointer transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredNode(1)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="relative">
                  {/* Breathing pulse effect */}
                  <div className="absolute inset-0 rounded-full animate-ping"
                       style={{
                         background: '#B4E58E',
                         opacity: hoveredNode === 1 ? 0.6 : 0.3,
                         animationDuration: '2s'
                       }} />
                  <div className="absolute inset-0 rounded-full blur-xl"
                       style={{
                         background: '#B4E58E',
                         opacity: hoveredNode === 1 ? 0.7 : 0.5,
                         transform: hoveredNode === 1 ? 'scale(1.8)' : 'scale(1.5)',
                         transition: 'all 0.3s'
                       }} />
                  <div className="relative rounded-full p-4 shadow-2xl transition-all duration-300"
                       style={{
                         background: hoveredNode === 1 
                           ? 'linear-gradient(135deg, #B4E58E, #93B553)' 
                           : '#B4E58E',
                         boxShadow: hoveredNode === 1
                           ? '0 0 40px rgba(180, 229, 142, 0.8), 0 0 80px rgba(180, 229, 142, 0.5)'
                           : '0 0 30px rgba(180, 229, 142, 0.5), 0 0 60px rgba(180, 229, 142, 0.3)',
                         transform: hoveredNode === 1 ? 'scale(1.1)' : 'scale(1)'
                       }}>
                    <User size={48} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Person 2 - Center (Larger) - Hub Node */}
              <div 
                className="absolute top-[40%] left-1/2 transform -translate-x-1/2 z-20 cursor-pointer transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredNode(2)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="relative">
                  {/* Enhanced breathing effect for hub */}
                  <div className="absolute inset-0 rounded-full animate-ping"
                       style={{
                         background: '#B4E58E',
                         opacity: hoveredNode === 2 ? 0.7 : 0.4,
                         animationDuration: '2.5s'
                       }} />
                  <div className="absolute inset-0 rounded-full blur-2xl"
                       style={{
                         background: '#B4E58E',
                         opacity: hoveredNode === 2 ? 0.8 : 0.6,
                         transform: hoveredNode === 2 ? 'scale(2.2)' : 'scale(1.8)',
                         transition: 'all 0.3s'
                       }} />
                  <div className="relative rounded-full p-5 shadow-2xl transition-all duration-300"
                       style={{
                         background: hoveredNode === 2
                           ? 'linear-gradient(135deg, #B4E58E, #93B553)'
                           : '#B4E58E',
                         boxShadow: hoveredNode === 2
                           ? '0 0 50px rgba(180, 229, 142, 0.8), 0 0 100px rgba(180, 229, 142, 0.6)'
                           : '0 0 40px rgba(180, 229, 142, 0.6), 0 0 80px rgba(180, 229, 142, 0.4)',
                         transform: hoveredNode === 2 ? 'scale(1.15)' : 'scale(1)'
                       }}>
                    <User size={64} className="text-white" strokeWidth={3} />
                  </div>
                  {/* Ring indicator for hub */}
                  <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"
                       style={{ 
                         animationDuration: '3s',
                         opacity: hoveredNode === 2 ? 1 : 0.6
                       }} />
                </div>
              </div>

              {/* Person 3 - Top Right */}
              <div 
                className="absolute top-[20%] right-[15%] z-10 cursor-pointer transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredNode(3)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-ping"
                       style={{
                         background: '#B4E58E',
                         opacity: hoveredNode === 3 ? 0.6 : 0.3,
                         animationDuration: '2s',
                         animationDelay: '0.5s'
                       }} />
                  <div className="absolute inset-0 rounded-full blur-xl"
                       style={{
                         background: '#B4E58E',
                         opacity: hoveredNode === 3 ? 0.7 : 0.5,
                         transform: hoveredNode === 3 ? 'scale(1.8)' : 'scale(1.5)',
                         transition: 'all 0.3s'
                       }} />
                  <div className="relative rounded-full p-4 shadow-2xl transition-all duration-300"
                       style={{
                         background: hoveredNode === 3
                           ? 'linear-gradient(135deg, #B4E58E, #93B553)'
                           : '#B4E58E',
                         boxShadow: hoveredNode === 3
                           ? '0 0 40px rgba(180, 229, 142, 0.8), 0 0 80px rgba(180, 229, 142, 0.5)'
                           : '0 0 30px rgba(180, 229, 142, 0.5), 0 0 60px rgba(180, 229, 142, 0.3)',
                         transform: hoveredNode === 3 ? 'scale(1.1)' : 'scale(1)'
                       }}>
                    <User size={48} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Person 4 - Bottom Left */}
              <div 
                className="absolute bottom-[15%] left-[25%] z-10 cursor-pointer transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredNode(4)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-ping"
                       style={{
                         background: '#B4E58E',
                         opacity: hoveredNode === 4 ? 0.6 : 0.3,
                         animationDuration: '2s',
                         animationDelay: '1s'
                       }} />
                  <div className="absolute inset-0 rounded-full blur-xl"
                       style={{
                         background: '#B4E58E',
                         opacity: hoveredNode === 4 ? 0.7 : 0.5,
                         transform: hoveredNode === 4 ? 'scale(1.6)' : 'scale(1.4)',
                         transition: 'all 0.3s'
                       }} />
                  <div className="relative rounded-full p-3.5 shadow-2xl transition-all duration-300"
                       style={{
                         background: hoveredNode === 4
                           ? 'linear-gradient(135deg, #B4E58E, #93B553)'
                           : '#B4E58E',
                         boxShadow: hoveredNode === 4
                           ? '0 0 35px rgba(180, 229, 142, 0.8), 0 0 70px rgba(180, 229, 142, 0.5)'
                           : '0 0 25px rgba(180, 229, 142, 0.5), 0 0 50px rgba(180, 229, 142, 0.3)',
                         transform: hoveredNode === 4 ? 'scale(1.1)' : 'scale(1)'
                       }}>
                    <User size={44} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Person 5 - Bottom Right */}
              <div 
                className="absolute bottom-[15%] right-[25%] z-10 cursor-pointer transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredNode(5)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-ping"
                       style={{
                         background: '#B4E58E',
                         opacity: hoveredNode === 5 ? 0.6 : 0.3,
                         animationDuration: '2s',
                         animationDelay: '1.5s'
                       }} />
                  <div className="absolute inset-0 rounded-full blur-xl"
                       style={{
                         background: '#B4E58E',
                         opacity: hoveredNode === 5 ? 0.7 : 0.5,
                         transform: hoveredNode === 5 ? 'scale(1.6)' : 'scale(1.4)',
                         transition: 'all 0.3s'
                       }} />
                  <div className="relative rounded-full p-3.5 shadow-2xl transition-all duration-300"
                       style={{
                         background: hoveredNode === 5
                           ? 'linear-gradient(135deg, #B4E58E, #93B553)'
                           : '#B4E58E',
                         boxShadow: hoveredNode === 5
                           ? '0 0 35px rgba(180, 229, 142, 0.8), 0 0 70px rgba(180, 229, 142, 0.5)'
                           : '0 0 25px rgba(180, 229, 142, 0.5), 0 0 50px rgba(180, 229, 142, 0.3)',
                         transform: hoveredNode === 5 ? 'scale(1.1)' : 'scale(1)'
                       }}>
                    <User size={44} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Enhanced ambient particles */}
              <div className="absolute top-[10%] left-[5%] w-4 h-4 rounded-full bg-[#B4E58E] opacity-70 shadow-lg"
                   style={{ 
                     animation: 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite',
                     boxShadow: '0 0 20px rgba(180, 229, 142, 0.6)'
                   }} />
              <div className="absolute top-[10%] right-[5%] w-4 h-4 rounded-full bg-[#93B553] opacity-70 shadow-lg"
                   style={{ 
                     animation: 'ping 5s cubic-bezier(0, 0, 0.2, 1) infinite',
                     animationDelay: '1s',
                     boxShadow: '0 0 20px rgba(147, 181, 83, 0.6)'
                   }} />
              <div className="absolute bottom-[5%] left-[15%] w-3 h-3 rounded-full bg-[#76EFE3] opacity-60 shadow-lg"
                   style={{ 
                     animation: 'ping 6s cubic-bezier(0, 0, 0.2, 1) infinite',
                     animationDelay: '2s',
                     boxShadow: '0 0 15px rgba(118, 239, 227, 0.6)'
                   }} />
              <div className="absolute bottom-[5%] right-[15%] w-3 h-3 rounded-full bg-[#76EFE3] opacity-60 shadow-lg"
                   style={{ 
                     animation: 'ping 7s cubic-bezier(0, 0, 0.2, 1) infinite',
                     animationDelay: '3s',
                     boxShadow: '0 0 15px rgba(118, 239, 227, 0.6)'
                   }} />
              
              {/* Pulsing glow effect around illustration */}
              <div className="absolute inset-0 -z-10 rounded-full"
                   style={{
                     background: 'radial-gradient(circle, rgba(254, 111, 94, 0.2) 0%, transparent 70%)',
                     animation: 'pulse 3s ease-in-out infinite',
                     transform: 'scale(1.1)'
                   }} />
            </div>
            
            {/* Enhanced Floating Notification Cards */}
            <div className="absolute top-8 -left-8 z-30 glass-card rounded-2xl p-4 shadow-2xl backdrop-blur-xl transform hover:scale-105 transition-transform duration-300"
                 style={{
                   background: 'rgba(255, 255, 255, 0.95)',
                   border: '2px solid rgba(255, 255, 255, 0.3)',
                   animation: 'float 4s ease-in-out infinite',
                   boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 30px rgba(254, 111, 94, 0.2)'
                 }}>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative"
                     style={{ 
                       background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
                       boxShadow: '0 0 20px rgba(254, 111, 94, 0.5)'
                     }}>
                  <span className="text-white text-xl font-bold">+</span>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-75"
                     style={{ background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)' }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">New Member</p>
                  <p className="text-xs text-gray-600 font-semibold">Just joined!</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 -right-8 z-30 glass-card rounded-2xl p-4 shadow-2xl backdrop-blur-xl transform hover:scale-105 transition-transform duration-300"
                 style={{
                   background: 'rgba(255, 255, 255, 0.95)',
                   border: '2px solid rgba(255, 255, 255, 0.3)',
                   animation: 'float 5s ease-in-out infinite',
                   boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 30px rgba(45, 104, 196, 0.2)'
                 }}>
              <div className="flex items-center gap-3">
                <div className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>🎉</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Sale Made!</p>
                  <p className="text-xs text-gray-600 font-semibold">2 mins ago</p>
                </div>
              </div>
            </div>

            {/* Additional floating notification - Connection Status */}
            <div className="absolute top-1/2 right-0 z-30 glass-card rounded-xl p-3 shadow-xl backdrop-blur-xl transform -translate-y-1/2 hover:scale-105 transition-transform duration-300"
                 style={{
                   background: 'rgba(255, 255, 255, 0.9)',
                   border: '2px solid rgba(255, 255, 255, 0.3)',
                   animation: 'float 6s ease-in-out infinite',
                   boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2), 0 0 20px rgba(254, 111, 94, 0.15)'
                 }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-gray-800">Live Activity</span>
              </div>
            </div>

            {/* Enhanced floating particles representing data flow */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/80 shadow-lg"
                 style={{ 
                   animation: 'float 3s ease-in-out infinite',
                   boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                 }} />
            <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-white/80 shadow-lg"
                 style={{ 
                   animation: 'float 4s ease-in-out infinite',
                   animationDelay: '1s',
                   boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                 }} />
            <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-white/70 shadow-lg"
                 style={{ 
                   animation: 'float 5s ease-in-out infinite',
                   animationDelay: '2s',
                   boxShadow: '0 0 8px rgba(255, 255, 255, 0.7)'
                 }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  )
}