import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const categories = [
  { icon: '🎸', label: 'Music' },
  { icon: '🧘', label: 'Wellness' },
  { icon: '🍯', label: 'Food' },
  { icon: '🎨', label: 'Art' },
  { icon: '🛠️', label: 'Repairs' },
  { icon: '💻', label: 'Tech' },
]

export default function PopularCategories() {
  const galleryRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    if (!galleryRef.current || !cardsRef.current) return

    const cards = Array.from(cardsRef.current.querySelectorAll('li'))
    if (cards.length === 0) return

    const spacing = 0.1
    const snap = gsap.utils.snap(spacing)

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

      const prevBtn = galleryRef.current?.querySelector('.prev')
      const nextBtn = galleryRef.current?.querySelector('.next')

      const handlePrev = () => {
        gsap.to(seamlessLoop, {
          totalTime: seamlessLoop.totalTime() - spacing,
          duration: 0.5,
          ease: 'power3',
          overwrite: true,
        })
      }
      const handleNext = () => {
        gsap.to(seamlessLoop, {
          totalTime: seamlessLoop.totalTime() + spacing,
          duration: 0.5,
          ease: 'power3',
          overwrite: true,
        })
      }

      prevBtn?.addEventListener('click', handlePrev)
      nextBtn?.addEventListener('click', handleNext)

      seamlessLoop._home_prevBtn = prevBtn
      seamlessLoop._home_nextBtn = nextBtn
      seamlessLoop._home_handlePrev = handlePrev
      seamlessLoop._home_handleNext = handleNext

      galleryRef.current._home_seamlessLoop = seamlessLoop
    }, galleryRef)

    return () => {
      const loop = galleryRef.current?._home_seamlessLoop
      const prevBtn = loop?._home_prevBtn
      const nextBtn = loop?._home_nextBtn
      const handlePrev = loop?._home_handlePrev
      const handleNext = loop?._home_handleNext

      if (prevBtn && handlePrev) prevBtn.removeEventListener('click', handlePrev)
      if (nextBtn && handleNext) nextBtn.removeEventListener('click', handleNext)
      if (loop) loop.kill()

      if (galleryRef.current?._home_seamlessLoop) delete galleryRef.current._home_seamlessLoop
      ctx.revert()
    }
  }, [])

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-black text-white mb-6 relative inline-block
        after:content-[''] after:absolute after:-bottom-2 after:left-0 
        after:w-16 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600 after:rounded">
        Popular Categories
      </h2>
      
      <div
        ref={galleryRef}
        className="relative w-full h-[400px] overflow-hidden mt-6 rounded-2xl
          bg-gradient-to-br from-indigo-500/5 to-purple-600/5"
      >
        <ul
          ref={cardsRef}
          className="absolute w-56 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-0 list-none"
        >
          {categories.map((c, i) => (
            <li
              key={i}
              className="absolute top-0 left-0 w-56 h-72 rounded-xl
                bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl
                border border-white/80 shadow-lg
                flex flex-col items-center justify-center text-center"
            >
              <span className="text-6xl mb-4">{c.icon}</span>
              <span className="text-lg font-bold text-gray-700">{c.label}</span>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          <button
            className="prev px-6 py-3 bg-indigo-500/90 border-2 border-white/30 text-white
              rounded-full font-semibold cursor-pointer transition-all duration-300
              hover:bg-indigo-500 hover:-translate-y-0.5"
          >
            Prev
          </button>
          <button
            className="next px-6 py-3 bg-indigo-500/90 border-2 border-white/30 text-white
              rounded-full font-semibold cursor-pointer transition-all duration-300
              hover:bg-indigo-500 hover:-translate-y-0.5"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

