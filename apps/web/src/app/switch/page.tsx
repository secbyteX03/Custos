'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/vault', label: 'Vault' },
  { href: '/switch', label: 'Dead Man\'s Switch', active: true },
  { href: '/heirs', label: 'Heirs' },
  { href: '/settings', label: 'Settings' },
]

const STATES = [
  { id: 'ACTIVE', label: 'Active', sub: 'Normal state' },
  { id: 'WARNING', label: 'Warning', sub: 'Check-in due' },
  { id: 'GRACE', label: 'Grace', sub: '30-day window' },
  { id: 'TRIGGERED', label: 'Triggered', sub: 'Inheritance' },
]

function CheckInRing({ daysLeft, total }: { daysLeft: number; total: number }) {
  const pct = daysLeft / total
  const r = 54
  const circ = 2 * Math.PI * r
  const dash = circ * pct

  return (
    <div className="relative flex items-center justify-center" style={{ width: 148, height: 148 }}>
      <svg width="148" height="148" viewBox="0 0 148 148" fill="none" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="74" cy="74" r={r} stroke="#1a1a1a" strokeWidth="6" />
        <circle
          cx="74" cy="74" r={r}
          stroke="#eab308"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="text-center z-10">
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: '#eab308', lineHeight: 1, fontWeight: 600 }}>
          {daysLeft}
        </div>
        <div style={{ fontSize: 11, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>days left</div>
      </div>
    </div>
  )
}

export default function DeadMansSwitchPage() {
  const [checkedIn, setCheckedIn] = useState(false)
  const [daysLeft, setDaysLeft] = useState(89)
  const [pulse, setPulse] = useState(false)
  const [contacts, setContacts] = useState<string[]>([])
  const [showAddContact, setShowAddContact] = useState(false)
  const [contactInput, setContactInput] = useState('')
  const [interval, setIntervalDays] = useState(90)
  const [grace, setGrace] = useState(30)
  const [showConfig, setShowConfig] = useState(false)
  const [lastCheckin, setLastCheckin] = useState('Just now')

  const currentState = STATES[0]

  function handleCheckIn() {
    setPulse(true)
    setCheckedIn(true)
    setDaysLeft(interval)
    setLastCheckin('Just now')
    setTimeout(() => setPulse(false), 800)
  }

  function addContact() {
    if (contactInput.trim()) {
      setContacts([...contacts, contactInput.trim()])
      setContactInput('')
      setShowAddContact(false)
    }
  }

  return (
    <div style={{ background: '#030303', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #eab30833; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #2a2a2a; }
        .gold { color: #eab308; }
        .nav-link { color: #444; font-size: 13px; font-weight: 400; text-decoration: none; letter-spacing: 0.02em; transition: color 0.15s; padding: 6px 0; }
        .nav-link:hover, .nav-link.active { color: #eab308; }
        .nav-link.active { border-bottom: 1px solid #eab308; }
        .btn-gold { background: #eab308; color: #000; border: none; padding: 10px 24px; font-size: 13px; font-weight: 500; border-radius: 4px; cursor: pointer; letter-spacing: 0.04em; font-family: inherit; transition: background 0.15s, transform 0.1s; }
        .btn-gold:hover { background: #f59e0b; }
        .btn-gold:active { transform: scale(0.98); }
        .btn-outline { background: transparent; color: #eab308; border: 1px solid #eab30833; padding: 10px 24px; font-size: 13px; font-weight: 400; border-radius: 4px; cursor: pointer; letter-spacing: 0.04em; font-family: inherit; transition: all 0.15s; }
        .btn-outline:hover { border-color: #eab308; background: #eab3080a; }
        .btn-ghost { background: transparent; color: #555; border: 1px solid #1a1a1a; padding: 10px 24px; font-size: 13px; font-weight: 400; border-radius: 4px; cursor: pointer; letter-spacing: 0.04em; font-family: inherit; transition: all 0.15s; }
        .btn-ghost:hover { border-color: #2a2a2a; color: #888; }
        .card { background: #0a0a0a; border: 0.5px solid #1a1a1a; border-radius: 8px; }
        .card-inner { background: #0d0d0d; border: 0.5px solid #1e1e1e; border-radius: 6px; }
        .input-field { background: #080808; border: 0.5px solid #2a2a2a; border-radius: 4px; color: #fff; font-family: inherit; font-size: 13px; padding: 9px 14px; outline: none; width: 100%; transition: border-color 0.15s; }
        .input-field:focus { border-color: #eab30855; }
        .state-inactive { opacity: 0.25; filter: grayscale(1); }
        .pulse-ring { animation: pulseRing 0.6s ease-out; }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 #eab30840; } 100% { box-shadow: 0 0 0 20px #eab30800; } }
        .tag { display: inline-block; background: #eab30815; color: #eab308; border: 0.5px solid #eab30833; border-radius: 3px; font-size: 10px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 8px; }
        .tag-red { background: #ff444415; color: #ff6b6b; border: 0.5px solid #ff444430; }
        .divider { border: none; border-top: 0.5px solid #141414; }
        .label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #444; margin-bottom: 6px; }
        .value { font-size: 15px; color: #ddd; font-weight: 400; }
        .step-num { width: 26px; height: 26px; border-radius: 50%; border: 0.5px solid #eab30855; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #eab308; flex-shrink: 0; margin-top: 2px; }
        .modal-overlay { position: fixed; inset: 0; background: #000000cc; z-index: 50; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
        .select-field { background: #080808; border: 0.5px solid #2a2a2a; border-radius: 4px; color: #ccc; font-family: inherit; font-size: 13px; padding: 9px 14px; outline: none; width: 100%; cursor: pointer; }
        .select-field:focus { border-color: #eab30855; }
      `}</style>

      {/* Topbar */}
      <header style={{ borderBottom: '0.5px solid #141414', padding: '0 40px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#030303', zIndex: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: '#000' }}>C</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: '#eab308', letterSpacing: '0.06em' }}>CUSTOS</span>
        </div>
        <nav style={{ display: 'flex', gap: 28 }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className={`nav-link${l.active ? ' active' : ''}`}>{l.label}</a>
          ))}
        </nav>
        <button className="btn-gold" style={{ fontSize: 12, padding: '7px 18px' }}>Connect</button>
      </header>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 40px 80px' }}>

        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <p className="label" style={{ marginBottom: 10 }}>Security protocol</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 500, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              Dead Man's Switch
            </h1>
            <span className="tag" style={{ marginBottom: 4 }}>Active</span>
          </div>
          <p style={{ marginTop: 10, fontSize: 14, color: '#444', lineHeight: 1.7, maxWidth: 520 }}>
            An automated inheritance trigger that activates when you stop checking in. Your heirs receive access only when you're truly unreachable.
          </p>
        </div>

        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Check-in status */}
          <div className="card" style={{ padding: 32 }}>
            <p className="label">Next check-in</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 20 }}>
              <div className={pulse ? 'pulse-ring' : ''} style={{ borderRadius: '50%' }}>
                <CheckInRing daysLeft={daysLeft} total={interval} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 16 }}>
                  <div className="label">Last check-in</div>
                  <div className="value">{lastCheckin}</div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div className="label">Interval</div>
                  <div className="value">{interval} days</div>
                </div>
                <button
                  className="btn-gold"
                  onClick={handleCheckIn}
                  style={{ width: '100%' }}
                >
                  Check in now
                </button>
              </div>
            </div>

            {checkedIn && (
              <div style={{ marginTop: 20, padding: '10px 16px', background: '#eab30808', border: '0.5px solid #eab30822', borderRadius: 4, fontSize: 13, color: '#eab30888', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke="#eab308" strokeWidth="0.8"/><path d="M4 7l2 2 4-4" stroke="#eab308" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Check-in recorded. Timer reset to {interval} days.
              </div>
            )}
          </div>

          {/* State machine */}
          <div className="card" style={{ padding: 32 }}>
            <p className="label">Protocol states</p>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STATES.map((s, i) => {
                const active = i === 0
                const colors = ['#eab308', '#f5a623', '#e06030', '#cc3333']
                const bgs = ['#eab3080a', '#f5a6230a', '#e060300a', '#cc33330a']
                return (
                  <div
                    key={s.id}
                    className={active ? '' : 'state-inactive'}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 16px',
                      background: active ? bgs[i] : 'transparent',
                      border: `0.5px solid ${active ? colors[i] + '33' : '#1a1a1a'}`,
                      borderRadius: 5,
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[i], flexShrink: 0, boxShadow: active ? `0 0 8px ${colors[i]}66` : 'none' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: active ? colors[i] : '#444' }}>{s.label}</div>
                      <div style={{ fontSize: 11, color: active ? '#666' : '#333', marginTop: 1 }}>{s.sub}</div>
                    </div>
                    {active && <span style={{ fontSize: 10, color: colors[i], letterSpacing: '0.06em' }}>CURRENT</span>}
                    {i < 3 && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.2, marginLeft: 'auto' }}>
                        <path d="M5 3l4 4-4 4" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Second row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Configuration */}
          <div className="card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <p className="label" style={{ margin: 0 }}>Configuration</p>
              <button className="btn-outline" style={{ padding: '6px 16px', fontSize: 12 }} onClick={() => setShowConfig(true)}>
                Edit
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="card-inner" style={{ padding: '14px 16px' }}>
                <div className="label">Check-in interval</div>
                <div style={{ fontSize: 22, fontWeight: 500, color: '#eab308', fontFamily: "'Playfair Display', serif" }}>{interval}</div>
                <div style={{ fontSize: 11, color: '#444' }}>days</div>
              </div>
              <div className="card-inner" style={{ padding: '14px 16px' }}>
                <div className="label">Grace period</div>
                <div style={{ fontSize: 22, fontWeight: 500, color: '#eab308', fontFamily: "'Playfair Display', serif" }}>{grace}</div>
                <div style={{ fontSize: 11, color: '#444' }}>days</div>
              </div>
            </div>

            <hr className="divider" style={{ margin: '20px 0' }} />

            <div style={{ marginBottom: 16 }}>
              <div className="label">Notifications</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                {['Email', 'SMS', 'Push'].map(n => (
                  <span key={n} className="tag">{n}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="label">Total trigger window</div>
              <div className="value">{interval + grace} days from last check-in</div>
            </div>
          </div>

          {/* Trusted contacts */}
          <div className="card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <p className="label" style={{ margin: 0 }}>Trusted contacts</p>
              <button className="btn-outline" style={{ padding: '6px 16px', fontSize: 12 }} onClick={() => setShowAddContact(true)}>
                + Add
              </button>
            </div>

            {contacts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.2 }}>
                  <circle cx="14" cy="13" r="5" stroke="#fff" strokeWidth="1"/>
                  <circle cx="23" cy="13" r="5" stroke="#fff" strokeWidth="1"/>
                  <path d="M6 28c0-5 3.6-8 8-8M22 20c4.4 0 8 3 8 8" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <div style={{ fontSize: 13, color: '#333' }}>No contacts added yet</div>
                <div style={{ fontSize: 12, color: '#2a2a2a', marginTop: 4, lineHeight: 1.6 }}>Trusted contacts receive welfare<br/>check requests before inheritance triggers</div>
                <button className="btn-outline" style={{ marginTop: 16, fontSize: 12 }} onClick={() => setShowAddContact(true)}>
                  Add first contact
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {contacts.map((c, i) => (
                  <div key={i} className="card-inner" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#eab30822', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#eab308', fontWeight: 500 }}>
                        {c[0].toUpperCase()}
                      </div>
                      <span style={{ fontSize: 13, color: '#ccc' }}>{c}</span>
                    </div>
                    <button onClick={() => setContacts(contacts.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333', fontSize: 16, lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* How it works */}
        <div className="card" style={{ padding: 32 }}>
          <p className="label" style={{ marginBottom: 24 }}>How it works</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { n: '01', title: 'You check in', desc: 'Log in periodically within your configured interval to keep the switch inactive. Takes seconds.' },
              { n: '02', title: 'Warnings sent', desc: 'When your check-in is overdue, you receive escalating alerts via email, SMS, and push notification.' },
              { n: '03', title: 'Grace period', desc: `A ${grace}-day window opens for a final welfare check by your trusted contacts before anything happens.` },
              { n: '04', title: 'Inheritance begins', desc: 'If the grace period expires without contact, your heirs are notified and the vault transfer protocol initiates.' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {i < 3 && (
                  <div style={{ position: 'absolute', top: 13, left: 'calc(100% - 12px)', width: 24, height: 1, background: '#1e1e1e', zIndex: 1 }} />
                )}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#eab30822', lineHeight: 1, flexShrink: 0, fontWeight: 600 }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#ccc', marginBottom: 6, lineHeight: 1.3 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: '#444', lineHeight: 1.65 }}>{s.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '0.5px solid #0f0f0f', padding: '40px', background: '#030303' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: 5, background: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: 12, fontWeight: 600, color: '#000' }}>C</div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: '#eab308', letterSpacing: '0.06em' }}>CUSTOS</span>
            </div>
            <p style={{ fontSize: 12, color: '#2e2e2e', lineHeight: 1.8, maxWidth: 280 }}>Secure Bitcoin inheritance with multisig vaults and dead man's switches. Protect your digital assets for future generations.</p>
          </div>
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#333', marginBottom: 14 }}>Quick links</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Dashboard', 'Vault', 'Dead Man\'s Switch', 'Heirs'].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: '#2e2e2e', textDecoration: 'none', transition: 'color 0.15s' }} onMouseOver={e => (e.currentTarget.style.color = '#eab308')} onMouseOut={e => (e.currentTarget.style.color = '#2e2e2e')}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#333', marginBottom: 14 }}>Support</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Documentation', 'Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: '#2e2e2e', textDecoration: 'none', transition: 'color 0.15s' }} onMouseOver={e => (e.currentTarget.style.color = '#eab308')} onMouseOut={e => (e.currentTarget.style.color = '#2e2e2e')}>{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1080, margin: '32px auto 0', borderTop: '0.5px solid #0f0f0f', paddingTop: 24, fontSize: 11, color: '#222', letterSpacing: '0.04em' }}>
          © 2026 Custos. All rights reserved.
        </div>
      </footer>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="modal-overlay" onClick={() => setShowAddContact(false)}>
          <div className="card" style={{ width: 380, padding: 32 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 500, marginBottom: 6 }}>Add trusted contact</h3>
            <p style={{ fontSize: 12, color: '#444', lineHeight: 1.6, marginBottom: 24 }}>This person will be contacted for a welfare check before inheritance is triggered.</p>
            <div style={{ marginBottom: 12 }}>
              <label className="label">Name or email</label>
              <input
                className="input-field"
                placeholder="e.g. Jane Smith or jane@example.com"
                value={contactInput}
                onChange={e => setContactInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addContact()}
                autoFocus
              />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button className="btn-gold" style={{ flex: 1 }} onClick={addContact}>Add contact</button>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setShowAddContact(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Configure Modal */}
      {showConfig && (
        <div className="modal-overlay" onClick={() => setShowConfig(false)}>
          <div className="card" style={{ width: 420, padding: 32 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 500, marginBottom: 6 }}>Configure switch</h3>
            <p style={{ fontSize: 12, color: '#444', lineHeight: 1.6, marginBottom: 24 }}>Adjust your check-in schedule and grace period. Changes take effect immediately.</p>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Check-in interval</label>
              <select className="select-field" value={interval} onChange={e => setIntervalDays(Number(e.target.value))}>
                {[30, 60, 90, 120, 180, 365].map(d => (
                  <option key={d} value={d}>{d} days</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Grace period</label>
              <select className="select-field" value={grace} onChange={e => setGrace(Number(e.target.value))}>
                {[7, 14, 30, 60].map(d => (
                  <option key={d} value={d}>{d} days</option>
                ))}
              </select>
            </div>

            <div className="card-inner" style={{ padding: '12px 16px', marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: '#555' }}>
                Inheritance will trigger <span style={{ color: '#eab308' }}>{interval + grace} days</span> after your last check-in.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-gold" style={{ flex: 1 }} onClick={() => { setDaysLeft(interval); setShowConfig(false); }}>Save changes</button>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setShowConfig(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
