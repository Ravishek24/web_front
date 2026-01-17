import React, { useState } from 'react'
import SubscriptionCard from '../components/SubscriptionCard'
import ServiceForm from '../components/ServiceForm'
import ProductForm from '../components/ProductForm'
import { initiatePayUPayment } from '../services/payuService'

export default function Profile() {
  const [tab, setTab] = useState('messages') // messages | listings | orders | cart
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showListingTypeModal, setShowListingTypeModal] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [showProductForm, setShowProductForm] = useState(false)
  const [paymentFormData, setPaymentFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  })

  const handlePlanSelection = (plan, amount) => {
    setSelectedPlan({ plan, amount })
    setShowPaymentForm(true)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    
    if (!paymentFormData.firstname || !paymentFormData.email || !paymentFormData.phone) {
      alert('Please fill in all required fields')
      return
    }

    try {
      initiatePayUPayment({
        plan: selectedPlan.plan,
        amount: selectedPlan.amount,
        firstname: paymentFormData.firstname,
        email: paymentFormData.email,
        phone: paymentFormData.phone,
        lastname: paymentFormData.lastname || '',
        country: 'India'
      })
      // Form will auto-submit and redirect to PayU
    } catch (error) {
      console.error('Payment initiation error:', error)
      alert('Failed to initiate payment. Please try again.')
    }
  }

  const pill = (active) => ({
    padding: '10px 14px',
    borderRadius: 999,
    fontWeight: 700,
    background: active ? '#e0f2fe' : 'transparent',
    color: active ? '#0369a1' : '#374151',
    border: '1px solid ' + (active ? '#bae6fd' : 'transparent')
  })

  return (
    <main className="container" style={{ padding: '2rem 0' }}>
      {/* Cover banner */}
      <div style={{ 
        height: 140, 
        borderRadius: 16, 
        background: 'linear-gradient(90deg, rgba(45, 104, 196, 0.2), rgba(254, 111, 94, 0.2))', 
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.05)', 
        marginBottom: -60
      }} />

      <div className="profile-grid">
        {/* Left sidebar - avatar card */}
        <aside>
          <div className="profile-card-pcard" style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(10, 14, 39, 0.9))',
            backdropFilter: 'blur(2rem)',
            borderRadius: '2rem',
            padding: '1.5rem',
            paddingTop: '6rem',
            position: 'sticky',
            top: 16,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 2rem rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)',
            overflow: 'visible',
            color: '#fff'
          }}>
            {/* Blob effect */}
            <div style={{
              height: '10rem',
              width: '10rem',
              background: 'rgba(255, 255, 255, 0.2)',
              position: 'absolute',
              top: 0,
              right: 0,
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
              background: 'linear-gradient(0.25turn, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0))',
              zIndex: 1
            }} />
            
            {/* Profile Picture */}
            <div style={{
              width: 180,
              height: 180,
              borderRadius: '1.5rem',
              background: 'linear-gradient(135deg, rgba(45, 104, 196, 0.3), rgba(254, 111, 94, 0.3))',
              margin: '-120px auto 1.5rem',
              border: '4px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 2rem rgba(255, 255, 255, 0.1)',
              zIndex: 10
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                fontWeight: 800,
                color: '#fff'
              }}>JD</div>
            </div>
            
            {/* Name */}
            <h2 style={{
              margin: '0 0 0.5rem 0',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#fff',
              textAlign: 'center'
            }}>John Doe</h2>
            
            {/* Location/Status */}
            <div style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.75rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span>📍</span>
              <span>Community Enthusiast</span>
            </div>
            
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              {[{n:42,l:'Posts'},{n:128,l:'Followers'},{n:85,l:'Following'}].map((s,i)=> (
                <div key={i} style={{
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                  <div style={{
                    fontWeight: 800,
                    color: '#fff',
                    fontSize: '1.25rem',
                    marginBottom: '0.25rem'
                  }}>{s.n}</div>
                  <div style={{
                    fontSize: '0.65rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05rem'
                  }}>{s.l}</div>
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <button style={{
                flex: 1,
                background: 'linear-gradient(to bottom, #00774f, #29c676)',
                color: '#fff',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                fontWeight: 700,
                border: '1px solid rgba(41, 198, 118, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.875rem',
                boxShadow: '0 0 1rem rgba(41, 198, 118, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to bottom, #008a5c, #2dd684)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 0 1.5rem rgba(41, 198, 118, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to bottom, #00774f, #29c676)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 0 1rem rgba(41, 198, 118, 0.2)'
              }}>Message</button>
              <button style={{
                width: 48,
                height: 48,
                borderRadius: '0.75rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'scale(1)'
              }}>＋</button>
            </div>
            
            {/* Upgrade Membership */}
            <div 
              onClick={() => setShowSubscriptionModal(true)}
              style={{
                background: 'linear-gradient(90deg, rgba(45, 104, 196, 0.3), rgba(254, 111, 94, 0.3))',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                textAlign: 'center',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '0.875rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, rgba(45, 104, 196, 0.5), rgba(254, 111, 94, 0.5))'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 0 1.5rem rgba(254, 111, 94, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, rgba(45, 104, 196, 0.3), rgba(254, 111, 94, 0.3))'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              <span style={{ position: 'relative', zIndex: 1 }}>✨ Upgrade Membership</span>
            </div>
          </div>
        </aside>

        {/* Right content */}
        <section>
          {/* Header info & quick actions */}
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:16, padding:16, display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 4px 16px rgba(0,0,0,.04)' }}>
            <div>
              <div style={{ fontWeight:800, fontSize:20 }}>John Doe</div>
              <div style={{ color:'#6b7280', fontSize:12 }}>Member since Jan 2024</div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button style={{ background:'#111827', color:'#fff', padding:'10px 14px', borderRadius:10, fontWeight:700 }}>Edit Profile</button>
              <button style={{ background:'#f3f4f6', padding:'10px 14px', borderRadius:10, fontWeight:700 }}>Share</button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', gap:8, marginTop:16, marginBottom:16, flexWrap:'wrap' }}>
            {[
              { key:'messages', label:'Messages' },
              { key:'listings', label:'Listings' },
              { key:'orders', label:'Orders' },
              { key:'cart', label:'Cart' }
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={pill(tab===t.key)}>{t.label}</button>
            ))}
          </div>

          {/* Tab content */}
          {tab === 'messages' && (
            <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:16, color:'#6b7280' }}>
              Messages feature coming soon.
            </div>
          )}

          {tab === 'listings' && (
            <div>
              <button
                onClick={() => setShowListingTypeModal(true)}
                style={{
                  width: '100%',
                  marginBottom: 16,
                  padding: '12px 24px',
                  borderRadius: 12,
                  border: 'none',
                  background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(45, 104, 196, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 104, 196, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 104, 196, 0.3)'
                }}
              >
                + Create Listing
              </button>
              <div style={{ display:'grid', gap:12 }}>
                {[1,2].map(i => (
                  <div key={i} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:14, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div style={{ fontWeight:700 }}>Sample Listing {i}</div>
                    <div style={{ display:'flex', gap:8 }}>
                      <button style={{ background:'#f3f4f6', borderRadius:8, padding:'8px 10px' }}>Edit</button>
                      <button style={{ background:'#3b82f6', color:'#fff', borderRadius:8, padding:'8px 10px' }}>View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div style={{ display:'grid', gap:12 }}>
              {[
                { id: 1, orderId: 'ORD-2024-001', item: 'Introduction to Digital Marketing Course', amount: '₹2,500', status: 'Completed', date: 'Jan 10, 2024' },
                { id: 2, orderId: 'ORD-2024-002', item: 'Yoga for Beginners Course', amount: '₹1,800', status: 'In Progress', date: 'Jan 12, 2024' },
                { id: 3, orderId: 'ORD-2024-003', item: 'Business Strategy & Growth Course', amount: '₹4,500', status: 'Pending', date: 'Jan 15, 2024' }
              ].map(order => (
                <div key={order.id} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:16, boxShadow:'0 2px 10px rgba(0,0,0,.03)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:12 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>{order.item}</div>
                      <div style={{ color:'#6b7280', fontSize:12, marginBottom:4 }}>Order ID: {order.orderId}</div>
                      <div style={{ color:'#6b7280', fontSize:12 }}>Date: {order.date}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontWeight:800, fontSize:18, color:'#2D68C4', marginBottom:4 }}>{order.amount}</div>
                      <div style={{
                        padding: '4px 10px',
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 700,
                        display: 'inline-block',
                        background: order.status === 'Completed' ? '#d1fae5' : order.status === 'In Progress' ? '#dbeafe' : '#fef3c7',
                        color: order.status === 'Completed' ? '#065f46' : order.status === 'In Progress' ? '#1e40af' : '#92400e'
                      }}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:8, marginTop:12 }}>
                    <button style={{ background:'#f3f4f6', borderRadius:8, padding:'8px 12px', fontWeight:600, fontSize:13 }}>View Details</button>
                    {order.status === 'Completed' && (
                      <button style={{ background:'#3b82f6', color:'#fff', borderRadius:8, padding:'8px 12px', fontWeight:600, fontSize:13 }}>Download</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'cart' && (() => {
            const cartItems = [
              { id: 1, item: 'Creative Writing Workshop', price: '₹2,000', instructor: 'Kavita Das' },
              { id: 2, item: 'Financial Planning for Entrepreneurs', price: '₹3,500', instructor: 'Meera Patel' }
            ]
            const total = cartItems.reduce((sum, item) => sum + parseInt(item.price.replace('₹', '').replace(',', '')), 0)
            
            return cartItems.length === 0 ? (
              <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:40, textAlign:'center', color:'#6b7280' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🛒</div>
                <div style={{ fontWeight:600, fontSize:18, marginBottom:8 }}>Your cart is empty</div>
                <div style={{ fontSize:14 }}>Add courses to your cart to get started</div>
              </div>
            ) : (
              <div>
                <div style={{ display:'grid', gap:12, marginBottom:16 }}>
                  {cartItems.map(cartItem => (
                    <div key={cartItem.id} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:16, display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 10px rgba(0,0,0,.03)' }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>{cartItem.item}</div>
                        <div style={{ color:'#6b7280', fontSize:13 }}>by {cartItem.instructor}</div>
                        <div style={{ fontWeight:800, fontSize:18, color:'#2D68C4', marginTop:8 }}>{cartItem.price}</div>
                      </div>
                      <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                        <button style={{ background:'#fee2e2', color:'#dc2626', borderRadius:8, padding:'8px 12px', fontWeight:600, fontSize:13 }}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:20 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                    <div style={{ fontWeight:700, fontSize:18 }}>Total</div>
                    <div style={{ fontWeight:800, fontSize:24, color:'#2D68C4' }}>₹{total.toLocaleString('en-IN')}</div>
                  </div>
                  <button style={{ 
                    width:'100%',
                    background:'linear-gradient(135deg, #2D68C4, #FE6F5E)', 
                    color:'#fff', 
                    borderRadius:12, 
                    padding:'12px 24px', 
                    fontWeight:700, 
                    fontSize:16,
                    border:'none',
                    cursor:'pointer',
                    transition:'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 104, 196, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )
          })()}
        </section>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.3s ease',
            overflow: 'auto'
          }}
          onClick={() => setShowSubscriptionModal(false)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(10, 14, 39, 0.95))',
              backdropFilter: 'blur(2rem)',
              borderRadius: '2rem',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 4rem rgba(255, 255, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5)',
              maxWidth: '1200px',
              width: '100%',
              maxHeight: 'calc(100vh - 2rem)',
              overflowY: 'auto',
              position: 'relative',
              animation: 'slideIn 0.3s ease',
              margin: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSubscriptionModal(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'rotate(90deg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'rotate(0deg)'
              }}
            >
              ×
            </button>

            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: '#fff',
                margin: '0 0 0.5rem 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05rem'
              }}>
                Choose Your Plan
              </h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)'
              }}>
                Select the perfect membership plan for you
              </p>
            </div>

            {/* Subscription Cards */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'stretch'
            }}>
              <SubscriptionCard
                plan="Basic"
                price={1000}
                features={[
                  'Access to marketplace',
                  'Basic profile features',
                  '5 listings per month',
                  'Community support'
                ]}
                onSelect={() => handlePlanSelection('Basic', 1000)}
              />
              
              <SubscriptionCard
                plan="Premium"
                price={2000}
                features={[
                  'Everything in Basic',
                  'Unlimited listings',
                  'Priority support',
                  'Advanced analytics',
                  'Featured listings',
                  'Early access to features'
                ]}
                popular={true}
                onSelect={() => handlePlanSelection('Premium', 2000)}
              />
              
              <SubscriptionCard
                plan="Enterprise"
                price={3000}
                features={[
                  'Everything in Premium',
                  'Custom branding',
                  'Dedicated account manager',
                  'API access',
                  'White-label solution',
                  '24/7 priority support',
                  'Custom integrations'
                ]}
                onSelect={() => handlePlanSelection('Enterprise', 3000)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Payment Form Modal */}
      {showPaymentForm && selectedPlan && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            zIndex: 2001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => {
            setShowPaymentForm(false)
            setSelectedPlan(null)
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(10, 14, 39, 0.95))',
              backdropFilter: 'blur(2rem)',
              borderRadius: '2rem',
              padding: '2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 4rem rgba(255, 255, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5)',
              maxWidth: '500px',
              width: '100%',
              maxHeight: 'calc(100vh - 2rem)',
              overflowY: 'auto',
              position: 'relative',
              animation: 'slideIn 0.3s ease',
              color: '#fff'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowPaymentForm(false)
                setSelectedPlan(null)
              }}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'rotate(90deg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'rotate(0deg)'
              }}
            >
              ×
            </button>

            {/* Form Header */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                marginBottom: '0.5rem',
                textTransform: 'uppercase'
              }}>
                Complete Payment
              </h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.9rem'
              }}>
                {selectedPlan.plan} Plan - ₹{selectedPlan.amount}/month
              </p>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePaymentSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    First Name <span style={{ color: '#FE6F5E' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentFormData.firstname}
                    onChange={(e) => setPaymentFormData({...paymentFormData, firstname: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={paymentFormData.lastname}
                    onChange={(e) => setPaymentFormData({...paymentFormData, lastname: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    Email <span style={{ color: '#FE6F5E' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={paymentFormData.email}
                    onChange={(e) => setPaymentFormData({...paymentFormData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    Phone Number <span style={{ color: '#FE6F5E' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={paymentFormData.phone}
                    onChange={(e) => setPaymentFormData({...paymentFormData, phone: e.target.value})}
                    placeholder="10 digit mobile number"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(to bottom, #00774f, #29c676)',
                    color: '#fff',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    border: '1px solid rgba(41, 198, 118, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05rem',
                    marginTop: '1rem',
                    boxShadow: '0 0 1rem rgba(41, 198, 118, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to bottom, #008a5c, #2dd684)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 0 1.5rem rgba(41, 198, 118, 0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to bottom, #00774f, #29c676)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 0 1rem rgba(41, 198, 118, 0.3)'
                  }}
                >
                  Proceed to PayU Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Listing Type Selection Modal */}
      {showListingTypeModal && (
        <div
          className="fixed inset-0 flex items-center justify-center px-4"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000
          }}
          onClick={() => setShowListingTypeModal(false)}
        >
          <div
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden glass-card">
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{
                  background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
                  color: 'white'
                }}
              >
                <h2 className="text-xl font-bold">Create New Listing</h2>
                <button
                  type="button"
                  onClick={() => setShowListingTypeModal(false)}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-lg font-bold transition-all duration-200"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-6 text-center">
                  What would you like to list?
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => {
                      setShowListingTypeModal(false)
                      setShowServiceForm(true)
                    }}
                    className="p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-200 text-left"
                    style={{
                      background: 'linear-gradient(135deg, rgba(45, 104, 196, 0.05), rgba(254, 111, 94, 0.05))'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(45, 104, 196, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div className="text-4xl mb-3">🎓</div>
                    <div className="font-bold text-lg text-gray-900 mb-1">Service</div>
                    <div className="text-sm text-gray-600">Offer your skills and expertise</div>
                  </button>
                  <button
                    onClick={() => {
                      setShowListingTypeModal(false)
                      setShowProductForm(true)
                    }}
                    className="p-6 rounded-2xl border-2 border-gray-200 hover:border-green-500 transition-all duration-200 text-left"
                    style={{
                      background: 'linear-gradient(135deg, rgba(147, 181, 83, 0.05), rgba(118, 239, 227, 0.05))'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(147, 181, 83, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div className="text-4xl mb-3">🛍️</div>
                    <div className="font-bold text-lg text-gray-900 mb-1">Product</div>
                    <div className="text-sm text-gray-600">Sell physical or digital products</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Form Modal */}
      {showServiceForm && (
        <div
          className="fixed inset-0 flex items-center justify-center px-2 sm:px-4 py-4"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000
          }}
          onClick={() => setShowServiceForm(false)}
        >
          <div
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ServiceForm onClose={() => setShowServiceForm(false)} />
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <div
          className="fixed inset-0 flex items-center justify-center px-2 sm:px-4 py-4"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000
          }}
          onClick={() => setShowProductForm(false)}
        >
          <div
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductForm onClose={() => setShowProductForm(false)} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </main>
  )
}


