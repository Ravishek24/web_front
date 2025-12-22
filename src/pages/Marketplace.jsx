import React, { useMemo, useState } from 'react'

export default function Marketplace() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('all')

  const products = [
    { id: 1, title: 'Guitar Lessons for Beginners', price: '$25/hour', type: 'service', rating: 4.8, reviews: 24, location: 'Downtown', meta: '1 hour' },
    { id: 2, title: 'Homemade Organic Honey', price: '$15/jar', type: 'product', rating: 4.9, reviews: 18, location: 'Suburbs', meta: '500g' },
    { id: 3, title: 'Mental Health Counseling', price: '$80/session', type: 'service', rating: 5.0, reviews: 42, location: 'City Center', meta: '50 minutes' },
    { id: 4, title: 'Handmade Ceramic Bowls', price: '$35/set', type: 'product', rating: 4.6, reviews: 12, location: 'Arts District', meta: 'Set of 4' },
  ]

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return products
      .filter(p => (tab === 'all' ? true : p.type === tab))
      .filter(p => (!s ? true : p.title.toLowerCase().includes(s)))
  }, [search, tab])

  return (
    <main className="container">
      <div style={{ margin: '16px 0' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search services & products..."
          style={{ width:'100%', padding:12, borderRadius:12, border:'1px solid #e5e7eb', background:'#f3f4f6' }}
        />
      </div>

      <div style={{ display:'flex', gap:8, margin:'12px 0' }}>
        {[
          { key:'all', label:'All' },
          { key:'service', label:'Services' },
          { key:'product', label:'Products' }
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ padding:'8px 12px', borderRadius:12, border:0, fontWeight:700, background: tab===t.key ? '#3b82f6' : '#f3f4f6', color: tab===t.key ? '#fff' : '#6b7280' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="marketplace-grid">
        {filtered.map(p => (
          <article key={p.id} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:16, overflow:'hidden' }}>
            <div style={{ height:160, background:'#e5e7eb' }} />
            <div style={{ padding:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <h4 style={{ margin:0, fontSize:14, fontWeight:700 }}>{p.title}</h4>
                <span style={{ fontWeight:800 }}>{p.price}</span>
              </div>
              <p style={{ margin:0, color:'#6b7280' }}>{p.type === 'service' ? 'Service' : 'Product'}</p>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ color:'#6b7280' }}>{p.location}</span>
                <div style={{ display:'flex', alignItems:'center', gap:6, color:'#f59e0b' }}>
                  <span>★</span>
                  <span style={{ color:'#6b7280' }}>{p.rating}</span>
                  <span style={{ color:'#9ca3af' }}>({p.reviews})</span>
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ color:'#6b7280' }}>{p.location}</span>
                <span style={{ color:'#6b7280' }}>{p.meta}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}


