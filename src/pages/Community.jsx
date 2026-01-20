import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Calendar, MessageSquare, TrendingUp, Award, Heart, BookOpen, Clock, Star, CheckCircle, Play, UserPlus } from 'lucide-react'

export default function Community() {
  const [activeTab, setActiveTab] = useState('course')
  const navigate = useNavigate()
  const [following, setFollowing] = useState({}) // Track which members are being followed

  const myCourses = [
    {
      id: 1,
      title: 'Yoga for Beginners',
      instructor: 'Deepa Rao',
      duration: '6 weeks',
      price: '₹1,800',
      rating: 4.9,
      students: 89,
      level: 'Beginner',
      progress: 45,
      purchasedDate: 'Dec 10, 2024'
    },
    {
      id: 2,
      title: 'Creative Writing Workshop',
      instructor: 'Kavita Das',
      duration: '5 weeks',
      price: '₹2,000',
      rating: 4.6,
      students: 67,
      level: 'Beginner',
      progress: 80,
      purchasedDate: 'Nov 25, 2024'
    }
  ]

  const courses = [
    {
      id: 1,
      title: 'Introduction to Digital Marketing',
      instructor: 'Priya Patel',
      duration: '4 weeks',
      price: '₹2,500',
      rating: 4.8,
      students: 156,
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Yoga for Beginners',
      instructor: 'Deepa Rao',
      duration: '6 weeks',
      price: '₹1,800',
      rating: 4.9,
      students: 89,
      level: 'Beginner'
    },
    {
      id: 3,
      title: 'Business Strategy & Growth',
      instructor: 'Anjali Singh',
      duration: '8 weeks',
      price: '₹4,500',
      rating: 4.7,
      students: 203,
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'Creative Writing Workshop',
      instructor: 'Kavita Das',
      duration: '5 weeks',
      price: '₹2,000',
      rating: 4.6,
      students: 67,
      level: 'Beginner'
    },
    {
      id: 5,
      title: 'Financial Planning for Entrepreneurs',
      instructor: 'Meera Patel',
      duration: '6 weeks',
      price: '₹3,500',
      rating: 4.9,
      students: 124,
      level: 'Intermediate'
    },
    {
      id: 6,
      title: 'Web Development Basics',
      instructor: 'Rekha Nair',
      duration: '10 weeks',
      price: '₹5,000',
      rating: 4.8,
      students: 178,
      level: 'Intermediate'
    }
  ]

  const members = [
    { id: 1, name: 'Priya Sharma', role: 'Entrepreneur', image: 'https://i.pravatar.cc/150?img=1', joined: '2023', posts: 45, connections: 120 },
    { id: 2, name: 'Anita Desai', role: 'Creative Professional', image: 'https://i.pravatar.cc/150?img=5', joined: '2023', posts: 32, connections: 98 },
    { id: 3, name: 'Meera Patel', role: 'Small Business Owner', image: 'https://i.pravatar.cc/150?img=9', joined: '2024', posts: 28, connections: 87 },
    { id: 4, name: 'Kavita Reddy', role: 'Career Professional', image: 'https://i.pravatar.cc/150?img=12', joined: '2024', posts: 19, connections: 65 },
    { id: 5, name: 'Sunita Kumar', role: 'Wellness Coach', image: 'https://i.pravatar.cc/150?img=20', joined: '2023', posts: 56, connections: 145 },
    { id: 6, name: 'Rekha Nair', role: 'Tech Professional', image: 'https://i.pravatar.cc/150?img=33', joined: '2024', posts: 41, connections: 112 }
  ]

  const events = [
    { id: 1, title: 'Monthly Networking Meetup', date: 'Jan 25, 2026', time: '6:00 PM', location: 'Community Center', attendees: 45, type: 'networking' },
    { id: 2, title: 'Business Growth Workshop', date: 'Feb 2, 2026', time: '10:00 AM', location: 'Online', attendees: 120, type: 'workshop' },
    { id: 3, title: 'Creative Showcase Event', date: 'Feb 10, 2026', time: '4:00 PM', location: 'Art Gallery', attendees: 30, type: 'showcase' },
    { id: 4, title: 'Mentorship Program Launch', date: 'Feb 15, 2026', time: '2:00 PM', location: 'Community Center', attendees: 60, type: 'program' }
  ]

  const discussions = [
    { id: 1, title: 'Tips for Starting Your First Business', author: 'Priya Sharma', replies: 24, views: 156, category: 'Business', time: '2 hours ago' },
    { id: 2, title: 'Best Practices for Online Marketing', author: 'Anita Desai', replies: 18, views: 98, category: 'Marketing', time: '5 hours ago' },
    { id: 3, title: 'Work-Life Balance Strategies', author: 'Sunita Kumar', replies: 32, views: 201, category: 'Wellness', time: '1 day ago' },
    { id: 4, title: 'Building Your Professional Network', author: 'Rekha Nair', replies: 15, views: 87, category: 'Career', time: '2 days ago' }
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
          Explore Our Community
        </h1>
        <p className="text-lg text-gray-600">
          Connect with inspiring women, join events, and grow together
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div className="glass-card rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, rgba(45, 104, 196, 0.1), rgba(254, 111, 94, 0.1))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Users size={24} style={{ color: '#2D68C4' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1f2937' }}>156+</span>
          </div>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem', fontWeight: 600 }}>Active Members</p>
        </div>
        <div className="glass-card rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, rgba(180, 229, 142, 0.1), rgba(147, 181, 83, 0.1))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Calendar size={24} style={{ color: '#93B553' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1f2937' }}>12+</span>
          </div>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem', fontWeight: 600 }}>Upcoming Events</p>
        </div>
        <div className="glass-card rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, rgba(254, 111, 94, 0.1), rgba(45, 104, 196, 0.1))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <MessageSquare size={24} style={{ color: '#FE6F5E' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1f2937' }}>89</span>
          </div>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem', fontWeight: 600 }}>Active Discussions</p>
        </div>
        <div className="glass-card rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, rgba(45, 104, 196, 0.1), rgba(180, 229, 142, 0.1))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <TrendingUp size={24} style={{ color: '#2D68C4' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1f2937' }}>↑ 12%</span>
          </div>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem', fontWeight: 600 }}>Growth This Month</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '2px solid #e5e7eb' }}>
        {[
          { key: 'course', label: 'Course', icon: BookOpen },
          { key: 'members', label: 'Members', icon: Users },
          { key: 'events', label: 'Events', icon: Calendar },
          { key: 'discussions', label: 'Discussions', icon: MessageSquare }
        ].map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === tab.key ? '3px solid #2D68C4' : '3px solid transparent',
                color: activeTab === tab.key ? '#2D68C4' : '#6b7280',
                fontWeight: activeTab === tab.key ? 700 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'course' && (
        <>
          {/* All Courses Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {courses.map(course => (
              <div
                key={course.id}
                className="glass-card rounded-2xl overflow-hidden"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
                }}
              >
                {/* Course Image */}
                <div style={{
                  width: '100%',
                  height: '180px',
                  background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BookOpen size={48} style={{ color: 'white', opacity: 0.8 }} />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'white'
                  }}>
                    {course.level}
                  </div>
                </div>

                {/* Course Content */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: '#1f2937',
                    marginBottom: '0.5rem',
                    lineHeight: '1.4'
                  }}>
                    {course.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    fontWeight: 600,
                    marginBottom: '1rem'
                  }}>
                    by {course.instructor}
                  </p>

                  {/* Course Meta */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Users size={14} />
                      <span>{course.students} students</span>
                    </div>
                  </div>

                  {/* Course Footer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1f2937' }}>
                        {course.rating}
                      </span>
                    </div>
                    <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#2D68C4' }}>
                      {course.price}
                    </span>
                  </div>

                  {/* Enroll Button */}
                  <button 
                    onClick={() => navigate(`/course-intro/${course.id}`)}
                    style={{
                      marginTop: '1rem',
                      padding: '0.75rem',
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
                    }}>
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Divider Line */}
          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)',
            margin: '3rem 0'
          }} />

          {/* My Courses Section */}
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#1f2937',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle size={28} style={{ color: '#93B553' }} />
              My Courses
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '1.5rem'
            }}>
              Continue learning from your purchased courses
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {myCourses.map(course => (
                <div
                  key={course.id}
                  className="glass-card rounded-2xl overflow-hidden"
                  style={{
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '2px solid rgba(147, 181, 83, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(147, 181, 83, 0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
                  }}
                >
                  {/* Course Image */}
                  <div style={{
                    width: '100%',
                    height: '180px',
                    background: 'linear-gradient(135deg, #93B553, #76EFE3)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <BookOpen size={48} style={{ color: 'white', opacity: 0.8 }} />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(147, 181, 83, 0.95)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <CheckCircle size={12} />
                      Purchased
                    </div>
                  </div>

                  {/* Course Content */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: '#1f2937',
                      marginBottom: '0.5rem',
                      lineHeight: '1.4'
                    }}>
                      {course.title}
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      fontWeight: 600,
                      marginBottom: '1rem'
                    }}>
                      by {course.instructor}
                    </p>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        <span style={{ fontWeight: 600 }}>Progress</span>
                        <span style={{ fontWeight: 700, color: '#93B553' }}>{course.progress}%</span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '999px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${course.progress}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #93B553, #76EFE3)',
                          borderRadius: '999px',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>

                    {/* Course Meta */}
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      marginBottom: '1rem',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} />
                        <span>{course.duration}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Users size={14} />
                        <span>{course.students} students</span>
                      </div>
                    </div>

                    {/* Purchased Date */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e5e7eb',
                      fontSize: '0.75rem',
                      color: '#9ca3af',
                      marginBottom: '1rem'
                    }}>
                      Purchased on {course.purchasedDate}
                    </div>

                    {/* Continue Learning Button */}
                    <button 
                      onClick={() => navigate(`/course/${course.id}`)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '0.75rem',
                        border: 'none',
                        background: 'linear-gradient(135deg, #93B553, #76EFE3)',
                        color: 'white',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(147, 181, 83, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}>
                      <Play size={18} />
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'members' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {members.map(member => (
            <div
              key={member.id}
              className="glass-card rounded-2xl p-5"
              style={{
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid #e5e7eb'
                }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#1f2937' }}>
                    {member.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', fontWeight: 600 }}>
                    {member.role}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                <span><strong style={{ color: '#1f2937' }}>{member.posts}</strong> Posts</span>
                <span><strong style={{ color: '#1f2937' }}>{member.connections}</strong> Connections</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setFollowing(prev => ({
                    ...prev,
                    [member.id]: !prev[member.id]
                  }))
                }}
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  borderRadius: '0.75rem',
                  border: following[member.id] ? '2px solid #93B553' : '2px solid #2D68C4',
                  background: following[member.id] 
                    ? 'linear-gradient(135deg, #93B553, #76EFE3)' 
                    : 'white',
                  color: following[member.id] ? 'white' : '#2D68C4',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}
                onMouseEnter={(e) => {
                  if (!following[member.id]) {
                    e.currentTarget.style.background = '#f3f4f6'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!following[member.id]) {
                    e.currentTarget.style.background = 'white'
                  }
                }}
              >
                {following[member.id] ? (
                  <>
                    <CheckCircle size={16} />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    Follow
                  </>
                )}
              </button>
              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Joined {member.joined}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {events.map(event => (
            <div
              key={event.id}
              className="glass-card rounded-2xl p-5"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                flexShrink: 0
              }}>
                <span style={{ fontSize: '1.5rem' }}>{new Date(event.date).getDate()}</span>
                <span style={{ fontSize: '0.75rem' }}>{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {event.title}
                </h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.875rem', color: '#6b7280' }}>
                  <span>🕐 {event.time}</span>
                  <span>📍 {event.location}</span>
                  <span>👥 {event.attendees} attending</span>
                </div>
              </div>
              <button style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.75rem',
                border: '2px solid #2D68C4',
                background: 'white',
                color: '#2D68C4',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2D68C4'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.color = '#2D68C4'
              }}>
                Join
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'discussions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {discussions.map(discussion => (
            <div
              key={discussion.id}
              className="glass-card rounded-2xl p-5"
              style={{
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                    {discussion.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span>By {discussion.author}</span>
                    <span>•</span>
                    <span>{discussion.time}</span>
                    <span>•</span>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.5rem',
                      background: 'rgba(45, 104, 196, 0.1)',
                      color: '#2D68C4',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}>
                      {discussion.category}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <span>💬 {discussion.replies} replies</span>
                <span>👁️ {discussion.views} views</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
