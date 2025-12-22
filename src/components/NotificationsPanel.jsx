import React, { useEffect } from 'react'

export default function NotificationsPanel({ open, onClose }) {
  useEffect(() => {
    function onEsc(e){ if(e.key==='Escape') onClose?.() }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [onClose])

  if (!open) return null
  return (
    <div style={{ position:'fixed', inset:0, zIndex:50 }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.4)' }} />
      <aside style={{ position:'absolute', top:0, right:0, height:'100%', width:'min(420px, 95vw)', background:'#fff', borderLeft:'1px solid #e5e7eb', boxShadow:'-8px 0 24px rgba(0,0,0,.12)', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:16, borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <h3 style={{ margin:0 }}>Notifications</h3>
          <button onClick={onClose} aria-label="Close notifications" style={{ width:32, height:32, borderRadius:8, background:'#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, lineHeight:1 }}>×</button>
        </div>
        <div style={{ padding:16, overflowY:'auto', flex:1, display:'grid', gap:12 }}>
          {[
            { color:'#3b82f6', bg:'#dbeafe', text:'Sarah Johnson sent you a message about Guitar Lessons', time:'5 min ago' },
            { color:'#f59e0b', bg:'#fef3c7', text:'Your listing received a 5-star review!', time:'1 hour ago' },
            { color:'#10b981', bg:'#d1fae5', text:'3 new members joined your community', time:'2 hours ago' },
            { color:'#8b5cf6', bg:'#ede9fe', text:'Mike Davis purchased your Handmade Ceramic Bowl', time:'3 hours ago' },
            { color:'#3b82f6', bg:'#dbeafe', text:'Reminder: Your event starts tomorrow at 10 AM', time:'Yesterday' },
          ].map((n, i) => (
            <div key={i} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:12, display:'flex', gap:12, alignItems:'flex-start' }}>
              <div style={{ width:36, height:36, borderRadius:999, background:n.bg, display:'flex', alignItems:'center', justifyContent:'center', color:n.color }}>★</div>
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:4 }}>{n.text}</div>
                <div style={{ color:'#6b7280', fontSize:12 }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}


