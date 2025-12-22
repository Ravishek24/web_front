import React from 'react'

export default function Notifications() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginTop:0 }}>Notifications</h2>
      <div style={{ display:'grid', gap:12 }}>
        {[
          { color:'#3b82f6', bg:'#dbeafe', text:'Sarah Johnson sent you a message about Guitar Lessons', time:'5 min ago' },
          { color:'#f59e0b', bg:'#fef3c7', text:'Your listing received a 5-star review!', time:'1 hour ago' },
          { color:'#10b981', bg:'#d1fae5', text:'3 new members joined your community', time:'2 hours ago' },
          { color:'#8b5cf6', bg:'#ede9fe', text:'Mike Davis purchased your Handmade Ceramic Bowl', time:'3 hours ago' }
        ].map((n, i) => (
          <div key={i} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:16, display:'flex', gap:12, alignItems:'flex-start' }}>
            <div style={{ width:40, height:40, borderRadius:999, background:n.bg, display:'flex', alignItems:'center', justifyContent:'center', color:n.color }}>★</div>
            <div style={{ flex:1 }}>
              <div style={{ marginBottom:4 }}>{n.text}</div>
              <div style={{ color:'#6b7280', fontSize:12 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}


