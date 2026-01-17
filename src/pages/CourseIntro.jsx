import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Play, Lock, Star, Clock, Users, BookOpen, CheckCircle, MessageSquare } from 'lucide-react'

export default function CourseIntro() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPurchased, setIsPurchased] = useState(false) // In real app, check from user data

  // Mock course data
  const courseData = {
    1: {
      title: 'Introduction to Digital Marketing',
      instructor: 'Priya Patel',
      instructorImage: 'https://i.pravatar.cc/150?img=1',
      description: 'Learn the fundamentals of digital marketing with this comprehensive course. Master SEO, social media marketing, content creation, and analytics. Perfect for beginners looking to start their career in digital marketing or entrepreneurs wanting to promote their business online.',
      price: '₹2,500',
      originalPrice: '₹3,500',
      rating: 4.8,
      totalReviews: 156,
      students: 156,
      duration: '4 weeks',
      level: 'Beginner',
      category: 'Marketing',
      videos: [
        {
          id: 1,
          title: 'Introduction to Digital Marketing',
          duration: '15:30',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          isFree: true
        },
        {
          id: 2,
          title: 'Understanding SEO Basics',
          duration: '22:45',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          isFree: true
        },
        {
          id: 3,
          title: 'Social Media Marketing Strategies',
          duration: '18:20',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          isFree: false
        },
        {
          id: 4,
          title: 'Content Creation and Copywriting',
          duration: '25:10',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          isFree: false
        },
        {
          id: 5,
          title: 'Analytics and Performance Tracking',
          duration: '20:15',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          isFree: false
        },
        {
          id: 6,
          title: 'Advanced Marketing Techniques',
          duration: '28:30',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          isFree: false
        }
      ],
      reviews: [
        {
          id: 1,
          author: 'Anita Sharma',
          authorImage: 'https://i.pravatar.cc/150?img=5',
          rating: 5,
          date: '2 weeks ago',
          comment: 'Excellent course! Priya explains everything so clearly. I learned a lot about SEO and social media marketing. Highly recommended for beginners.'
        },
        {
          id: 2,
          author: 'Meera Patel',
          authorImage: 'https://i.pravatar.cc/150?img=9',
          rating: 5,
          date: '1 month ago',
          comment: 'Great content and practical examples. The course helped me improve my business marketing strategy significantly.'
        },
        {
          id: 3,
          author: 'Kavita Reddy',
          authorImage: 'https://i.pravatar.cc/150?img=12',
          rating: 4,
          date: '2 months ago',
          comment: 'Good course overall. Some sections could be more detailed, but it covers all the basics well.'
        },
        {
          id: 4,
          author: 'Sunita Kumar',
          authorImage: 'https://i.pravatar.cc/150?img=20',
          rating: 5,
          date: '3 months ago',
          comment: 'Amazing instructor! The course is well-structured and easy to follow. Worth every rupee!'
        }
      ]
    },
    3: {
      title: 'Business Strategy & Growth',
      instructor: 'Anjali Singh',
      instructorImage: 'https://i.pravatar.cc/150?img=33',
      description: 'Master the art of business strategy and growth with this comprehensive course. Learn how to develop effective business plans, analyze market opportunities, and scale your business successfully.',
      price: '₹4,500',
      originalPrice: '₹6,000',
      rating: 4.7,
      totalReviews: 203,
      students: 203,
      duration: '8 weeks',
      level: 'Intermediate',
      category: 'Business',
      videos: [
        {
          id: 1,
          title: 'Introduction to Business Strategy',
          duration: '20:00',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          isFree: true
        },
        {
          id: 2,
          title: 'Market Analysis and Research',
          duration: '25:30',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          isFree: false
        },
        {
          id: 3,
          title: 'Strategic Planning',
          duration: '22:15',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          isFree: false
        }
      ],
      reviews: [
        {
          id: 1,
          author: 'Priya Sharma',
          authorImage: 'https://i.pravatar.cc/150?img=1',
          rating: 5,
          date: '1 week ago',
          comment: 'Excellent course on business strategy. Anjali provides great insights and practical advice.'
        }
      ]
    }
  }

  const course = courseData[courseId] || courseData[1]
  const freeVideos = course.videos.filter(v => v.isFree)
  const lockedVideos = course.videos.filter(v => !v.isFree)
  const currentVideo = course.videos[currentVideoIndex]

  const handleVideoSelect = (index) => {
    const video = course.videos[index]
    if (video.isFree || isPurchased) {
      setCurrentVideoIndex(index)
    }
  }

  const handlePurchase = () => {
    // In real app, this would redirect to payment
    alert('Redirecting to payment...')
    // navigate('/payment')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '2rem 1rem'
      }}>
        {/* Back Button */}
        <Link 
          to="/community" 
          style={{ 
            textDecoration: 'none', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: '#2D68C4', 
            marginBottom: '1.5rem', 
            fontWeight: 600 
          }}
        >
          <ArrowLeft size={20} />
          <span>Back to Community</span>
        </Link>

        {/* Course Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.5rem',
            background: 'rgba(45, 104, 196, 0.1)',
            color: '#2D68C4',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            {course.category}
          </div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 800, 
            color: '#1f2937', 
            marginBottom: '0.5rem' 
          }}>
            {course.title}
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            color: '#6b7280', 
            marginBottom: '0.5rem' 
          }}>
            by {course.instructor}
          </p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Star size={18} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
              <span style={{ fontWeight: 700, color: '#1f2937' }}>{course.rating}</span>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                ({course.totalReviews} reviews)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280' }}>
              <Users size={16} />
              <span style={{ fontSize: '0.875rem' }}>{course.students} students</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280' }}>
              <Clock size={16} />
              <span style={{ fontSize: '0.875rem' }}>{course.duration}</span>
            </div>
            <div style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '0.5rem',
              background: '#e5e7eb',
              color: '#6b7280',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
              {course.level}
            </div>
          </div>
        </div>

        <div className="course-player-layout">
          {/* Main Video Section */}
          <div style={{ minWidth: 0 }}>
            {/* Video Player */}
            <div style={{
              background: '#000',
              borderRadius: '1rem',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              position: 'relative',
              paddingTop: '56.25%',
              height: 0
            }}>
              {(!currentVideo.isFree && !isPurchased) ? (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.9))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  gap: '1rem'
                }}>
                  <Lock size={48} style={{ opacity: 0.8 }} />
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                      This video is locked
                    </h3>
                    <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                      Purchase the course to unlock all videos
                    </p>
                  </div>
                  <button
                    onClick={handlePurchase}
                    style={{
                      padding: '0.75rem 2rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
                      color: 'white',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 104, 196, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    Purchase Course
                  </button>
                </div>
              ) : (
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  src={`${currentVideo.videoUrl}?rel=0`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Current Video Info */}
            <div className="glass-card rounded-2xl p-5" style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#1f2937', 
                marginBottom: '0.5rem' 
              }}>
                {currentVideo.title}
              </h2>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                color: '#6b7280',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={16} />
                  <span>{currentVideo.duration}</span>
                </div>
                <span>•</span>
                <span>Video {currentVideoIndex + 1} of {course.videos.length}</span>
                {currentVideo.isFree && (
                  <>
                    <span>•</span>
                    <span style={{ 
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.5rem',
                      background: 'rgba(147, 181, 83, 0.1)',
                      color: '#93B553',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}>
                      Free Preview
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Course Description */}
            <div className="glass-card rounded-2xl p-5" style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#1f2937', 
                marginBottom: '1rem' 
              }}>
                About This Course
              </h2>
              <p style={{ 
                fontSize: '1rem', 
                color: '#374151', 
                lineHeight: '1.7',
                marginBottom: '1.5rem'
              }}>
                {course.description}
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    Duration
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937' }}>
                    {course.duration}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    Level
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937' }}>
                    {course.level}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    Students
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937' }}>
                    {course.students}+
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    Rating
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                    {course.rating}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="glass-card rounded-2xl p-5">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  color: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <MessageSquare size={24} />
                  Reviews ({course.reviews.length})
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={20} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                    {course.rating}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {course.reviews.map(review => (
                  <div key={review.id} style={{
                    paddingBottom: '1.5rem',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      marginBottom: '0.75rem' 
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}>
                        <img
                          src={review.authorImage}
                          alt={review.author}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem',
                          marginBottom: '0.25rem'
                        }}>
                          <span style={{ fontWeight: 700, color: '#1f2937' }}>
                            {review.author}
                          </span>
                          <div style={{ display: 'flex', gap: '0.125rem' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                style={{ 
                                  color: i < review.rating ? '#f59e0b' : '#d1d5db',
                                  fill: i < review.rating ? '#f59e0b' : 'none'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <p style={{ 
                      fontSize: '0.95rem', 
                      color: '#374151', 
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="glass-card rounded-2xl p-5" style={{ position: 'sticky', top: '80px' }}>
              {/* Price Section */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ 
                    fontSize: '2rem', 
                    fontWeight: 800, 
                    color: '#2D68C4' 
                  }}>
                    {course.price}
                  </span>
                  <span style={{ 
                    fontSize: '1.25rem', 
                    color: '#9ca3af', 
                    textDecoration: 'line-through' 
                  }}>
                    {course.originalPrice}
                  </span>
                </div>
                <button
                  onClick={handlePurchase}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 104, 196, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Enroll Now
                </button>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280', 
                  textAlign: 'center',
                  margin: 0
                }}>
                  30-day money-back guarantee
                </p>
              </div>

              {/* Course Content */}
              <div>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 700, 
                  color: '#1f2937', 
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <BookOpen size={20} />
                  Course Content
                </h3>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.5rem',
                  maxHeight: '500px',
                  overflowY: 'auto'
                }}>
                  {course.videos.map((video, index) => (
                    <div
                      key={video.id}
                      onClick={() => handleVideoSelect(index)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        background: currentVideoIndex === index 
                          ? 'linear-gradient(135deg, rgba(45, 104, 196, 0.1), rgba(254, 111, 94, 0.1))' 
                          : '#fff',
                        border: currentVideoIndex === index 
                          ? '2px solid #2D68C4' 
                          : '1px solid #e5e7eb',
                        cursor: (video.isFree || isPurchased) ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'start',
                        opacity: (!video.isFree && !isPurchased) ? 0.6 : 1
                      }}
                      onMouseEnter={(e) => {
                        if ((video.isFree || isPurchased) && currentVideoIndex !== index) {
                          e.currentTarget.style.background = '#f9fafb'
                          e.currentTarget.style.transform = 'translateX(4px)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentVideoIndex !== index) {
                          e.currentTarget.style.background = '#fff'
                          e.currentTarget.style.transform = 'translateX(0)'
                        }
                      }}
                    >
                      <div style={{
                        width: '80px',
                        height: '45px',
                        borderRadius: '0.5rem',
                        background: (!video.isFree && !isPurchased) 
                          ? 'linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.7))' 
                          : 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
                        flexShrink: 0,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}>
                        {(!video.isFree && !isPurchased) ? (
                          <Lock size={20} style={{ color: 'white', opacity: 0.8 }} />
                        ) : (
                          <Play size={16} style={{ color: 'white', opacity: 0.9 }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: currentVideoIndex === index ? 700 : 600,
                          color: '#1f2937',
                          marginBottom: '0.25rem',
                          lineHeight: '1.4'
                        }}>
                          {video.title}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Clock size={12} />
                          <span>{video.duration}</span>
                          {video.isFree && (
                            <>
                              <span>•</span>
                              <span style={{ color: '#93B553', fontWeight: 600 }}>Free</span>
                            </>
                          )}
                          {(!video.isFree && !isPurchased) && (
                            <>
                              <span>•</span>
                              <span style={{ color: '#ef4444', fontWeight: 600 }}>Locked</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
