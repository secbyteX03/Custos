'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', active: true },
  { href: '/vault', label: 'Vault' },
  { href: '/switch', label: "Dead Man's Switch" },
  { href: '/heirs', label: 'Heirs' },
  { href: '/settings', label: 'Settings' },
]

const ACTIVITY = [
  { icon: '✓', label: 'System initialized', sub: 'Custos vault successfully configured', time: 'Just now', color: '#C9A84C' },
  { icon: '✓', label: 'Welcome to Custos', sub: 'Bitcoin inheritance platform is ready', time: '1 min ago', color: '#C9A84C' },
  { icon: '🔐', label: 'Multisig vault created', sub: '2-of-3 signing scheme activated', time: '2 min ago', color: '#C9A84C' },
  { icon: '⏱', label: 'Dead man\'s switch armed', sub: 'Check-in interval set to 90 days', time: '3 min ago', color: '#888' },
  { icon: '📋', label: 'KYC verification pending', sub: 'Identity verification required for heirs', time: '5 min ago', color: '#f5a623' },
]

const SECURITY_ITEMS = [
  { label: 'Hardware wallet', status: 'Connected', ok: true },
  { label: 'HSM key', status: 'Active', ok: true },
  { label: 'Web app key', status: 'Active', ok: true },
  { label: 'Heir KYC', status: 'Pending', ok: false },
  { label: 'Trusted contacts', status: 'Not set', ok: false },
]

export default function Dashboard() {
  const [checkedIn, setCheckedIn] = useState(false)
  const [daysLeft, setDaysLeft] = useState(89)

  function handleCheckIn() {
    setCheckedIn(true)
    setDaysLeft(90)
  }

  const pct = daysLeft / 90
  const r = 30
  const circ = 2 * Math.PI * r
  const dash = circ * pct

  return (
    <div style={{ background: '#030303', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #C9A84C33; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #2a2a2a; }
        .nav-link { color: #444; font-size: 13px; text-decoration: none; letter-spacing: 0.02em; transition: color 0.15s; }
        .nav-link:hover { color: #C9A84C; }
        .nav-link.active { color: #C9A84C; border-bottom: 1px solid #C9A84C; padding-bottom: 2px; }
        .card { background: #0a0a0a; border: 0.5px solid #1a1a1a; border-radius: 8px; }
        .card-inner { background: #0d0d0d; border: 0.5px solid #1e1e1e; border-radius: 6px; }
        .label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #444; }
        .btn-gold { background: #C9A84C; color: #000; border: none; padding: 10px 22px; font-size: 13px; font-weight: 500; border-radius: 4px; cursor: pointer; letter-spacing: 0.03em; font-family: inherit; transition: background 0.15s, transform 0.1s; white-space: nowrap; }
        .btn-gold:hover { background: #d9b85c; }
        .btn-gold:active { transform: scale(0.98); }
        .btn-outline { background: transparent; color: #C9A84C; border: 1px solid #C9A84C33; padding: 10px 22px; font-size: 13px; font-weight: 400; border-radius: 4px; cursor: pointer; font-family: inherit; transition: all 0.15s; white-space: nowrap; }
        .btn-outline:hover { border-color: #C9A84C; background: #C9A84C0a; }
        .btn-ghost { background: transparent; color: #555; border: 1px solid #1a1a1a; padding: 10px 22px; font-size: 13px; border-radius: 4px; cursor: pointer; font-family: inherit; transition: all 0.15s; white-space: nowrap; }
        .btn-ghost:hover { border-color: #2a2a2a; color: #888; }
        .tag { display: inline-block; background: #C9A84C15; color: #C9A84C; border: 0.5px solid #C9A84C33; border-radius: 3px; font-size: 10px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 8px; }
        .tag-warn { background: #f5a62315; color: #f5a623; border: 0.5px solid #f5a62333; }
        .tag-red { background: #ff444415; color: #ff6b6b; border: 0.5px solid #ff444430; }
        .divider { border: none; border-top: 0.5px solid #141414; }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 500; color: #C9A84C; line-height: 1; }
        .dot-active { width: 7px; height: 7px; border-radius: 50%; background: #C9A84C; box-shadow: 0 0 8px #C9A84C66; flex-shrink: 0; }
        .dot-warn { width: 7px; height: 7px; border-radius: 50%; background: #f5a623; flex-shrink: 0; }
        .dot-muted { width: 7px; height: 7px; border-radius: 50%; background: #333; flex-shrink: 0; }
        .nav-action { color: #333; font-size: 11px; text-decoration: none; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.15s; }
        .nav-action:hover { color: #C9A84C; }
        .footer-link { font-size: 12px; color: #252525; text-decoration: none; transition: color 0.15s; }
        .footer-link:hover { color: #C9A84C; }
        .progress-bar { height: 3px; background: #141414; border-radius: 2px; overflow: hidden; margin-top: 8px; }
        .progress-fill { height: 100%; background: #C9A84C; border-radius: 2px; transition: width 0.4s ease; }
        .activity-row { display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; border-bottom: 0.5px solid #0f0f0f; }
        .activity-row:last-child { border-bottom: none; }
        .security-row { display: flex; align-items: center; justify-content: space-between; padding: 11px 0; border-bottom: 0.5px solid #0f0f0f; }
        .security-row:last-child { border-bottom: none; }
      `}</style>

      {/* Topbar */}
      <header style={{ borderBottom: '0.5px solid #141414', padding: '0 40px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#030303', zIndex: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: '#000' }}>C</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: '#C9A84C', letterSpacing: '0.06em' }}>CUSTOS</span>
        </div>
        <nav style={{ display: 'flex', gap: 28 }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className={`nav-link${l.active ? ' active' : ''}`}>{l.label}</a>
          ))}
        </nav>
        <button className="btn-gold" style={{ fontSize: 12, padding: '7px 18px' }}>Connect</button>
      </header>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '44px 40px 80px' }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36 }}>
          <div>
            <p className="label" style={{ marginBottom: 8 }}>Overview</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 500, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>Dashboard</h1>
            <p style={{ marginTop: 8, fontSize: 14, color: '#3a3a3a', lineHeight: 1.6 }}>
              Your vault is active. Last check-in <span style={{ color: '#555' }}>just now.</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            <button className="btn-outline" onClick={handleCheckIn}>Check in now</button>
            <a href="/heirs" className="btn-ghost" style={{ display: 'inline-block', textDecoration: 'none', padding: '10px 22px', fontSize: 13, border: '1px solid #1a1a1a', borderRadius: 4, color: '#555' }}>Add heir</a>
          </div>
        </div>

        {/* Top stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
          {[
            { label: 'Vault status', value: 'Active', sub: '2-of-3 multisig', gold: true },
            { label: 'Bitcoin secured', value: '—', sub: 'Connect wallet to view', gold: false },
            { label: 'Heirs designated', value: '0', sub: 'None added yet', gold: false },
            { label: 'Setup complete', value: '60%', sub: '3 of 5 steps done', gold: false, progress: 60 },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: '20px 22px' }}>
              <p className="label" style={{ marginBottom: 10 }}>{s.label}</p>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 500, color: s.gold ? '#C9A84C' : '#ddd', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#333', marginTop: 5 }}>{s.sub}</div>
              {s.progress !== undefined && (
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${s.progress}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main content row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Vault status */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
              <div>
                <p className="label" style={{ marginBottom: 6 }}>Vault</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="dot-active" />
                  <span style={{ fontSize: 14, color: '#C9A84C', fontWeight: 500 }}>Active</span>
                </div>
              </div>
              <a href="/vault" className="nav-action">View vault →</a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
              {[
                { label: 'Your key', icon: '🔑', status: 'Hardware wallet', ok: true },
                { label: 'App key', icon: '💻', status: 'Web app', ok: true },
                { label: 'HSM key', icon: '🛡', status: 'Custos HSM', ok: true },
              ].map((k, i) => (
                <div key={i} className="card-inner" style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>{k.icon}</div>
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>{k.label}</div>
                  <div style={{ fontSize: 10, color: '#C9A84C' }}>{k.status}</div>
                </div>
              ))}
            </div>

            <div className="card-inner" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke="#C9A84C" strokeWidth="0.8" /><path d="M4 7l2 2 4-4" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span style={{ fontSize: 12, color: '#555' }}>2-of-3 multisig requires any two keys to authorize a transaction</span>
            </div>
          </div>

          {/* Dead man's switch */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
              <div>
                <p className="label" style={{ marginBottom: 6 }}>Dead man's switch</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="dot-active" />
                  <span style={{ fontSize: 14, color: '#C9A84C', fontWeight: 500 }}>Armed</span>
                </div>
              </div>
              <a href="/switch" className="nav-action">Configure →</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20 }}>
              <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="40" cy="40" r={r} stroke="#1a1a1a" strokeWidth="5" />
                  <circle cx="40" cy="40" r={r} stroke="#C9A84C" strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={`${dash} ${circ}`} style={{ transition: 'stroke-dasharray 0.8s ease' }} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#C9A84C', lineHeight: 1 }}>{daysLeft}</div>
                  <div style={{ fontSize: 9, color: '#444', letterSpacing: '0.06em', marginTop: 2 }}>DAYS</div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 12 }}>
                  <div className="label" style={{ marginBottom: 4 }}>Interval</div>
                  <div style={{ fontSize: 14, color: '#ccc' }}>90 days</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div className="label" style={{ marginBottom: 4 }}>Grace period</div>
                  <div style={{ fontSize: 14, color: '#ccc' }}>30 days</div>
                </div>
                <div>
                  <div className="label" style={{ marginBottom: 4 }}>Trigger window</div>
                  <div style={{ fontSize: 14, color: '#ccc' }}>120 days total</div>
                </div>
              </div>
            </div>

            {checkedIn && (
              <div style={{ padding: '10px 14px', background: '#C9A84C08', border: '0.5px solid #C9A84C22', borderRadius: 4, fontSize: 12, color: '#C9A84C88', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke="#C9A84C" strokeWidth="0.8" /><path d="M4 7l2 2 4-4" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Checked in. Timer reset to 90 days.
              </div>
            )}
          </div>
        </div>

        {/* Third row: Security checklist + Activity + Heirs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Security checklist */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <p className="label">Security checklist</p>
              <span className="tag-warn" style={{ fontSize: 9, padding: '2px 7px' }}>2 pending</span>
            </div>
            {SECURITY_ITEMS.map((item, i) => (
              <div key={i} className="security-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {item.ok
                    ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke="#C9A84C" strokeWidth="0.8" /><path d="M4 7l2 2 4-4" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke="#333" strokeWidth="0.8" /><path d="M5 5l4 4M9 5l-4 4" stroke="#333" strokeWidth="1" strokeLinecap="round" /></svg>
                  }
                  <span style={{ fontSize: 13, color: item.ok ? '#aaa' : '#444' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: 11, color: item.ok ? '#C9A84C' : '#f5a623' }}>{item.status}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }} />
              </div>
              <div style={{ fontSize: 11, color: '#333', marginTop: 6 }}>3 of 5 complete</div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <p className="label">Recent activity</p>
              <a href="#" className="nav-action">All →</a>
            </div>
            <div>
              {ACTIVITY.map((a, i) => (
                <div key={i} className="activity-row">
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#111', border: '0.5px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: '#ccc', marginBottom: 2, lineHeight: 1.3 }}>{a.label}</div>
                    <div style={{ fontSize: 11, color: '#333', lineHeight: 1.4 }}>{a.sub}</div>
                  </div>
                  <div style={{ fontSize: 10, color: '#2a2a2a', flexShrink: 0, marginTop: 2 }}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Heirs overview */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <p className="label">Heirs</p>
              <a href="/heirs" className="nav-action">Manage →</a>
            </div>

            <div style={{ textAlign: 'center', padding: '24px 0 20px' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.15 }}>
                <circle cx="15" cy="14" r="6" stroke="#fff" strokeWidth="1" />
                <circle cx="26" cy="14" r="6" stroke="#fff" strokeWidth="1" />
                <path d="M5 32c0-6 4.5-10 10-10M25 22c5.5 0 10 4 10 10" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <div style={{ fontSize: 13, color: '#2e2e2e', marginBottom: 4 }}>No heirs designated</div>
              <div style={{ fontSize: 11, color: '#222', lineHeight: 1.6, marginBottom: 20 }}>Add heirs to define who receives your bitcoin when the switch triggers</div>
              <button className="btn-gold" style={{ width: '100%' }}>Add first heir</button>
            </div>

            <hr className="divider" style={{ margin: '4px 0 16px' }} />

            <div className="card-inner" style={{ padding: '11px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="7" cy="7" r="6.5" stroke="#444" strokeWidth="0.8" />
                <path d="M7 5v3M7 9.5v.5" stroke="#444" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 11, color: '#333', lineHeight: 1.6 }}>Heirs receive PGP-encrypted instructions and require KYC before access.</span>
            </div>
          </div>
        </div>

        {/* Bottom: Bitcoin price ticker + quick tips */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>

          {/* Price / portfolio placeholder */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <p className="label" style={{ marginBottom: 6 }}>Bitcoin</p>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#C9A84C', lineHeight: 1 }}>$—</div>
                <div style={{ fontSize: 11, color: '#333', marginTop: 4 }}>Connect wallet to track holdings</div>
              </div>
              <button className="btn-outline" style={{ fontSize: 12, padding: '7px 16px' }}>Connect wallet</button>
            </div>

            {/* Fake sparkline */}
            <div style={{ height: 56, position: 'relative', marginBottom: 16 }}>
              <svg width="100%" height="56" viewBox="0 0 500 56" preserveAspectRatio="none" fill="none">
                <path d="M0 40 C60 35, 80 20, 120 22 C160 24, 180 38, 220 30 C260 22, 280 10, 320 14 C360 18, 380 32, 420 26 C460 20, 480 12, 500 8"
                  stroke="#C9A84C33" strokeWidth="1.5" />
                <path d="M0 40 C60 35, 80 20, 120 22 C160 24, 180 38, 220 30 C260 22, 280 10, 320 14 C360 18, 380 32, 420 26 C460 20, 480 12, 500 8 L500 56 L0 56 Z"
                  fill="url(#goldGrad)" opacity="0.06" />
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A84C" />
                    <stop offset="100%" stopColor="#C9A84C00" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { label: 'Holdings', value: '—' },
                { label: 'USD value', value: '—' },
                { label: 'Protected since', value: 'Today' },
              ].map((m, i) => (
                <div key={i} className="card-inner" style={{ padding: '12px 14px' }}>
                  <div className="label" style={{ marginBottom: 5 }}>{m.label}</div>
                  <div style={{ fontSize: 16, color: '#888', fontFamily: "'Playfair Display', serif" }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="card" style={{ padding: 28 }}>
            <p className="label" style={{ marginBottom: 20 }}>Next steps</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { num: '01', title: 'Connect wallet', desc: 'Link your hardware wallet to the vault', done: false, href: '/vault' },
                { num: '02', title: 'Add an heir', desc: 'Designate who inherits your bitcoin', done: false, href: '/heirs' },
                { num: '03', title: 'Add trusted contact', desc: 'Someone who confirms you are OK', done: false, href: '/switch' },
                { num: '04', title: 'Complete KYC', desc: 'Verify heir identities for legal protection', done: false, href: '/heirs' },
              ].map((s, i) => (
                <a key={i} href={s.href} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < 3 ? '0.5px solid #0f0f0f' : 'none', textDecoration: 'none', transition: 'opacity 0.15s' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: s.done ? '#C9A84C33' : '#C9A84C22', lineHeight: 1.2, flexShrink: 0, width: 24 }}>{s.num}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: s.done ? '#333' : '#aaa', marginBottom: 2 }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: '#2e2e2e', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="#2a2a2a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '0.5px solid #0f0f0f', padding: '40px', background: '#030303' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: 5, background: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: 12, fontWeight: 600, color: '#000' }}>C</div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: '#C9A84C', letterSpacing: '0.06em' }}>CUSTOS</span>
            </div>
            <p style={{ fontSize: 12, color: '#222', lineHeight: 1.8, maxWidth: 280 }}>Secure Bitcoin inheritance with multisig vaults and dead man's switches. Protect your digital assets for future generations.</p>
          </div>
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2a2a2a', marginBottom: 14 }}>Quick links</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Dashboard', 'Vault', "Dead Man's Switch", 'Heirs'].map(l => (
                <a key={l} href="#" className="footer-link">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2a2a2a', marginBottom: 14 }}>Support</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Documentation', 'Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
                <a key={l} href="#" className="footer-link">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1080, margin: '28px auto 0', borderTop: '0.5px solid #0f0f0f', paddingTop: 20, fontSize: 11, color: '#1e1e1e', letterSpacing: '0.04em' }}>
          © 2026 Custos. All rights reserved.
        </div>
      </footer>
    </div>
  )
}