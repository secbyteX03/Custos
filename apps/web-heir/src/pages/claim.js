/**
 * Heir Claim Portal — /claim?token=<claimToken>
 *
 * This page is the entry point for the heir after the Dead Man's Switch fires.
 * It is a completely separate Next.js app with its own domain (claim.legacyguard.app).
 * Minimal attack surface — only heir claim functionality lives here.
 */
import { useState } from 'react';
import axios from 'axios';

export default function ClaimPage({ token }) {
  const [step, setStep] = useState('wallet'); // wallet | kyc | pending | complete
  const [walletAddress, setWalletAddress] = useState('');
  const [kycUrl, setKycUrl] = useState('');
  const [txid, setTxid] = useState('');
  const [error, setError] = useState('');

  async function submitWallet() {
    try {
      const { data } = await axios.post('/api/heir/claim/initiate', {
        claimToken: token,
        newWalletAddress: walletAddress,
      });
      setKycUrl(data.kycSessionUrl);
      setStep('kyc');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  }

  if (step === 'wallet') return (
    <main style={{ maxWidth: 480, margin: '80px auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Claim your inheritance</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>
        You have been designated as a beneficiary. Enter your Bitcoin wallet address
        to receive the funds after identity verification.
      </p>
      <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
        Your Bitcoin wallet address
      </label>
      <input
        style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
        placeholder="bc1q..."
        value={walletAddress}
        onChange={e => setWalletAddress(e.target.value)}
      />
      {error && <p style={{ color: '#E24B4A', marginTop: 8 }}>{error}</p>}
      <button
        onClick={submitWallet}
        style={{ marginTop: 16, width: '100%', padding: 14, background: '#1D9E75', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}
      >
        Continue to Verification
      </button>
    </main>
  );

  if (step === 'kyc') return (
    <main style={{ maxWidth: 480, margin: '80px auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Identity Verification</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        We need to verify your identity before releasing the funds.
        This protects the estate from fraudulent claims.
      </p>
      <a
        href={kycUrl}
        style={{ display: 'block', padding: 14, background: '#534AB7', color: '#fff', borderRadius: 8, textAlign: 'center', textDecoration: 'none', fontSize: 16 }}
      >
        Start Identity Verification
      </a>
    </main>
  );

  return <main style={{ maxWidth: 480, margin: '80px auto', padding: 24 }}>
    <h1>Transfer complete</h1>
    <p>TXID: <code>{txid}</code></p>
  </main>;
}

export async function getServerSideProps({ query }) {
  return { props: { token: query.token || '' } };
}
