import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import NotificationsPanel from './components/NotificationsPanel.jsx'

export default function App() {
  const [notifOpen, setNotifOpen] = useState(false)
  const location = useLocation()
  const isMarketplace = location.pathname.startsWith('/marketplace')
  const active = (path) => location.pathname.startsWith(path)

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', minHeight: '100vh', background: '#f8fafc', overflowX: 'hidden', width: '100%' }}>
      <header style={{
        background: 'linear-gradient(90deg,#fef3c7,#fde68a)',
        padding: '8px 0',
        boxShadow: '0 8px 24px rgba(0,0,0,.06)',
        borderBottom: '1px solid rgba(0,0,0,.05)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:1200, margin:'0 auto', padding: '0 8px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 450, color: '#111827', fontFamily: "'BBH Bogle', sans-serif" }}>{isMarketplace ? 'Marketplace' : 'MAADHURAYAM'}</h1>
          </div>
          <nav style={{ display:'flex', gap: 8 }}>
            <button onClick={() => setNotifOpen(true)} className="btn" style={{ background: 'rgba(255,255,255,.8)', color:'#111827', border: '1px solid rgba(0,0,0,.06)', borderRadius: 12, padding: '10px 14px', fontWeight: 700, boxShadow:'0 2px 8px rgba(0,0,0,.05)', backdropFilter: 'blur(4px)' }}>Notifications</button>
            <Link to="/feed" style={{ textDecoration:'none' }}>
              <button className="btn" style={{ background: active('/feed') ? '#3b82f6' : 'rgba(255,255,255,.8)', color: active('/feed') ? '#fff' : '#111827', border: '1px solid rgba(0,0,0,.06)', borderRadius: 12, padding: '10px 14px', fontWeight: 700, boxShadow: active('/feed') ? '0 6px 16px rgba(59,130,246,.35)' : '0 2px 8px rgba(0,0,0,.05)', backdropFilter: 'blur(4px)' }}>Feed</button>
            </Link>
            <Link to="/profile" style={{ textDecoration:'none' }}>
              <button className="btn" style={{ background: active('/profile') ? '#3b82f6' : 'rgba(255,255,255,.8)', color: active('/profile') ? '#fff' : '#111827', border: '1px solid rgba(0,0,0,.06)', borderRadius: 12, padding: '10px 14px', fontWeight: 700, boxShadow: active('/profile') ? '0 6px 16px rgba(59,130,246,.35)' : '0 2px 8px rgba(0,0,0,.05)', backdropFilter: 'blur(4px)' }}>Profile</button>
            </Link>
          </nav>
        </div>
      </header>
      <div style={{ paddingTop: '60px' }}>
        <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        <Outlet />
      </div>
    </div>
  )
}


