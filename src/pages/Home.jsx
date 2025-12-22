import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [showFacebookModal, setShowFacebookModal] = useState(false);
  const galleryRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!galleryRef.current || !cardsRef.current) return;

    const cards = Array.from(cardsRef.current.querySelectorAll('li'));
    if (cards.length === 0) return;

    const spacing = 0.1;
    const snap = gsap.utils.snap(spacing);

    // Use a GSAP context so React StrictMode / remounts don't leave behind inline styles/tweens.
    const ctx = gsap.context(() => {
      function buildSeamlessLoop(items, spacing) {
        const overlap = Math.ceil(1 / spacing); // extra animations on either side for seamlessness
        const startTime = items.length * spacing + 0.5;
        const loopTime = (items.length + overlap) * spacing + 1;

        const rawSequence = gsap.timeline({ paused: true });
        const seamlessLoop = gsap.timeline({
          paused: true, // controlled via scrub
          repeat: -1,
          onRepeat() {
            // same edge-case fix as the demo
            if (this._time === this._dur) this._tTime += this._dur - 0.01;
          },
        });

        const l = items.length + overlap * 2;
        let time = 0;

        // Initial state (matches demo)
        gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

        for (let i = 0; i < l; i++) {
          const index = i % items.length;
          const item = items[index];
          time = i * spacing;

          rawSequence
            // Match the demo exactly (fade/scale in then out via yoyo+repeat).
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
              time,
            )
            .fromTo(
              item,
              { xPercent: 400 },
              { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
              time,
            );

          // Optional like the demo (helps if you ever want to jump to labels)
          if (i <= items.length) seamlessLoop.add('label' + i, time);
        }

        rawSequence.time(startTime);
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
            },
          );

        return seamlessLoop;
      }

      const seamlessLoop = buildSeamlessLoop(cards, spacing);

      // Button-only control (no auto-sliding)
      // Initialize the seamlessLoop at time 0
      seamlessLoop.totalTime(0);

      const prevBtn = galleryRef.current?.querySelector('.prev');
      const nextBtn = galleryRef.current?.querySelector('.next');

      // Clicking Prev/Next scrubs the animation backward/forward
      const handlePrev = () => {
        gsap.to(seamlessLoop, {
          totalTime: seamlessLoop.totalTime() - spacing,
          duration: 0.5,
          ease: 'power3',
          overwrite: true,
        });
      };
      const handleNext = () => {
        gsap.to(seamlessLoop, {
          totalTime: seamlessLoop.totalTime() + spacing,
          duration: 0.5,
          ease: 'power3',
          overwrite: true,
        });
      };

      prevBtn?.addEventListener('click', handlePrev);
      nextBtn?.addEventListener('click', handleNext);

      // Stash for cleanup outside the context
      seamlessLoop._home_prevBtn = prevBtn;
      seamlessLoop._home_nextBtn = nextBtn;
      seamlessLoop._home_handlePrev = handlePrev;
      seamlessLoop._home_handleNext = handleNext;

      // Expose for debugging if needed
      galleryRef.current._home_seamlessLoop = seamlessLoop;
    }, galleryRef);

    return () => {
      // ctx.revert() kills/reverts all GSAP stuff created within the context.
      // We still remove DOM listeners explicitly.
      const loop = galleryRef.current?._home_seamlessLoop;
      const prevBtn = loop?._home_prevBtn;
      const nextBtn = loop?._home_nextBtn;
      const handlePrev = loop?._home_handlePrev;
      const handleNext = loop?._home_handleNext;

      if (prevBtn && handlePrev) prevBtn.removeEventListener('click', handlePrev);
      if (nextBtn && handleNext) nextBtn.removeEventListener('click', handleNext);
      if (loop) loop.kill();

      if (galleryRef.current?._home_seamlessLoop) delete galleryRef.current._home_seamlessLoop;
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fireMoveBorder {
          0% { left: 0px; top: 0px; transform: rotate(0deg); }
          24.9% { left: 0px; top: 0px; transform: rotate(0deg); }
          25% { left: 0px; top: 0px; transform: rotate(90deg); }
          49.9% { left: 0px; top: calc(100% - 8px); transform: rotate(90deg); }
          50% { left: 0px; top: calc(100% - 8px); transform: rotate(180deg); }
          74.9% { left: calc(100% - 8px); top: calc(100% - 8px); transform: rotate(180deg); }
          75% { left: calc(100% - 8px); top: calc(100% - 8px); transform: rotate(270deg); }
          99.9% { left: calc(100% - 8px); top: 0px; transform: rotate(270deg); }
          100% { left: 0px; top: 0px; transform: rotate(360deg); }
        }
        
        @keyframes fireMoveBorder2 {
          0% { left: calc(100% - 8px); top: 0px; transform: rotate(270deg); }
          24.9% { left: calc(100% - 8px); top: 0px; transform: rotate(270deg); }
          25% { left: calc(100% - 8px); top: 0px; transform: rotate(0deg); }
          49.9% { left: 0px; top: 0px; transform: rotate(0deg); }
          50% { left: 0px; top: 0px; transform: rotate(90deg); }
          74.9% { left: 0px; top: calc(100% - 8px); transform: rotate(90deg); }
          75% { left: 0px; top: calc(100% - 8px); transform: rotate(180deg); }
          99.9% { left: calc(100% - 8px); top: calc(100% - 8px); transform: rotate(180deg); }
          100% { left: calc(100% - 8px); top: 0px; transform: rotate(270deg); }
        }
        
        @keyframes fireMoveBorder3 {
          0% { left: 0px; top: calc(100% - 8px); transform: rotate(90deg); }
          24.9% { left: 0px; top: calc(100% - 8px); transform: rotate(90deg); }
          25% { left: 0px; top: calc(100% - 8px); transform: rotate(180deg); }
          49.9% { left: calc(100% - 8px); top: calc(100% - 8px); transform: rotate(180deg); }
          50% { left: calc(100% - 8px); top: calc(100% - 8px); transform: rotate(270deg); }
          74.9% { left: calc(100% - 8px); top: 0px; transform: rotate(270deg); }
          75% { left: calc(100% - 8px); top: 0px; transform: rotate(0deg); }
          99.9% { left: 0px; top: 0px; transform: rotate(0deg); }
          100% { left: 0px; top: calc(100% - 8px); transform: rotate(90deg); }
        }
        
        @keyframes fireTrailBorder1 {
          0% { left: 0px; top: 0px; opacity: 0.8; transform: rotate(0deg); }
          24.9% { left: 0px; top: 0px; opacity: 0.8; transform: rotate(0deg); }
          25% { left: 0px; top: 0px; opacity: 0.6; transform: rotate(90deg); }
          49.9% { left: 0px; top: calc(100% - 6px); opacity: 0.6; transform: rotate(90deg); }
          50% { left: 0px; top: calc(100% - 6px); opacity: 0.4; transform: rotate(180deg); }
          74.9% { left: calc(100% - 6px); top: calc(100% - 6px); opacity: 0.4; transform: rotate(180deg); }
          75% { left: calc(100% - 6px); top: calc(100% - 6px); opacity: 0.6; transform: rotate(270deg); }
          99.9% { left: calc(100% - 6px); top: 0px; opacity: 0.6; transform: rotate(270deg); }
          100% { left: 0px; top: 0px; opacity: 0.8; transform: rotate(360deg); }
        }
        
        @keyframes fireTrailBorder2 {
          0% { left: calc(100% - 6px); top: 0px; opacity: 0.8; transform: rotate(270deg); }
          24.9% { left: calc(100% - 6px); top: 0px; opacity: 0.8; transform: rotate(270deg); }
          25% { left: calc(100% - 6px); top: 0px; opacity: 0.6; transform: rotate(0deg); }
          49.9% { left: 0px; top: 0px; opacity: 0.6; transform: rotate(0deg); }
          50% { left: 0px; top: 0px; opacity: 0.4; transform: rotate(90deg); }
          74.9% { left: 0px; top: calc(100% - 6px); opacity: 0.4; transform: rotate(90deg); }
          75% { left: 0px; top: calc(100% - 6px); opacity: 0.6; transform: rotate(180deg); }
          99.9% { left: calc(100% - 6px); top: calc(100% - 6px); opacity: 0.6; transform: rotate(180deg); }
          100% { left: calc(100% - 6px); top: 0px; opacity: 0.8; transform: rotate(270deg); }
        }
        
        @keyframes fireTrailBorder3 {
          0% { left: 0px; top: calc(100% - 6px); opacity: 0.8; transform: rotate(90deg); }
          24.9% { left: 0px; top: calc(100% - 6px); opacity: 0.8; transform: rotate(90deg); }
          25% { left: 0px; top: calc(100% - 6px); opacity: 0.6; transform: rotate(180deg); }
          49.9% { left: calc(100% - 6px); top: calc(100% - 6px); opacity: 0.6; transform: rotate(180deg); }
          50% { left: calc(100% - 6px); top: calc(100% - 6px); opacity: 0.4; transform: rotate(270deg); }
          74.9% { left: calc(100% - 6px); top: 0px; opacity: 0.4; transform: rotate(270deg); }
          75% { left: calc(100% - 6px); top: 0px; opacity: 0.6; transform: rotate(0deg); }
          99.9% { left: 0px; top: 0px; opacity: 0.6; transform: rotate(0deg); }
          100% { left: 0px; top: calc(100% - 6px); opacity: 0.8; transform: rotate(90deg); }
        }
        
        * { box-sizing: border-box; }
        
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        
        .hero-section {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
          border-radius: 32px;
          padding: 60px 40px;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>');
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
        }
        
        .hero-title {
          font-size: 56px;
          font-weight: 900;
          margin: 0 0 16px 0;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          letter-spacing: -1px;
        }
        
        .hero-subtitle {
          font-size: 22px;
          margin: 0 0 32px 0;
          opacity: 0.95;
          font-weight: 500;
        }
        
        .hero-cta {
          display: inline-flex;
          gap: 16px;
        }
        
        .btn-primary {
          background: white;
          color: #667eea;
          border: none;
          padding: 16px 40px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
        
        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
        }
        
        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
          padding: 14px 38px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-4px);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
        }
        
        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }
        
        .stat-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s ease;
        }
        
        .stat-card:hover::before {
          left: 100%;
        }
        
        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }
        
        .category-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .category-card:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
          background: linear-gradient(135deg, white, rgba(255, 255, 255, 0.95));
        }
        
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 20px;
        }
        
        .trending-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        
        .activity-grid {
          display: grid;
          gap: 16px;
        }
        
        .post-card {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 1;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }
        
        .post-card:hover {
          transform: scale(1.05) rotate(2deg);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          border-color: #667eea;
        }
        
        .video-container {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.95));
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
          border: 3px solid rgba(255, 255, 255, 0.1);
        }
        
        .section-title {
          font-size: 32px;
          font-weight: 900;
          color: white;
          margin: 0 0 24px 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          position: relative;
          display: inline-block;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }
        
        .trending-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
          backdrop-filter: blur(20px);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          cursor: pointer;
        }
        
        .trending-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2);
        }
        
        .activity-item {
          display: flex;
          gap: 16px;
          align-items: center;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }
        
        .activity-item:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        
        .community-card-special {
          background: linear-gradient(135deg, rgba(248, 250, 252, 0.98), rgba(241, 245, 249, 0.95));
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.9);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          position: relative;
          overflow: visible;
          transition: all 0.4s ease;
        }
        
        .community-card-special:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 56px rgba(0, 0, 0, 0.18);
        }
      `}</style>
      
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-bg" />
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Maadhurayam</h1>
            <p className="hero-subtitle">Building bridges between you and your customers</p>
            <div className="hero-cta">
              <button className="btn-primary">Get Started</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </div>

        {/* Video & Recent Posts */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 32, alignItems: 'start' }}>
            {/* Video Card */}
            <div className="video-container">
              <div style={{ position: 'relative', width: '100%', height: '480px' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/51uVH-sEvk0?autoplay=0&mute=1&controls=1&showinfo=0&rel=0"
                  title="Community Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Recent Posts & Community Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Recent Posts */}
              <div className="glass-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#1f2937' }}>Recent Posts</h3>
                  <a href="/feed" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 700, fontSize: 15, transition: 'all 0.3s' }}>
                    View All →
                  </a>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { id: 1, time: '2h ago' },
                    { id: 2, time: '4h ago' }
                  ].map((post) => (
                    <div key={post.id} className="post-card">
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 42,
                        color: '#9ca3af'
                      }}>📷</div>
                      <div style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'rgba(102, 126, 234, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 20,
                        padding: '8px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}>
                        <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>Share</span>
                        <span style={{ color: 'white', fontSize: 14 }}>↗</span>
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 12,
                        padding: '6px 12px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}>
                        <span style={{ color: 'white', fontSize: 11, fontWeight: 600 }}>{post.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Card */}
              <div className="community-card-special">
                {/* Animated Fire Border */}
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  borderRadius: 26,
                  background: 'transparent',
                  pointerEvents: 'none',
                  overflow: 'visible'
                }}>
                  {/* Comet 1 */}
                  <div style={{
                    position: 'absolute',
                    width: '20px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #ff4444, #ff0000, #cc0000, #aa0000, #880000, transparent)',
                    borderRadius: '50% 0 0 50%',
                    boxShadow: '0 0 15px #ff4444, 0 0 25px #ff4444, 0 0 35px #ff4444',
                    animation: 'fireMoveBorder 6s linear infinite',
                    zIndex: 10
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: '16px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #ff6666, #ff4444, #ff2222, #ff1111, #ff0000, transparent)',
                    borderRadius: '50% 0 0 50%',
                    boxShadow: '0 0 12px #ff6666, 0 0 20px #ff6666',
                    animation: 'fireTrailBorder1 6s linear infinite',
                    zIndex: 9
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: '12px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #ff8888, #ff6666, #ff4444, #ff3333, #ff2222, transparent)',
                    borderRadius: '50% 0 0 50%',
                    boxShadow: '0 0 8px #ff8888, 0 0 15px #ff8888',
                    animation: 'fireTrailBorder2 6s linear infinite',
                    zIndex: 8
                  }} />

                  {/* Comet 2 */}
                  <div style={{
                    position: 'absolute',
                    width: '20px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #ff4444, #ff0000, #cc0000, #aa0000, #880000, transparent)',
                    borderRadius: '50% 0 0 50%',
                    boxShadow: '0 0 15px #ff4444, 0 0 25px #ff4444, 0 0 35px #ff4444',
                    animation: 'fireMoveBorder2 6s linear infinite',
                    zIndex: 10
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: '16px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #ff6666, #ff4444, #ff2222, #ff1111, #ff0000, transparent)',
                    borderRadius: '50% 0 0 50%',
                    boxShadow: '0 0 12px #ff6666, 0 0 20px #ff6666',
                    animation: 'fireTrailBorder2 6s linear infinite',
                    zIndex: 9
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: '12px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #ff8888, #ff6666, #ff4444, #ff3333, #ff2222, transparent)',
                    borderRadius: '50% 0 0 50%',
                    boxShadow: '0 0 8px #ff8888, 0 0 15px #ff8888',
                    animation: 'fireTrailBorder2 6s linear infinite',
                    zIndex: 8
                  }} />

                  {/* Comet 3 */}
                  <div style={{
                    position: 'absolute',
                    width: '20px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #ff4444, #ff0000, #cc0000, #aa0000, #880000, transparent)',
                    borderRadius: '50% 0 0 50%',
                    boxShadow: '0 0 15px #ff4444, 0 0 25px #ff4444, 0 0 35px #ff4444',
                    animation: 'fireMoveBorder3 6s linear infinite',
                    zIndex: 10
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: '16px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #ff6666, #ff4444, #ff2222, #ff1111, #ff0000, transparent)',
                    borderRadius: '50% 0 0 50%',
                    boxShadow: '0 0 12px #ff6666, 0 0 20px #ff6666',
                    animation: 'fireTrailBorder3 6s linear infinite',
                    zIndex: 9
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: '12px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #ff8888, #ff6666, #ff4444, #ff3333, #ff2222, transparent)',
                    borderRadius: '50% 0 0 50%',
                    boxShadow: '0 0 8px #ff8888, 0 0 15px #ff8888',
                    animation: 'fireTrailBorder3 6s linear infinite',
                    zIndex: 8
                  }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                    borderRadius: 14, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: 16,
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                  }}>
                    <span style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>👥</span>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#111827' }}>Our Community</h3>
                    <p style={{ margin: 0, fontSize: 13, color: '#6b7280', fontWeight: 600 }}>Join 156+ active members</p>
                  </div>
                </div>
                <p style={{ margin: 0, marginBottom: 20, color: '#4b5563', fontSize: 14, lineHeight: 1.6, fontWeight: 500 }}>
                  Discover amazing services and products from your local community members. Connect, trade, and collaborate with like-minded people.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="/marketplace" style={{ textDecoration: 'none', flex: 1 }}>
                    <button style={{ 
                      border: 0, 
                      borderRadius: 12, 
                      padding: '12px 16px', 
                      fontWeight: 700, 
                      background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: 14,
                      width: '100%',
                      boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >Explore Marketplace</button>
                  </a>
                  <button style={{ 
                    border: '2px solid #667eea', 
                    background: 'white', 
                    color: '#667eea', 
                    borderRadius: 12, 
                    padding: '10px 16px', 
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: 14,
                    flex: 1,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#667eea';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#667eea';
                    e.target.style.transform = 'translateY(0)';
                  }}
                  >View Community</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="section-title">Community Stats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <div className="stat-card">
              <div style={{ fontSize: 48, fontWeight: 900, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>156</div>
              <div style={{ fontSize: 16, color: '#6b7280', fontWeight: 600 }}>Active Members</div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: 48, fontWeight: 900, background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>70+</div>
              <div style={{ fontSize: 16, color: '#6b7280', fontWeight: 600 }}>Live Listings</div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: 48, fontWeight: 900, background: 'linear-gradient(135deg, #f59e0b, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>24</div>
              <div style={{ fontSize: 16, color: '#6b7280', fontWeight: 600 }}>Recent Posts</div>
            </div>
          </div>
        </section>

        {/* Categories - Sliding Cards */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="section-title">Popular Categories</h2>
          <div ref={galleryRef} className="categories-gallery" style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            overflow: 'hidden',
            marginTop: '24px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
          }}>
            <ul ref={cardsRef} className="categories-cards" style={{
              position: 'absolute',
              width: '14rem',
              height: '18rem',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}>
              {[
                { icon: '🎸', label: 'Music' },
                { icon: '🧘', label: 'Wellness' },
                { icon: '🍯', label: 'Food' },
                { icon: '🎨', label: 'Art' },
                { icon: '🛠️', label: 'Repairs' },
                { icon: '💻', label: 'Tech' },
              ].map((c, i) => (
                <li key={i} style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  width: '14rem',
                  height: '18rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  borderRadius: '0.8rem',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}>
                  <div className="category-icon" style={{ fontSize: '64px', marginBottom: '16px', opacity: 1 }}>{c.icon}</div>
                  <div style={{ fontSize: '18px', color: '#374151', fontWeight: 700 }}>{c.label}</div>
                </li>
              ))}
            </ul>
            <div className="categories-actions" style={{
              position: 'absolute',
              bottom: '25px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '12px',
            }}>
              <button className="prev" style={{
                display: 'inline-block',
                outline: 'none',
                padding: '12px 25px',
                background: 'rgba(102, 126, 234, 0.9)',
                border: 'solid 2px rgba(255, 255, 255, 0.3)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '99px',
                fontWeight: 600,
                cursor: 'pointer',
                lineHeight: '18px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.9)';
                e.target.style.transform = 'translateY(0)';
              }}
              >Prev</button>
              <button className="next" style={{
                display: 'inline-block',
                outline: 'none',
                padding: '12px 25px',
                background: 'rgba(102, 126, 234, 0.9)',
                border: 'solid 2px rgba(255, 255, 255, 0.3)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '99px',
                fontWeight: 600,
                cursor: 'pointer',
                lineHeight: '18px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.9)';
                e.target.style.transform = 'translateY(0)';
              }}
              >Next</button>
            </div>
          </div>
        </section>

        {/* Trending */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="section-title">Trending Now</h2>
          <div className="trending-grid">
            {[1, 2, 3].map((i) => (
              <article key={i} className="trending-card">
                <div style={{ 
                  height: 200, 
                  background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                  color: '#9ca3af'
                }}>🎯</div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <h4 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#111827' }}>Sample Listing {i}</h4>
                    <span style={{ fontWeight: 900, fontSize: 20, color: '#667eea' }}>$25</span>
                  </div>
                  <p style={{ margin: 0, marginBottom: 16, color: '#6b7280', fontSize: 14, lineHeight: 1.5 }}>
                    Short description for listing {i} goes here.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280', fontSize: 13, fontWeight: 600 }}>📍 Downtown</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f59e0b' }}>
                      <span style={{ fontSize: 16 }}>★</span>
                      <span style={{ color: '#374151', fontWeight: 700 }}>4.{i}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Facebook Preview */}
        <section style={{ marginBottom: 48 }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
              color: 'white',
              borderRadius: 16,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  fontWeight: 800,
                  color: '#2563eb',
                  boxShadow: '0 6px 14px rgba(255,255,255,0.35)',
                }}
              >
                f
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>Follow us on Facebook</div>
                <div style={{ opacity: 0.9, fontWeight: 500 }}>
                  Get updates, events, and community highlights.
                </div>
              </div>
            </div>
            <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.95 }}>
              See the latest posts, photos, and announcements from our community. Click below to view
              the full Facebook page and stay connected.
            </p>
            <div>
              <button
                onClick={() => setShowFacebookModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'white',
                  color: '#1d4ed8',
                  fontWeight: 800,
                  padding: '12px 18px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(255, 255, 255, 0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 22px rgba(255, 255, 255, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 16px rgba(255, 255, 255, 0.3)';
                }}
              >
                View Facebook Page
                <span style={{ fontSize: 18 }}>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Activity */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-grid">
            {[
              { text: 'Earned "Active Member" badge', when: '2 hours ago', icon: '🏆' },
              { text: 'Posted in "General Discussion"', when: '1 day ago', icon: '💬' },
              { text: 'Added new listing: Guitar Lessons', when: '2 days ago', icon: '🎸' },
              { text: 'Joined the community', when: '3 days ago', icon: '🎉' },
            ].map((a, i) => (
              <div key={i} className="activity-item">
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 14, 
                  background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: 20,
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#111827', fontSize: 15, marginBottom: 4 }}>{a.text}</div>
                  <div style={{ color: '#6b7280', fontSize: 13, fontWeight: 500 }}>{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Facebook Modal */}
      {showFacebookModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={() => setShowFacebookModal(false)}
        >
          <div
            style={{
              width: '95%',
              maxWidth: '1200px',
              height: '90vh',
              background: 'white',
              borderRadius: 16,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'slideIn 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
                color: 'white',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#2563eb',
                  }}
                >
                  f
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>Facebook Page</div>
                  <div style={{ opacity: 0.9, fontSize: 13, fontWeight: 500 }}>
                    Community Updates & Announcements
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowFacebookModal(false)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: 24,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                ×
              </button>
            </div>

            {/* Facebook Iframe */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <iframe
                src="https://www.facebook.com/share/19zBwb5zUW/"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
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
      `}</style>
    </>
  )
}