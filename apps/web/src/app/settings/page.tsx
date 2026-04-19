'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    checkInReminders: true,
    heirNotifications: true
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    biometricAuth: true,
    sessionTimeout: '30'
  })

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    currency: 'BTC',
    checkInFrequency: 'weekly'
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  const handleSecurityChange = (key: string, value: any) => {
    setSecurity(prev => ({ ...prev, [key]: value }))
  }

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Save settings to backend
    console.log('Saving settings:', { notifications, security, preferences })
    alert('Settings saved successfully!')
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-20">
        <h1 className="text-3xl sm:text-4xl font-medium text-yellow-500 tracking-tight mb-8">Settings</h1>

        {/* Navigation Tabs */}
        <div className="flex space-x-8 mb-8 border-b border-neutral-800">
          <button 
            onClick={() => setActiveTab('general')}
            className={`pb-3 border-b-2 font-medium transition-colors ${
              activeTab === 'general' 
                ? 'border-yellow-500 text-yellow-500' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            General
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`pb-3 font-medium transition-colors ${
              activeTab === 'security' 
                ? 'border-yellow-500 text-yellow-500' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Security
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`pb-3 font-medium transition-colors ${
              activeTab === 'notifications' 
                ? 'border-yellow-500 text-yellow-500' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Notifications
          </button>
          <button 
            onClick={() => setActiveTab('account')}
            className={`pb-3 font-medium transition-colors ${
              activeTab === 'account' 
                ? 'border-yellow-500 text-yellow-500' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Account
          </button>
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-8">
            <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950">
              <h2 className="text-xl font-medium text-yellow-500 tracking-tight mb-6">General Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Theme
                  </label>
                  <select
                    value={preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Default Currency
                  </label>
                  <select
                    value={preferences.currency}
                    onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Check-in Frequency
                  </label>
                  <select
                    value={preferences.checkInFrequency}
                    onChange={(e) => handlePreferenceChange('checkInFrequency', e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-8">
            <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950">
              <h2 className="text-xl font-medium text-yellow-500 tracking-tight mb-6">Security</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                    <p className="text-neutral-500 text-sm">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => handleSecurityChange('twoFactorAuth', !security.twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      security.twoFactorAuth ? 'bg-yellow-500' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Biometric Authentication</h3>
                    <p className="text-neutral-500 text-sm">Use fingerprint or face recognition</p>
                  </div>
                  <button
                    onClick={() => handleSecurityChange('biometricAuth', !security.biometricAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      security.biometricAuth ? 'bg-yellow-500' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        security.biometricAuth ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-8">
            <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950">
              <h2 className="text-xl font-medium text-yellow-500 tracking-tight mb-6">Notifications</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Email Notifications</h3>
                    <p className="text-neutral-500 text-sm">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('email', !notifications.email)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.email ? 'bg-yellow-500' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">SMS Notifications</h3>
                    <p className="text-neutral-500 text-sm">Receive critical alerts via SMS</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('sms', !notifications.sms)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.sms ? 'bg-yellow-500' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Push Notifications</h3>
                    <p className="text-neutral-500 text-sm">Receive browser push notifications</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('push', !notifications.push)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.push ? 'bg-yellow-500' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.push ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Check-in Reminders</h3>
                    <p className="text-neutral-500 text-sm">Remind me to check in for Dead Man's Switch</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('checkInReminders', !notifications.checkInReminders)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.checkInReminders ? 'bg-yellow-500' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.checkInReminders ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Heir Notifications</h3>
                    <p className="text-neutral-500 text-sm">Notify me when heirs take actions</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('heirNotifications', !notifications.heirNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.heirNotifications ? 'bg-yellow-500' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.heirNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Settings */}
        {activeTab === 'account' && (
          <div className="space-y-8">
            <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950">
              <h2 className="text-xl font-medium text-yellow-500 tracking-tight mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:border-yellow-500 focus:outline-none"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue="custos_user"
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:border-yellow-500 focus:outline-none"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Account Created
                  </label>
                  <input
                    type="text"
                    defaultValue="January 15, 2024"
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:border-yellow-500 focus:outline-none"
                    readOnly
                  />
                </div>

                <div className="pt-4 border-t border-neutral-700">
                  <button className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end space-x-4 mt-8">
          <button className="px-6 py-2 border border-neutral-700 text-neutral-300 rounded-md hover:bg-neutral-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
