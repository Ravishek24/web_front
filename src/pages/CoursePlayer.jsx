import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen } from 'lucide-react'

export default function CoursePlayer() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Mock course data - in real app, this would come from API
  const courseData = {
    1: {
      title: 'Yoga for Beginners',
      instructor: 'Deepa Rao',
      description: 'Learn the fundamentals of yoga practice with this comprehensive beginner course.',
      videos: [
        {
          id: 1,
          title: 'Introduction to Yoga',
          duration: '15:30',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          completed: true
        },
        {
          id: 2,
          title: 'Basic Yoga Poses',
          duration: '22:45',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          completed: true
        },
        {
          id: 3,
          title: 'Breathing Techniques',
          duration: '18:20',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 4,
          title: 'Yoga Flow Sequences',
          duration: '25:10',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 5,
          title: 'Cool Down and Relaxation',
          duration: '12:15',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          completed: false
        }
      ]
    },
    2: {
      title: 'Creative Writing Workshop',
      instructor: 'Kavita Das',
      description: 'Unlock your creative potential and learn to write compelling stories.',
      videos: [
        {
          id: 1,
          title: 'Getting Started with Creative Writing',
          duration: '20:00',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          completed: true
        },
        {
          id: 2,
          title: 'Character Development',
          duration: '28:30',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          completed: true
        },
        {
          id: 3,
          title: 'Plot Structure and Storytelling',
          duration: '24:15',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 4,
          title: 'Dialogue Writing',
          duration: '19:45',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          completed: false
        }
      ]
    }
  }

  const course = courseData[courseId] || courseData[1]
  const currentVideo = course.videos[currentVideoIndex]

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index)
  }

  const handleVideoComplete = () => {
    // Mark video as completed (in real app, this would update backend)
    if (currentVideoIndex < course.videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1)
    }
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

        {/* Course Info */}
        <div style={{ marginBottom: '1.5rem' }}>
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
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#9ca3af' 
          }}>
            {course.description}
          </p>
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
            paddingTop: '56.25%', // 16:9 aspect ratio
            height: 0
          }}>
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              src={`${currentVideo.videoUrl}?autoplay=1&rel=0`}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Current Video Info */}
          <div className="glass-card rounded-2xl p-5">
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
            </div>
            <button
              onClick={handleVideoComplete}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: 'linear-gradient(135deg, #93B553, #76EFE3)',
                color: 'white',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(147, 181, 83, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <CheckCircle size={18} />
              Mark as Complete
            </button>
          </div>
        </div>

        {/* Video Queue Sidebar */}
        <div>
          <div className="glass-card rounded-2xl p-4" style={{ position: 'sticky', top: '80px' }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
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
              gap: '0.75rem',
              maxHeight: 'calc(100vh - 200px)',
              overflowY: 'auto'
            }}>
              {course.videos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(index)}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    background: currentVideoIndex === index 
                      ? 'linear-gradient(135deg, rgba(147, 181, 83, 0.1), rgba(118, 239, 227, 0.1))' 
                      : '#fff',
                    border: currentVideoIndex === index 
                      ? '2px solid #93B553' 
                      : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'start'
                  }}
                  onMouseEnter={(e) => {
                    if (currentVideoIndex !== index) {
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
                  {/* Video Thumbnail */}
                  <div style={{
                    width: '120px',
                    height: '68px',
                    borderRadius: '0.5rem',
                    background: 'linear-gradient(135deg, #93B553, #76EFE3)',
                    flexShrink: 0,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <Play 
                      size={24} 
                      style={{ 
                        color: 'white', 
                        opacity: 0.9,
                        position: 'absolute',
                        zIndex: 1
                      }} 
                    />
                    {video.completed && (
                      <div style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: 'rgba(147, 181, 83, 0.95)',
                        borderRadius: '50%',
                        padding: '2px',
                        zIndex: 2
                      }}>
                        <CheckCircle size={16} style={{ color: 'white' }} />
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
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
                      {video.completed && (
                        <>
                          <span>•</span>
                          <span style={{ color: '#93B553', fontWeight: 600 }}>Completed</span>
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
  )
}
