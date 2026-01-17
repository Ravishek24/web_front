import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'

export default function PaymentFailure() {
  const [searchParams] = useSearchParams()
  const txnid = searchParams.get('txnid')
  const error = searchParams.get('error')

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(10, 14, 39, 0.95))',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.025)',
        backdropFilter: 'blur(2rem)',
        borderRadius: '2rem',
        padding: '3rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 0 4rem rgba(255, 255, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5)',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
          Payment Failed
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
          {error || 'Your payment could not be processed. Please try again.'}
        </p>
        {txnid && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '1rem',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <div>
              <strong>Transaction ID:</strong> {txnid}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/profile"
            style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              padding: '0.875rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: 700,
              textDecoration: 'none',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            }}
          >
            Go Back
          </Link>
          <button
            onClick={() => window.history.back()}
            style={{
              background: 'linear-gradient(90deg, rgba(45, 104, 196, 0.3), rgba(254, 111, 94, 0.3))',
              color: '#fff',
              padding: '0.875rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(90deg, rgba(45, 104, 196, 0.5), rgba(254, 111, 94, 0.5))'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(90deg, rgba(45, 104, 196, 0.3), rgba(254, 111, 94, 0.3))'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

