import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { verifyPayUHash } from '../services/payuService'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get all URL parameters
    const params = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })

    // Verify hash if hash is present
    if (params.hash) {
      try {
        const isValid = verifyPayUHash({
          ...params,
          salt: PAYU_CONFIG.salt
        })
        setVerified(isValid)
      } catch (error) {
        console.error('Hash verification error:', error)
        setVerified(false)
      }
    }
    setLoading(false)
  }, [searchParams])

  const txnid = searchParams.get('txnid')
  const amount = searchParams.get('amount')
  const status = searchParams.get('status')

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
        {loading ? (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Verifying Payment...</h2>
          </div>
        ) : status === 'success' && verified ? (
          <>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Payment Successful!
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
              Your subscription has been activated successfully.
            </p>
            {txnid && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem',
                padding: '1rem',
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Transaction ID:</strong> {txnid}
                </div>
                {amount && (
                  <div>
                    <strong>Amount:</strong> ₹{amount}
                  </div>
                )}
              </div>
            )}
            <Link
              to="/profile"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(to bottom, #00774f, #29c676)',
                color: '#fff',
                padding: '0.875rem 2rem',
                borderRadius: '0.75rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 0 1.5rem rgba(41, 198, 118, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Go to Profile
            </Link>
          </>
        ) : (
          <>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Payment Verification Failed
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
              {!verified ? 'Unable to verify payment authenticity. Please contact support.' : 'Payment was not successful.'}
            </p>
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
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              Go Back
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

