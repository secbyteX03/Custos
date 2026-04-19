'use client'

import { useState, useEffect } from 'react'

export default function DeadManSwitch() {
  const [switchStatus, setSwitchStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [checkInLoading, setCheckInLoading] = useState(false)

  useEffect(() => {
    fetchSwitchStatus()
  }, [])

  const fetchSwitchStatus = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/switch/status')
      const data = await response.json()
      setSwitchStatus(data)
    } catch (error) {
      console.error('Error fetching switch status:', error)
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
      alert('Check-in successful! Next check-in due in 90 days.')
      fetchSwitchStatus()
    } catch (error) {
      console.error('Error checking in:', error)
      alert('Check-in failed. Please try again.')
    } finally {
      setCheckInLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold-500 text-xl">Loading switch status...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gold-500 mb-8">Dead Man's Switch</h1>
        
        {/* Switch Status Card */}
        <div className="bg-black-800 border border-gold-500 p-8 rounded-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gold-400">Switch Status</h2>
            <span className={`px-4 py-2 rounded-full font-semibold ${
              switchStatus?.state === 'ACTIVE' 
                ? 'bg-green-900 text-green-300' 
                : switchStatus?.state === 'TRIGGERED'
                ? 'bg-red-900 text-red-300'
                : 'bg-yellow-900 text-yellow-300'
            }`}>
              {switchStatus?.state || 'ACTIVE'}
            </span>
          </div>

          {/* State Machine Visualization */}
          <div className="bg-black-900 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gold-400 mb-4">State Machine</h3>
            <div className="flex items-center justify-between overflow-x-auto">
              <div className={`flex flex-col items-center min-w-[100px] ${
                switchStatus?.state === 'ACTIVE' ? 'text-gold-400' : 'text-white-600'
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  switchStatus?.state === 'ACTIVE' ? 'bg-gold-500 text-black' : 'bg-black-700'
                }`}>
                  ACTIVE
                </div>
                <span className="text-xs">Normal State</span>
              </div>
              
              <div className="text-white-400">{'->'}</div>
              
              <div className={`flex flex-col items-center min-w-[100px] ${
                switchStatus?.state === 'PENDING_WARNING' ? 'text-gold-400' : 'text-white-600'
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  switchStatus?.state === 'PENDING_WARNING' ? 'bg-gold-500 text-black' : 'bg-black-700'
                }`}>
                  WARNING
                </div>
                <span className="text-xs">Check-in Due</span>
              </div>
              
              <div className="text-white-400">{'->'}</div>
              
              <div className={`flex flex-col items-center min-w-[100px] ${
                switchStatus?.state === 'GRACE_PERIOD' ? 'text-gold-400' : 'text-white-600'
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  switchStatus?.state === 'GRACE_PERIOD' ? 'bg-gold-500 text-black' : 'bg-black-700'
                }`}>
                  GRACE
                </div>
                <span className="text-xs">30 Day Grace</span>
              </div>
              
              <div className="text-white-400">{'->'}</div>
              
              <div className={`flex flex-col items-center min-w-[100px] ${
                switchStatus?.state === 'TRIGGERED' ? 'text-gold-400' : 'text-white-600'
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  switchStatus?.state === 'TRIGGERED' ? 'bg-gold-500 text-black' : 'bg-black-700'
                }`}>
                  TRIGGERED
                </div>
                <span className="text-xs">Inheritance</span>
              </div>
            </div>
          </div>

          {/* Check-in Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gold-400 mb-4">Check-in Schedule</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white-600">Interval:</span>
                  <span className="text-white font-semibold">90 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white-600">Grace Period:</span>
                  <span className="text-white font-semibold">30 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white-600">Next Check-in:</span>
                  <span className="text-white font-semibold">In 89 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white-600">Last Check-in:</span>
                  <span className="text-white font-semibold">Just now</span>
                </div>
              </div>
            </div>

            <div className="bg-black-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gold-400 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleCheckIn}
                  disabled={checkInLoading}
                  className="w-full bg-gold-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all disabled:opacity-50"
                >
                  {checkInLoading ? 'Checking in...' : 'Check In Now'}
                </button>
                <button className="w-full border border-gold-500 text-gold-500 px-6 py-3 rounded-lg font-semibold hover:bg-gold-500 hover:text-black transition-all">
                  Configure Settings
                </button>
                <button className="w-full border border-gold-500 text-gold-500 px-6 py-3 rounded-lg font-semibold hover:bg-gold-500 hover:text-black transition-all">
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Card */}
        <div className="bg-black-800 border border-gold-500 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gold-400 mb-6">Switch Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Current Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white-600 text-sm">Check-in Interval</label>
                  <div className="bg-black-900 border border-black-600 rounded-lg px-4 py-2 text-white">
                    90 days
                  </div>
                </div>
                <div>
                  <label className="text-white-600 text-sm">Grace Period</label>
                  <div className="bg-black-900 border border-black-600 rounded-lg px-4 py-2 text-white">
                    30 days
                  </div>
                </div>
                <div>
                  <label className="text-white-600 text-sm">Notification Methods</label>
                  <div className="bg-black-900 border border-black-600 rounded-lg px-4 py-2 text-white">
                    Email, SMS, Push
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Trusted Contacts</h3>
              <div className="space-y-3">
                <div className="bg-black-900 border border-black-600 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">No contacts configured</p>
                      <p className="text-white-600 text-sm">Add trusted contacts for welfare checks</p>
                    </div>
                    <button className="text-gold-400 hover:text-gold-300">
                      Add Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Card */}
        <div className="bg-black-800 border border-gold-500 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gold-400 mb-6">How It Works</h2>
          <div className="space-y-4 text-white-600">
            <div className="flex items-start">
              <div className="text-gold-400 font-bold mr-3">1.</div>
              <div>
                <p className="text-white font-semibold mb-1">Regular Check-ins</p>
                <p>You must check in within your configured interval (90 days) to keep the switch in ACTIVE state.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-gold-400 font-bold mr-3">2.</div>
              <div>
                <p className="text-white font-semibold mb-1">Warning Period</p>
                <p>When check-in is due, you'll receive notifications through multiple channels.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-gold-400 font-bold mr-3">3.</div>
              <div>
                <p className="text-white font-semibold mb-1">Grace Period</p>
                <p>If you miss check-in, a 30-day grace period begins for final verification.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-gold-400 font-bold mr-3">4.</div>
              <div>
                <p className="text-white font-semibold mb-1">Inheritance Trigger</p>
                <p>If grace period expires, the inheritance protocol begins and heirs are notified.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
