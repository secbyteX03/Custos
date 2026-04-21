'use client'

export default function AppFooter() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

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
    </>
  )
}
