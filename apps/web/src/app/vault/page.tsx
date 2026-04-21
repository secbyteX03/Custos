'use client'

import { useState, useEffect } from 'react'
import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'

export default function Vault() {
  const [vaultStatus, setVaultStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showSetup, setShowSetup] = useState(false)

  useEffect(() => {
    fetchVaultStatus()
  }, [])

  const fetchVaultStatus = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/vault/status')
      const data = await response.json()
      setVaultStatus(data)
    } catch (error) {
      console.error('Error fetching vault status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckIn = async () => {
    setCheckInLoading(true)
    try {
      const response = await fetch('http://localhost:4001/api/switch/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ biometricToken: 'mock-biometric-token' })
      })
      const data = await response.json()
      alert('Check-in successful!')
      fetchVaultStatus()
    } catch (error) {
      console.error('Error checking in:', error)
      alert('Check-in failed. Please try again.')
    } finally {
      setCheckInLoading(false)
    }
  }

  const handleViewVaultAddress = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/vault/address', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      if (data.address) {
        alert(`Vault Address: ${data.address}\n\nUse this address to fund your vault with regtest BTC from Polar.`)
      } else {
        alert('Vault address not available. Please ensure vault is properly configured.')
      }
    } catch (error) {
      console.error('Error fetching vault address:', error)
      alert('Failed to fetch vault address. Please ensure Polar is running and connected.')
    }
  }

  if (loading) {
    return (
      <div style={{ background: '#030303', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#eab308', fontSize: '20px' }}>Loading vault...</div>
      </div>
    )
  }

  return (
    <div style={{ background: '#030303', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #eab30833; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #2a2a2a; }
        .btn-gold { background: #eab308; color: #000; border: none; padding: 10px 24px; font-size: 13px; font-weight: 500; border-radius: 4px; cursor: pointer; letter-spacing: 0.04em; font-family: inherit; transition: background 0.15s, transform 0.1s; }
        .btn-gold:hover { background: #f59e0b; }
        .btn-gold:active { transform: scale(0.98); }
        .btn-outline { background: transparent; color: #eab308; border: 1px solid #eab30833; padding: 10px 24px; font-size: 13px; font-weight: 400; border-radius: 4px; cursor: pointer; letter-spacing: 0.04em; font-family: inherit; transition: all 0.15s; }
        .btn-outline:hover { border-color: #eab308; background: #eab3080a; }
        .card { background: '#0a0a0a'; border: '0.5px solid #1a1a1a'; border-radius: 8px; }
      `}</style>

      <AppHeader activePath="/vault" />

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 40px 80px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: '500', color: '#fff', letterSpacing: '-0.01em', lineHeight: '1.1', marginBottom: '40px' }}>
          Vault Management
        </h1>

        {/* Vault Overview */}
        <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-yellow-500 tracking-tight">2-of-3 Multisig Vault</h2>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${vaultStatus?.status === 'ACTIVE'
              ? 'bg-green-900 text-green-300'
              : 'bg-yellow-900 text-yellow-300'
              }`}>
              {vaultStatus?.status || 'ACTIVE'}
            </span>
          </div>

          {/* Keys Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-medium text-white">Hardware Wallet</h3>
              </div>
              <p className="text-neutral-500 text-sm mb-2">Your personal hardware wallet key</p>
              <p className="text-yellow-500 text-sm font-medium">Configured</p>
            </div>

            <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-medium text-white">Web App Key</h3>
              </div>
              <p className="text-neutral-500 text-sm mb-2">Browser-based biometric key</p>
              <p className="text-yellow-500 text-sm font-medium">Configured</p>
            </div>

            <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-medium text-white">Custos HSM</h3>
              </div>
              <p className="text-neutral-500 text-sm mb-2">Secure hardware security module</p>
              <p className="text-yellow-500 text-sm font-medium">Secured</p>
            </div>
          </div>

          <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-950">
            <p className="text-neutral-500 text-sm">
              <span className="text-yellow-500 font-medium">Security Note:</span>
              Any 2 of 3 keys can spend funds. The Custos HSM key is only released during inheritance trigger after KYC verification.
            </p>
          </div>
        </div>

        {/* Vault Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950">
            <h3 className="text-xl font-medium text-yellow-500 tracking-tight mb-4">Vault Actions</h3>
            <div className="space-y-4">
              <button
                onClick={handleCheckIn}
                className="w-full bg-yellow-500 text-black px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:bg-yellow-400 transition-colors"
              >
                Perform Check-in
              </button>
              <button
                onClick={handleViewVaultAddress}
                className="w-full border border-yellow-500 text-yellow-500 px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:bg-yellow-500 hover:text-black transition-colors"
              >
                View Vault Address
              </button>
              <button className="w-full border border-yellow-500 text-yellow-500 px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:bg-yellow-500 hover:text-black transition-colors">
                Export Public Keys
              </button>
            </div>
          </div>

          <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950">
            <h3 className="text-xl font-medium text-yellow-500 tracking-tight mb-4">Vault Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Balance:</span>
                <span className="text-white font-medium">0.000000 BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">USD Value:</span>
                <span className="text-white font-medium">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Transactions:</span>
                <span className="text-white font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Created:</span>
                <span className="text-white font-medium">Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950 mt-8">
          <h3 className="text-xl font-medium text-gold-500 tracking-tight mb-6">Transaction History</h3>
          <div className="text-center py-8">
            <p className="text-neutral-500">No transactions yet</p>
            <p className="text-neutral-500 text-sm mt-2">Your vault transaction history will appear here</p>
          </div>
        </div>
    </div>
    </div >
  )
}
