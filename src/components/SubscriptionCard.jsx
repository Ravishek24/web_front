import React from 'react'

export default function SubscriptionCard({ plan, price, features, popular = false, onSelect }) {
  return (
    <div 
      className="subscription-card"
      style={{
        background: 'rgba(255, 255, 255, 0.025)',
        backdropFilter: 'blur(2rem)',
        borderRadius: '2rem',
        padding: '2rem',
        border: popular ? '2px solid rgba(41, 198, 118, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: popular 
          ? '0 0 2rem rgba(41, 198, 118, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)' 
          : '0 0 2rem rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        position: 'relative',
        color: '#fff',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        flex: '1 1 280px',
        minWidth: '280px',
        maxWidth: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.boxShadow = popular
          ? '0 0 3rem rgba(41, 198, 118, 0.4), 0 12px 40px rgba(0, 0, 0, 0.4)'
          : '0 0 3rem rgba(255, 255, 255, 0.2), 0 12px 40px rgba(0, 0, 0, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = popular
          ? '0 0 2rem rgba(41, 198, 118, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 0 2rem rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
      onClick={onSelect}
    >
      {/* Blob effect */}
      <div style={{
        height: '12rem',
        width: '12rem',
        background: popular 
          ? 'rgba(41, 198, 118, 0.2)' 
          : 'rgba(255, 255, 255, 0.1)',
        position: 'absolute',
        top: -50,
        right: -50,
        filter: 'blur(3rem)',
        borderRadius: '40%',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      
      {/* Border gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        height: '2px',
        width: '80%',
        background: popular
          ? 'linear-gradient(0.25turn, rgba(41, 198, 118, 0), rgba(41, 198, 118, 0.6), rgba(41, 198, 118, 0))'
          : 'linear-gradient(0.25turn, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0))',
        zIndex: 1
      }} />
      
      {/* Popular badge */}
      {popular && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'linear-gradient(to bottom, #00774f, #29c676)',
          color: '#fff',
          padding: '0.4rem 0.8rem',
          borderRadius: '3rem',
          fontSize: '0.7rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05rem',
          boxShadow: '0 0 1rem rgba(41, 198, 118, 0.4)',
          zIndex: 2
        }}>
          Most Popular
        </div>
      )}
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Plan Name */}
        <h3 style={{
          margin: '0 0 0.5rem 0',
          fontSize: '1.75rem',
          fontWeight: 800,
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '0.05rem'
        }}>{plan}</h3>
        
        {/* Price */}
        <div style={{
          marginBottom: '1.5rem'
        }}>
          <span style={{
            fontSize: '3rem',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1
          }}>₹{price}</span>
          <span style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginLeft: '0.5rem'
          }}>/month</span>
        </div>
        
        {/* Features List */}
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: popular 
                  ? 'linear-gradient(to bottom, #00774f, #29c676)'
                  : 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '0.7rem'
              }}>✓</div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Select Button */}
        <button style={{
          width: '100%',
          background: popular
            ? 'linear-gradient(to bottom, #00774f, #29c676)'
            : 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          padding: '0.875rem 1.5rem',
          borderRadius: '0.75rem',
          fontWeight: 700,
          border: popular
            ? '1px solid rgba(41, 198, 118, 0.3)'
            : '1px solid rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05rem',
          boxShadow: popular ? '0 0 1rem rgba(41, 198, 118, 0.3)' : 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = popular
            ? 'linear-gradient(to bottom, #008a5c, #2dd684)'
            : 'rgba(255, 255, 255, 0.2)'
          e.currentTarget.style.transform = 'scale(1.02)'
          e.currentTarget.style.boxShadow = popular
            ? '0 0 1.5rem rgba(41, 198, 118, 0.5)'
            : '0 0 1rem rgba(255, 255, 255, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = popular
            ? 'linear-gradient(to bottom, #00774f, #29c676)'
            : 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = popular ? '0 0 1rem rgba(41, 198, 118, 0.3)' : 'none'
        }}>
          Select Plan
        </button>
      </div>
    </div>
  )
}

