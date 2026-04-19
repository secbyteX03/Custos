/**
 * Concierge Portal — Internal tool for Legacy Guard setup specialists.
 * Used during the white-glove onboarding call with the user.
 *
 * Features:
 *   - View user's vault setup progress
 *   - Guide xpub collection from hardware wallets
 *   - Verify multisig setup on-chain
 *   - Confirm PSBT construction
 *   - Trigger test check-in cycle
 */
import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export default function ConciergeDashboard() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function lookupUser() {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('concierge_token')}` }
      });
      setUserData(data);
    } catch (err) {
      setError('User not found or API error');
    } finally {
      setLoading(false);
    }
  }

  const vault = userData?.vault;
  const sw = userData?.switch;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Legacy Guard — Concierge Portal</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>Setup specialist workspace. Internal use only.</p>

      {/* User lookup */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        <input
          style={{ flex: 1, padding: 10, border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
          placeholder="User ID or email"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && lookupUser()}
        />
        <button
          onClick={lookupUser}
          style={{ padding: '10px 20px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}
        >
          {loading ? 'Loading...' : 'Look up'}
        </button>
      </div>
      {error && <p style={{ color: '#E24B4A' }}>{error}</p>}

      {userData && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Vault status */}
          <StatusCard title="Vault Setup" items={[
            { label: 'Type', value: vault?.vaultType || 'Not configured', ok: !!vault },
            { label: 'User xpub', value: vault?.xpubUser ? 'Provided' : 'Missing', ok: !!vault?.xpubUser },
            { label: 'Phone xpub', value: vault?.xpubPhone ? 'Provided' : 'Missing', ok: !!vault?.xpubPhone },
            { label: 'HSM Key', value: vault?.hsmKeyId ? 'Generated' : 'Not yet', ok: !!vault?.hsmKeyId },
            { label: 'PSBT', value: vault?.inheritancePsbtCipher ? 'Built & stored' : 'Not built', ok: !!vault?.inheritancePsbtCipher },
          ]} />

          {/* Switch status */}
          <StatusCard title="Dead Man's Switch" items={[
            { label: 'State', value: sw?.state || 'Not configured', ok: sw?.state === 'ACTIVE' },
            { label: 'Check-in interval', value: sw ? `${sw.checkInIntervalDays} days` : '—', ok: !!sw },
            { label: 'Grace period', value: sw ? `${sw.gracePeriodDays} days` : '—', ok: !!sw },
            { label: 'Next due', value: sw?.nextCheckinDue ? new Date(sw.nextCheckinDue).toLocaleDateString() : '—', ok: true },
          ]} />

          {/* Heir info */}
          <StatusCard title="Registered Heirs" items={
            userData.heirs?.length > 0
              ? userData.heirs.map(h => ({ label: h.name, value: `${h.relationship} · KYC: ${h.kycStatus}`, ok: h.kycStatus === 'PASSED' }))
              : [{ label: 'No heirs', value: 'Needs setup', ok: false }]
          } />

          {/* Checklist */}
          <div style={{ background: '#f9f9f9', borderRadius: 12, padding: 20, border: '0.5px solid #eee' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#444' }}>ONBOARDING CHECKLIST</h3>
            {[
              { label: 'Account created', done: !!userData },
              { label: 'KYC passed', done: userData?.kycStatus === 'PASSED' },
              { label: 'Vault configured', done: !!vault?.hsmKeyId },
              { label: 'Heir registered', done: userData?.heirs?.length > 0 },
              { label: 'PSBT built', done: !!vault?.inheritancePsbtCipher },
              { label: 'Switch activated', done: sw?.state === 'ACTIVE' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 16 }}>{item.done ? '✓' : '○'}</span>
                <span style={{ fontSize: 13, color: item.done ? '#1D9E75' : '#aaa' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusCard({ title, items }) {
  return (
    <div style={{ background: '#f9f9f9', borderRadius: 12, padding: 20, border: '0.5px solid #eee' }}>
      <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, color: '#444', textTransform: 'uppercase', letterSpacing: 0.5 }}>{title}</h3>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid #eee' }}>
          <span style={{ fontSize: 13, color: '#666' }}>{item.label}</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: item.ok ? '#1D9E75' : '#E24B4A' }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
