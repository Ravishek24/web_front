import React, { useState } from 'react'

export default function Feed() {
  const [posts, setPosts] = useState([
    { id:1, author:'Sarah Johnson', time:'2 hours ago', content:'Just finished teaching my 50th guitar lesson this month! 🎸', image:null, likes:42, comments:8, shares:3, isLiked:false },
    { id:2, author:'Mike Davis', time:'5 hours ago', content:'Fresh honey harvest today! 🍯', image:null, likes:67, comments:12, shares:5, isLiked:true },
  ])

  const toggleLike = (id) => setPosts(p => p.map(post => post.id===id ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes-1 : post.likes+1 } : post))

  const card = {
    background:'#fff',
    border:'1px solid #e5e7eb',
    borderRadius:16,
    overflow:'hidden',
    marginBottom:16,
    boxShadow:'0 6px 24px rgba(0,0,0,.06)'
  }

  const iconBtn = {
    padding:8,
    borderRadius:999,
    background:'#f3f4f6',
    border:'1px solid #e5e7eb'
  }

  const actionBtn = (active) => ({
    display:'flex', gap:8, alignItems:'center',
    color: active ? '#ef4444' : '#374151',
    background: active ? '#fee2e2' : 'transparent',
    border:'1px solid ' + (active ? '#fecaca' : 'transparent'),
    padding:'8px 12px', borderRadius:10, fontWeight:700
  })

  return (
    <main className="container" style={{ maxWidth: 900, margin: '0 auto', padding: '20px' }}>
      {/* Create Post */}
      <div style={{ ...card, padding:16 }}>
        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <div style={{ width:44, height:44, borderRadius:22, background:'#e5e7eb' }} />
          <input placeholder="What's on your mind?" style={{ flex:1, background:'#f8fafc', border:'1px solid #e5e7eb', borderRadius:999, padding:'12px 16px' }} />
          <button style={{ background:'#3b82f6', color:'#fff', padding:'10px 14px', borderRadius:12, fontWeight:700 }}>Post</button>
        </div>
        <div style={{ display:'flex', gap:12, marginTop:12, paddingTop:12, borderTop:'1px solid #e5e7eb' }}>
          <button
            style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'10px 14px',
              borderRadius:999,
              background:'linear-gradient(90deg,#dbeafe,#ede9fe)',
              color:'#1f2937',
              border:'1px solid #e5e7eb',
              boxShadow:'0 4px 12px rgba(59,130,246,.15)'
            }}
            title="Add photo"
          >
            <span>📷</span>
            <span style={{ fontWeight:700 }}>Photo</span>
          </button>
          <button
            style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'10px 14px',
              borderRadius:999,
              background:'#ffffff',
              color:'#1f2937',
              border:'1px solid #e5e7eb',
              boxShadow:'0 2px 8px rgba(0,0,0,.06)'
            }}
            title="Create event"
          >
            <span>📅</span>
            <span style={{ fontWeight:700 }}>Event</span>
          </button>
        </div>
      </div>

      {/* Posts */}
      {posts.map(post => (
        <article key={post.id} style={card}>
          <div style={{ padding:16, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              <div style={{ width:48, height:48, borderRadius:24, background:'#e5e7eb' }} />
              <div>
                <div style={{ fontWeight:700 }}>{post.author}</div>
                <div style={{ fontSize:12, color:'#6b7280' }}>{post.time}</div>
              </div>
            </div>
            <button style={iconBtn}>⋯</button>
          </div>

          <div style={{ padding:'0 16px 12px 16px' }}>
            <p style={{ margin:0, fontSize:15, lineHeight:1.5 }}>{post.content}</p>
          </div>

          {post.image && (
            <div style={{ height:260, background:'#e5e7eb' }} />
          )}

          <div style={{ padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', color:'#6b7280' }}>
            <span style={{ fontWeight:600 }}>{post.likes} likes</span>
            <div style={{ display:'flex', gap:16 }}>
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>
          </div>

          <div style={{ borderTop:'1px solid #e5e7eb', padding:'10px 10px', display:'flex', justifyContent:'space-around', background:'#fafafa' }}>
            <button onClick={() => toggleLike(post.id)} style={actionBtn(post.isLiked)}>★ Like</button>
            <button style={actionBtn(false)}>💬 Comment</button>
            <button style={actionBtn(false)}>↗ Share</button>
          </div>
        </article>
      ))}
    </main>
  )
}


