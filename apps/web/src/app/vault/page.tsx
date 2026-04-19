'use client'

import { useState, useEffect } from 'react'

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
    try {
      const response = await fetch('http://localhost:4001/api/switch/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ biometricToken: 'mock-token' })
      })
      const data = await response.json()
      alert('Check-in successful!')
      fetchVaultStatus()
    } catch (error) {
      console.error('Error checking in:', error)
      alert('Check-in failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold-500 text-xl">Loading vault...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gold-500 mb-8">Vault Management</h1>

        {/* Vault Overview */}
        <div className="bg-black-800 border border-gold-500 p-8 rounded-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gold-400">2-of-3 Multisig Vault</h2>
            <span className={`px-4 py-2 rounded-full font-semibold ${vaultStatus?.status === 'ACTIVE'
              ? 'bg-green-900 text-green-300'
              : 'bg-yellow-900 text-yellow-300'
              }`}>
              {vaultStatus?.status || 'ACTIVE'}
            </span>
          </div>

          {/* Keys Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black-900 p-6 rounded-lg border border-black-600">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-white">Hardware Wallet</h3>
              </div>
              <p className="text-gray-400 text-sm mb-2">Your personal hardware wallet key</p>
              <p className="text-gold-400 text-sm font-semibold">Configured</p>
            </div>

            <div className="bg-black-900 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-white">Web App Key</h3>
              </div>
              <p className="text-gray-400 text-sm mb-2">Browser-based biometric key</p>
              <p className="text-gold-400 text-sm font-semibold">Configured</p>
            </div>

            <div className="bg-black-900 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-gold-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-white">Custos HSM</h3>
              </div>
              <p className="text-gray-400 text-sm mb-2">Secure hardware security module</p>
              <p className="text-gold-400 text-sm font-semibold">Secured</p>
            </div>
          </div>

          <div className="bg-black-900 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">
              <span className="text-gold-400 font-semibold">Security Note:</span>
              Any 2 of 3 keys can spend funds. The Custos HSM key is only released during inheritance trigger after KYC verification.
            </p>
          </div>
        </div>

        {/* Vault Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black-800 border border-gold-500 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-gold-400 mb-4">Vault Actions</h3>
            <div className="space-y-4">
              <button
                onClick={handleCheckIn}
                className="w-full bg-gold-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all"
              >
                Perform Check-in
              </button>
              <button className="w-full border border-gold-500 text-gold-500 px-6 py-3 rounded-lg font-semibold hover:bg-gold-500 hover:text-black transition-all">
                View Vault Address
              </button>
              <button className="w-full border border-gold-500 text-gold-500 px-6 py-3 rounded-lg font-semibold hover:bg-gold-500 hover:text-black transition-all">
                Export Public Keys
              </button>
            </div>
          </div>

          <div className="bg-black-800 border border-gold-500 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-gold-400 mb-4">Vault Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Balance:</span>
                <span className="text-white font-semibold">0.000000 BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">USD Value:</span>
                <span className="text-white font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transactions:</span>
                <span className="text-white font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Created:</span>
                <span className="text-white font-semibold">Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-black-800 border border-gold-500 p-8 rounded-lg mt-8">
          <h3 className="text-xl font-bold text-gold-400 mb-6">Transaction History</h3>
          <div className="text-center py-8">
            <p className="text-gray-400">No transactions yet</p>
            <p className="text-gray-400 text-sm mt-2">Your vault transaction history will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
