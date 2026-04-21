'use client'

import Link from 'next/link'

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/vault', label: 'Vault' },
  { href: '/switch', label: 'Dead Man\'s Switch' },
  { href: '/heirs', label: 'Heirs' },
  { href: '/settings', label: 'Settings' },
]

interface AppHeaderProps {
  activePath?: string
}

export default function AppHeader({ activePath = '' }: AppHeaderProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        .nav-link { color: #444; font-size: 13px; font-weight: 400; text-decoration: none; letter-spacing: 0.02em; transition: color 0.15s; padding: 6px 0; }
        .nav-link:hover, .nav-link.active { color: #eab308; }
        .nav-link.active { border-bottom: 1px solid #eab308; }
        .btn-gold { background: #eab308; color: #000; border: none; padding: 10px 24px; font-size: 13px; font-weight: 500; border-radius: 4px; cursor: pointer; letter-spacing: 0.04em; font-family: inherit; transition: background 0.15s, transform 0.1s; }
        .btn-gold:hover { background: #f59e0b; }
        .btn-gold:active { transform: scale(0.98); }
      `}</style>

      {/* Topbar */}
      <header style={{ borderBottom: '0.5px solid #141414', padding: '0 40px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#030303', zIndex: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: '#000' }}>C</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: '#eab308', letterSpacing: '0.06em' }}>CUSTOS</span>
        </div>
        <nav style={{ display: 'flex', gap: 28 }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className={`nav-link${activePath.includes(l.href) ? ' active' : ''}`}>{l.label}</a>
          ))}
        </nav>
        <button className="btn-gold" style={{ fontSize: 12, padding: '7px 18px' }}>Connect</button>
      </header>
    </>
  )
}
