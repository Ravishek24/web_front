import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Quote } from 'lucide-react'
import JoinFamilyForm from '../components/JoinFamilyForm'

export default function CommunityStories() {
  const [showJoinForm, setShowJoinForm] = useState(false)
  const stories = [
    {
      id: 1,
      name: 'Priya Sharma',
      image: 'https://i.pravatar.cc/150?img=1',
      role: 'Entrepreneur & Founder',
      story: 'Joining Maadhurayam transformed my business journey. Through this community, I found mentors who guided me through the challenges of starting my own venture. The networking events helped me connect with potential clients and partners. Today, my business has grown by 300% and I\'m proud to be part of this empowering community of women entrepreneurs.',
      journey: 'Started as a solo entrepreneur → Connected with mentors → Expanded business network → Achieved 300% growth'
    },
    {
      id: 2,
      name: 'Anita Desai',
      image: 'https://i.pravatar.cc/150?img=5',
      role: 'Creative Professional',
      story: 'As a freelance designer, I struggled with visibility and finding consistent work. Maadhurayam provided me with a platform to showcase my skills and connect with clients who value creativity. The community support and regular workshops helped me refine my craft and build a strong portfolio. I\'ve now worked with over 50 clients through community referrals.',
      journey: 'Freelance designer → Joined community → Built portfolio → Connected with 50+ clients'
    },
    {
      id: 3,
      name: 'Meera Patel',
      image: 'https://i.pravatar.cc/150?img=9',
      role: 'Small Business Owner',
      story: 'Running a small business can be isolating, but Maadhurayam changed that completely. I found a sisterhood of women who understand the challenges and celebrate the victories. Through the marketplace feature, I\'ve been able to reach new customers and collaborate with other members. The community has become my support system and business growth engine.',
      journey: 'Small business owner → Found community support → Expanded customer base → Built lasting partnerships'
    },
    {
      id: 4,
      name: 'Kavita Reddy',
      image: 'https://i.pravatar.cc/150?img=12',
      role: 'Career Professional',
      story: 'After taking a career break, I was nervous about re-entering the workforce. Maadhurayam\'s career development programs and mentorship opportunities gave me the confidence I needed. I attended skill-building workshops, connected with industry leaders, and found my current role through a community referral. This community truly empowers women at every stage of their career.',
      journey: 'Career break → Joined community → Skill development → Career re-entry → Found dream role'
    },
    {
      id: 5,
      name: 'Sunita Kumar',
      image: 'https://i.pravatar.cc/150?img=20',
      role: 'Wellness Coach',
      story: 'Maadhurayam helped me turn my passion for wellness into a thriving business. The community provided a platform to share my expertise through workshops and events. I\'ve been able to help hundreds of women prioritize their health and wellness. The collaborative spirit here is unmatched - we lift each other up and grow together.',
      journey: 'Wellness enthusiast → Community platform → Conducted workshops → Built client base → Thriving business'
    },
    {
      id: 6,
      name: 'Rekha Nair',
      image: 'https://i.pravatar.cc/150?img=33',
      role: 'Tech Professional',
      story: 'As a woman in tech, finding a supportive community was crucial. Maadhurayam provided exactly that - a space where I could share my experiences, learn from others, and mentor newcomers. Through community events, I\'ve expanded my network, found speaking opportunities, and even started a mentorship program. This community has been instrumental in my professional growth.',
      journey: 'Tech professional → Found support network → Expanded opportunities → Started mentorship → Professional growth'
    }
  ]

  return (
    <main className="container" style={{ padding: '2rem 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2D68C4', marginBottom: '1rem', fontWeight: 600 }}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
        <h1 className="text-4xl font-black mb-2" style={{ color: '#1f2937' }}>
          Our Community Stories
        </h1>
        <p className="text-lg text-gray-600">
          Discover the inspiring journeys of women who are building their dreams with Maadhurayam
        </p>
      </div>

      {/* Stories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {stories.map((story) => (
          <div
            key={story.id}
            className="glass-card rounded-3xl overflow-hidden card-hover"
            style={{
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            {/* Image and Name Section */}
            <div style={{
              position: 'relative',
              padding: '2rem 2rem 1rem',
              background: 'linear-gradient(135deg, rgba(45, 104, 196, 0.05), rgba(254, 111, 94, 0.05))'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  flexShrink: 0
                }}>
                  <img
                    src={story.image}
                    alt={story.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#1f2937',
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    {story.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: 0,
                    fontWeight: 600
                  }}>
                    {story.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div style={{
              padding: '0 2rem 2rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {/* Quote Icon */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <Quote size={20} style={{ color: '#2D68C4', opacity: 0.6 }} />
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#2D68C4',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  My Story
                </span>
              </div>

              {/* Story Text */}
              <p style={{
                fontSize: '0.95rem',
                lineHeight: '1.7',
                color: '#374151',
                margin: 0,
                flex: 1
              }}>
                {story.story}
              </p>

              {/* Journey Timeline */}
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(180, 229, 142, 0.1), rgba(147, 181, 83, 0.1))',
                borderRadius: '1rem',
                border: '1px solid rgba(180, 229, 142, 0.2)'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#93B553',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem'
                }}>
                  Journey
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  lineHeight: '1.6',
                  fontStyle: 'italic'
                }}>
                  {story.journey}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(45, 104, 196, 0.1), rgba(254, 111, 94, 0.1))',
        borderRadius: '2rem',
        padding: '3rem',
        textAlign: 'center',
        border: '2px solid rgba(45, 104, 196, 0.2)'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          Ready to Write Your Story?
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Join our community of inspiring women and start your journey towards growth and success.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowJoinForm(true)}
            style={{
              background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
              color: 'white',
              padding: '0.875rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(45, 104, 196, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 104, 196, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(45, 104, 196, 0.4)'
            }}>
            Join Our Community
          </button>
          <Link to="/community" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'white',
              color: '#2D68C4',
              padding: '0.875rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: 700,
              fontSize: '1rem',
              border: '2px solid #2D68C4',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.transform = 'translateY(0)'
            }}>
              Explore Community
            </button>
          </Link>
        </div>
      </div>

      {/* Join Family Modal */}
      {showJoinForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setShowJoinForm(false)}
        >
          <div
            className="w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <JoinFamilyForm onClose={() => setShowJoinForm(false)} />
          </div>
        </div>
      )}
    </main>
  )
}

