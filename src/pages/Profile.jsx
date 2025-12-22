import React, { useState } from 'react'

export default function Profile() {
  const [tab, setTab] = useState('activity') // activity | messages | listings

  const pill = (active) => ({
    padding: '10px 14px',
    borderRadius: 999,
    fontWeight: 700,
    background: active ? '#e0f2fe' : 'transparent',
    color: active ? '#0369a1' : '#374151',
    border: '1px solid ' + (active ? '#bae6fd' : 'transparent')
  })

  return (
    <main className="container">
      {/* Cover banner */}
      <div style={{ height: 140, borderRadius: 16, background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)', boxShadow:'inset 0 0 0 1px rgba(255,255,255,.15)', marginBottom: -60 }} />

      <div className="profile-grid">
        {/* Left sidebar - avatar card */}
        <aside>
          <div style={{ background:'rgba(255,255,255,0.7)', backdropFilter:'blur(6px)', border:'1px solid #e5e7eb', borderRadius:16, padding:20, position:'sticky', top:16, boxShadow:'0 6px 24px rgba(0,0,0,.06)' }}>
            <div style={{ width:180, height:180, borderRadius:24, background:'#e5e7eb', margin:'-80px auto 12px', border:'6px solid #fff' }} />
            <h2 style={{ margin:'0 0 4px 0' }}>John Doe</h2>
            <div style={{ color:'#6b7280', fontSize:12, marginBottom:12 }}>Community Enthusiast</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:16 }}>
              {[{n:42,l:'Posts'},{n:128,l:'Followers'},{n:85,l:'Following'}].map((s,i)=> (
                <div key={i} style={{ textAlign:'center', background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:12, padding:'10px 8px' }}>
                  <div style={{ fontWeight:800, color:'#2563eb' }}>{s.n}</div>
                  <div style={{ fontSize:12, color:'#6b7280' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button style={{ flex:1, background:'#3b82f6', color:'#fff', padding:'12px 14px', borderRadius:12, fontWeight:700 }}>Message</button>
              <button style={{ width:44, height:44, borderRadius:12, background:'#f3f4f6', fontWeight:700 }}>＋</button>
            </div>
            <div style={{ marginTop:12, background:'linear-gradient(90deg,#fb923c,#ec4899)', color:'#fff', padding:'10px 14px', borderRadius:12, textAlign:'center', fontWeight:700 }}>Upgrade Membership</div>
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
          <div style={{ display:'flex', gap:8, marginTop:16, marginBottom:16 }}>
            {[
              { key:'activity', label:'Activity' },
              { key:'messages', label:'Messages' },
              { key:'listings', label:'Listings' }
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={pill(tab===t.key)}>{t.label}</button>
            ))}
          </div>

          {/* Tab content */}
          {tab === 'activity' && (
            <div style={{ display:'grid', gap:12 }}>
              {[
                { text:'Earned "Active Member" badge', when:'2 hours ago' },
                { text:'Posted in "General Discussion"', when:'1 day ago' },
                { text:'Joined the community', when:'3 days ago' },
              ].map((a,i) => (
                <div key={i} style={{ display:'flex', gap:12, alignItems:'center', background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:14, boxShadow:'0 2px 10px rgba(0,0,0,.03)' }}>
                  <div style={{ width:36, height:36, borderRadius:18, background:'#dbeafe', display:'flex', alignItems:'center', justifyContent:'center', color:'#1d4ed8', fontWeight:800 }}>★</div>
                  <div>
                    <div style={{ fontWeight:600 }}>{a.text}</div>
                    <div style={{ color:'#6b7280', fontSize:12 }}>{a.when}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'messages' && (
            <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:16, color:'#6b7280' }}>
              Messages feature coming soon.
            </div>
          )}

          {tab === 'listings' && (
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
          )}
        </section>
      </div>
    </main>
  )
}


