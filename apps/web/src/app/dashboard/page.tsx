'use client'

import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [vaultStatus, setVaultStatus] = useState(null)
  const [switchStatus, setSwitchStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const [vaultResponse, switchResponse] = await Promise.all([
          fetch('http://localhost:4001/api/vault/status'),
          fetch('http://localhost:4001/api/switch/status')
        ])

        const vaultData = await vaultResponse.json()
        const switchData = await switchResponse.json()

        setVaultStatus(vaultData)
        setSwitchStatus(switchData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500 text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <h1 className="text-3xl sm:text-4xl font-medium text-yellow-500 tracking-tight mb-8">Dashboard</h1>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
            <h3 className="text-sm font-medium text-yellow-500 mb-2">Vault Status</h3>
            <p className="text-2xl font-medium text-white">{vaultStatus?.status || 'ACTIVE'}</p>
            <p className="text-sm text-neutral-500 mt-1">2-of-3 Multisig</p>
          </div>

          <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
            <h3 className="text-sm font-medium text-yellow-500 mb-2">Dead Man's Switch</h3>
            <p className="text-2xl font-medium text-white">{switchStatus?.state || 'ACTIVE'}</p>
            <p className="text-sm text-neutral-500 mt-1">Next check-in: 90 days</p>
          </div>

          <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
            <h3 className="text-sm font-medium text-yellow-500 mb-2">Bitcoin Balance</h3>
            <p className="text-2xl font-medium text-white">0.000 BTC</p>
            <p className="text-sm text-neutral-500 mt-1">$0.00 USD</p>
          </div>

          <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
            <h3 className="text-sm font-medium text-yellow-500 mb-2">Heirs Configured</h3>
            <p className="text-2xl font-medium text-white">0</p>
            <p className="text-sm text-neutral-500 mt-1">Add heirs for inheritance</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950 mb-12">
          <h2 className="text-2xl font-medium text-yellow-500 tracking-tight mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:bg-yellow-400 transition-colors">
              Check In Now
            </button>
            <button className="border border-yellow-500 text-yellow-500 px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:bg-yellow-500 hover:text-black transition-colors">
              Add Heir
            </button>
            <button className="border border-yellow-500 text-yellow-500 px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:bg-yellow-500 hover:text-black transition-colors">
              View Transactions
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950">
          <h2 className="text-2xl font-medium text-yellow-500 tracking-tight mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-neutral-800">
              <div>
                <p className="text-white font-medium">System Initialized</p>
                <p className="text-neutral-500 text-sm">Your Custos vault has been set up</p>
              </div>
              <span className="text-yellow-500 text-sm">Just now</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-white font-medium">Welcome to Custos</p>
                <p className="text-neutral-500 text-sm">Your Bitcoin inheritance platform is ready</p>
              </div>
              <span className="text-yellow-500 text-sm">1 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
