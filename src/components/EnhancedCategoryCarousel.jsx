import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  { icon: '🎸', label: 'Music', color: '#8b5cf6' },
  { icon: '🧘', label: 'Wellness', color: '#10b981' },
  { icon: '🍯', label: 'Food', color: '#f59e0b' },
  { icon: '🎨', label: 'Art', color: '#ec4899' },
  { icon: '🛠️', label: 'Repairs', color: '#ef4444' },
  { icon: '💻', label: 'Tech', color: '#3b82f6' },
]

export default function EnhancedCategoryCarousel() {
  const galleryRef = useRef(null)
  const cardsRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!galleryRef.current || !cardsRef.current) return

    const cards = Array.from(cardsRef.current.querySelectorAll('li'))
    if (cards.length === 0) return

    const spacing = 0.1

    const ctx = gsap.context(() => {
      function buildSeamlessLoop(items, spacing) {
        const overlap = Math.ceil(1 / spacing)
        const startTime = items.length * spacing + 0.5
        const loopTime = (items.length + overlap) * spacing + 1

        const rawSequence = gsap.timeline({ paused: true })
        const seamlessLoop = gsap.timeline({
          paused: true,
          repeat: -1,
          onRepeat() {
            if (this._time === this._dur) this._tTime += this._dur - 0.01
          },
          onUpdate() {
            // Calculate current card index
            const progress = this.progress()
            const index = Math.floor(progress * items.length) % items.length
            setActiveIndex(index)
          }
        })

        const l = items.length + overlap * 2
        let time = 0

        gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 })

        for (let i = 0; i < l; i++) {
          const index = i % items.length
          const item = items[index]
          time = i * spacing

          rawSequence
            .fromTo(
              item,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                zIndex: 100,
                duration: 0.5,
                yoyo: true,
                repeat: 1,
                ease: 'power1.in',
                immediateRender: false,
              },
              time
            )
            .fromTo(
              item,
              { xPercent: 400 },
              { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
              time
            )

          if (i <= items.length) seamlessLoop.add('label' + i, time)
        }

        rawSequence.time(startTime)
        seamlessLoop
          .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: 'none',
          })
          .fromTo(
            rawSequence,
            { time: overlap * spacing + 1 },
            {
              time: startTime,
              duration: startTime - (overlap * spacing + 1),
              immediateRender: false,
              ease: 'none',
            }
          )

        return seamlessLoop
      }

      const seamlessLoop = buildSeamlessLoop(cards, spacing)
      seamlessLoop.totalTime(0)

      // Auto-advance (can be paused)
      let autoAdvance
      if (!isPaused) {
        autoAdvance = setInterval(() => {
          gsap.to(seamlessLoop, {
            totalTime: seamlessLoop.totalTime() + spacing,
            duration: 0.5,
            ease: 'power3',
          })
        }, 3000)
      }

      const prevBtn = galleryRef.current?.querySelector('.prev')
      const nextBtn = galleryRef.current?.querySelector('.next')

      const handlePrev = () => {
        setIsPaused(true)
        gsap.to(seamlessLoop, {
          totalTime: seamlessLoop.totalTime() - spacing,
          duration: 0.5,
          ease: 'power3',
          overwrite: true,
        })
      }

      const handleNext = () => {
        setIsPaused(true)
        gsap.to(seamlessLoop, {
          totalTime: seamlessLoop.totalTime() + spacing,
          duration: 0.5,
          ease: 'power3',
          overwrite: true,
        })
      }

      prevBtn?.addEventListener('click', handlePrev)
      nextBtn?.addEventListener('click', handleNext)

      seamlessLoop._prevBtn = prevBtn
      seamlessLoop._nextBtn = nextBtn
      seamlessLoop._handlePrev = handlePrev
      seamlessLoop._handleNext = handleNext

      galleryRef.current._seamlessLoop = seamlessLoop

      return () => {
        if (autoAdvance) clearInterval(autoAdvance)
      }
    }, galleryRef)

    return () => {
      const loop = galleryRef.current?._seamlessLoop
      const prevBtn = loop?._prevBtn
      const nextBtn = loop?._nextBtn
      const handlePrev = loop?._handlePrev
      const handleNext = loop?._handleNext

      if (prevBtn && handlePrev) prevBtn.removeEventListener('click', handlePrev)
      if (nextBtn && handleNext) nextBtn.removeEventListener('click', handleNext)
      if (loop) loop.kill()

      if (galleryRef.current?._seamlessLoop) delete galleryRef.current._seamlessLoop
      ctx.revert()
    }
  }, [isPaused])

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-black mb-6 relative inline-block"
          style={{ color: '#1f2937' }}>
        Popular Categories
        <div className="absolute -bottom-2 left-0 w-16 h-1 rounded-full"
             style={{ background: 'linear-gradient(90deg, #2D68C4, #FE6F5E)' }} />
      </h2>

      <div
        ref={galleryRef}
        className="relative w-full overflow-hidden rounded-3xl"
        style={{
          height: '420px',
          background: 'linear-gradient(135deg, rgba(45, 104, 196, 0.05), rgba(254, 111, 94, 0.05))',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <ul
          ref={cardsRef}
          className="absolute w-56 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-0 list-none"
        >
          {categories.map((category, i) => (
            <li
              key={i}
              className="absolute top-0 left-0 w-56 h-72 rounded-2xl cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6
                              hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4 filter drop-shadow-lg">{category.icon}</div>
                <div className="text-xl font-bold mb-2" style={{ color: category.color }}>
                  {category.label}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Explore {category.label.toLowerCase()}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Navigation Buttons */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          <button
            className="prev w-12 h-12 rounded-full flex items-center justify-center font-semibold
                       transition-all duration-300 shadow-lg hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
              color: 'white'
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="next w-12 h-12 rounded-full flex items-center justify-center font-semibold
                       transition-all duration-300 shadow-lg hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
              color: 'white'
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {categories.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: index === activeIndex 
                  ? 'linear-gradient(135deg, #2D68C4, #FE6F5E)'
                  : 'rgba(255, 255, 255, 0.5)',
                transform: index === activeIndex ? 'scale(1.5)' : 'scale(1)'
              }}
            />
          ))}
        </div>

        {/* Pause/Play Indicator */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold"
             style={{ 
               background: 'rgba(255, 255, 255, 0.9)',
               backdropFilter: 'blur(10px)',
               color: '#6b7280'
             }}>
          {isPaused ? '⏸ Paused' : '▶ Auto'}
        </div>
      </div>
    </section>
  )
}