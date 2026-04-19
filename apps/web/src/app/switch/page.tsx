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
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <h1 className="text-3xl sm:text-4xl font-medium text-gold-500 tracking-tight mb-8">Dead Man's Switch</h1>

        {/* Switch Status Card */}
        <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-gold-500 tracking-tight">Switch Status</h2>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${switchStatus?.state === 'ACTIVE'
                ? 'bg-green-900 text-green-300'
                : switchStatus?.state === 'TRIGGERED'
                  ? 'bg-red-900 text-red-300'
                  : 'bg-yellow-900 text-yellow-300'
              }`}>
              {switchStatus?.state || 'ACTIVE'}
            </span>
          </div>

          {/* State Machine Visualization */}
          <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950 mb-6">
            <h3 className="text-lg font-medium text-gold-500 tracking-tight mb-4">State Machine</h3>
            <div className="flex items-center justify-between overflow-x-auto">
              <div className={`flex flex-col items-center min-w-[100px] ${switchStatus?.state === 'ACTIVE' ? 'text-gold-500' : 'text-neutral-500'
                }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 text-sm font-medium ${switchStatus?.state === 'ACTIVE' ? 'bg-gold-500 text-black' : 'bg-neutral-900 text-neutral-500'
                  }`}>
                  ACTIVE
                </div>
                <span className="text-xs">Normal State</span>
              </div>

              <div className="text-neutral-600 mx-2">{'->'}</div>

              <div className={`flex flex-col items-center min-w-[100px] ${switchStatus?.state === 'PENDING_WARNING' ? 'text-gold-500' : 'text-neutral-500'
                }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 text-sm font-medium ${switchStatus?.state === 'PENDING_WARNING' ? 'bg-gold-500 text-black' : 'bg-neutral-900 text-neutral-500'
                  }`}>
                  WARNING
                </div>
                <span className="text-xs">Check-in Due</span>
              </div>

              <div className="text-neutral-600 mx-2">{'->'}</div>

              <div className={`flex flex-col items-center min-w-[100px] ${switchStatus?.state === 'GRACE_PERIOD' ? 'text-gold-500' : 'text-neutral-500'
                }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 text-sm font-medium ${switchStatus?.state === 'GRACE_PERIOD' ? 'bg-gold-500 text-black' : 'bg-neutral-900 text-neutral-500'
                  }`}>
                  GRACE
                </div>
                <span className="text-xs">30 Day Grace</span>
              </div>

              <div className="text-neutral-600 mx-2">{'->'}</div>

              <div className={`flex flex-col items-center min-w-[100px] ${switchStatus?.state === 'TRIGGERED' ? 'text-gold-500' : 'text-neutral-500'
                }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 text-sm font-medium ${switchStatus?.state === 'TRIGGERED' ? 'bg-gold-500 text-black' : 'bg-neutral-900 text-neutral-500'
                  }`}>
                  TRIGGERED
                </div>
                <span className="text-xs">Inheritance</span>
              </div>
            </div>
          </div>

          {/* Check-in Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
              <h3 className="text-lg font-medium text-gold-500 tracking-tight mb-4">Check-in Schedule</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Interval:</span>
                  <span className="text-white font-medium">90 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Grace Period:</span>
                  <span className="text-white font-medium">30 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Next Check-in:</span>
                  <span className="text-white font-medium">In 89 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Last Check-in:</span>
                  <span className="text-white font-medium">Just now</span>
                </div>
              </div>
            </div>

            <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
              <h3 className="text-lg font-medium text-gold-500 tracking-tight mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleCheckIn}
                  disabled={checkInLoading}
                  className="w-full bg-gold-500 text-black px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:bg-gold-400 transition-colors disabled:opacity-50"
                >
                  {checkInLoading ? 'Checking in...' : 'Check In Now'}
                </button>
                <button className="w-full border border-gold-500 text-gold-500 px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:bg-gold-500 hover:text-black transition-colors">
                  Configure Settings
                </button>
                <button className="w-full border border-gold-500 text-gold-500 px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:bg-gold-500 hover:text-black transition-colors">
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Card */}
        <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950 mb-8">
          <h2 className="text-2xl font-medium text-gold-500 tracking-tight mb-6">Switch Configuration</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Current Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-neutral-500 text-sm">Check-in Interval</label>
                  <div className="border border-neutral-800 rounded-lg px-4 py-2 text-white bg-neutral-950">
                    90 days
                  </div>
                </div>
                <div>
                  <label className="text-neutral-500 text-sm">Grace Period</label>
                  <div className="border border-neutral-800 rounded-lg px-4 py-2 text-white bg-neutral-950">
                    30 days
                  </div>
                </div>
                <div>
                  <label className="text-neutral-500 text-sm">Notification Methods</label>
                  <div className="border border-neutral-800 rounded-lg px-4 py-2 text-white bg-neutral-950">
                    Email, SMS, Push
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Trusted Contacts</h3>
              <div className="space-y-3">
                <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-950">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">No contacts configured</p>
                      <p className="text-neutral-500 text-sm">Add trusted contacts for welfare checks</p>
                    </div>
                    <button className="text-gold-500 hover:text-gold-400">
                      Add Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Card */}
        <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950">
          <h2 className="text-2xl font-medium text-gold-500 tracking-tight mb-6">How It Works</h2>
          <div className="space-y-4 text-neutral-500">
            <div className="flex items-start">
              <div className="text-gold-500 font-medium mr-3">1.</div>
              <div>
                <p className="text-white font-medium mb-1">Regular Check-ins</p>
                <p>You must check in within your configured interval (90 days) to keep the switch in ACTIVE state.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-gold-500 font-medium mr-3">2.</div>
              <div>
                <p className="text-white font-medium mb-1">Warning Period</p>
                <p>When check-in is due, you'll receive notifications through multiple channels.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-gold-500 font-medium mr-3">3.</div>
              <div>
                <p className="text-white font-medium mb-1">Grace Period</p>
                <p>If you miss check-in, a 30-day grace period begins for final verification.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-gold-500 font-medium mr-3">4.</div>
              <div>
                <p className="text-white font-medium mb-1">Inheritance Trigger</p>
                <p>If grace period expires, the inheritance protocol begins and heirs are notified.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
