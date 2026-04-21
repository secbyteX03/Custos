'use client'

import { useState } from 'react'
import Link from 'next/link'
import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'

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
    <div style={{ background: '#030303', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #eab30833; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #2a2a2a; }
        .tab-button { color: #444; font-size: 13px; font-weight: 400; text-decoration: none; letter-spacing: 0.02em; transition: color 0.15s; padding: 6px 0; }
        .tab-button:hover, .tab-button.active { color: #eab308; }
        .tab-button.active { border-bottom: 1px solid #eab308; }
        .btn-gold { background: #eab308; color: #000; border: none; padding: 10px 24px; font-size: 13px; font-weight: 500; border-radius: 4px; cursor: pointer; letter-spacing: 0.04em; font-family: inherit; transition: background 0.15s, transform 0.1s; }
        .btn-gold:hover { background: #f59e0b; }
        .btn-gold:active { transform: scale(0.98); }
        .card { background: '#0a0a0a'; border: '0.5px solid #1a1a1a'; border-radius: 8px; }
        .input-field { background: '#080808'; border: '0.5px solid #2a2a2a'; border-radius: 4px; color: '#fff'; font-family: inherit; font-size: 13px; padding: 9px 14px; outline: none; width: 100%; transition: border-color 0.15s; }
        .input-field:focus { border-color: #eab30855; }
        .toggle-btn { position: relative; display: inline-flex; height: 24px; width: 44px; align-items: center; border-radius: 12px; transition: background-color 0.2s; }
        .toggle-btn.active { background: #eab308; }
        .toggle-btn:not(.active) { background: #2a2a2a; }
        .toggle-thumb { position: absolute; display: inline-block; height: 16px; width: 16px; border-radius: 50%; background: white; transition: transform 0.2s; }
        .toggle-btn.active .toggle-thumb { transform: translateX(20px); }
        .toggle-btn:not(.active) .toggle-thumb { transform: translateX(4px); }
      `}</style>

      <AppHeader activePath="/settings" />

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 40px 80px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: '500', color: '#fff', letterSpacing: '-0.01em', lineHeight: '1.1', marginBottom: '40px' }}>
          Settings
        </h1>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', borderBottom: '0.5px solid #141414' }}>
          <button
            onClick={() => setActiveTab('general')}
            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
          >
            Account
          </button>
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '500', color: '#eab308', marginBottom: '24px' }}>
                General Preferences
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: '8px' }}>
                    Theme
                  </label>
                  <select
                    value={preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    className="input-field"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: '8px' }}>
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: '8px' }}>
                    Default Currency
                  </label>
                  <select
                    value={preferences.currency}
                    onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                    className="input-field"
                  >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: '8px' }}>
                    Check-in Frequency
                  </label>
                  <select
                    value={preferences.checkInFrequency}
                    onChange={(e) => handlePreferenceChange('checkInFrequency', e.target.value)}
                    className="input-field"
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '500', color: '#eab308', marginBottom: '24px' }}>
                Security
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: '500', fontSize: '14px' }}>Two-Factor Authentication</h3>
                    <p style={{ color: '#444', fontSize: '12px', marginTop: '4px' }}>Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => handleSecurityChange('twoFactorAuth', !security.twoFactorAuth)}
                    className={`toggle-btn ${security.twoFactorAuth ? 'active' : ''}`}
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: '500', fontSize: '14px' }}>Biometric Authentication</h3>
                    <p style={{ color: '#444', fontSize: '12px', marginTop: '4px' }}>Use fingerprint or face recognition</p>
                  </div>
                  <button
                    onClick={() => handleSecurityChange('biometricAuth', !security.biometricAuth)}
                    className={`toggle-btn ${security.biometricAuth ? 'active' : ''}`}
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: '8px' }}>
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                    className="input-field"
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '500', color: '#eab308', marginBottom: '24px' }}>
                Notifications
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: '500', fontSize: '14px' }}>Email Notifications</h3>
                    <p style={{ color: '#444', fontSize: '12px', marginTop: '4px' }}>Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('email', !notifications.email)}
                    className={`toggle-btn ${notifications.email ? 'active' : ''}`}
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: '500', fontSize: '14px' }}>SMS Notifications</h3>
                    <p style={{ color: '#444', fontSize: '12px', marginTop: '4px' }}>Receive critical alerts via SMS</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('sms', !notifications.sms)}
                    className={`toggle-btn ${notifications.sms ? 'active' : ''}`}
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: '500', fontSize: '14px' }}>Push Notifications</h3>
                    <p style={{ color: '#444', fontSize: '12px', marginTop: '4px' }}>Receive browser push notifications</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('push', !notifications.push)}
                    className={`toggle-btn ${notifications.push ? 'active' : ''}`}
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: '500', fontSize: '14px' }}>Check-in Reminders</h3>
                    <p style={{ color: '#444', fontSize: '12px', marginTop: '4px' }}>Remind me to check in for Dead Man's Switch</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('checkInReminders', !notifications.checkInReminders)}
                    className={`toggle-btn ${notifications.checkInReminders ? 'active' : ''}`}
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: '500', fontSize: '14px' }}>Heir Notifications</h3>
                    <p style={{ color: '#444', fontSize: '12px', marginTop: '4px' }}>Notify me when heirs take actions</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('heirNotifications', !notifications.heirNotifications)}
                    className={`toggle-btn ${notifications.heirNotifications ? 'active' : ''}`}
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Settings */}
        {activeTab === 'account' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '500', color: '#eab308', marginBottom: '24px' }}>
                Account Settings
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: '8px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="input-field"
                    readOnly
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: '8px' }}>
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue="custos_user"
                    className="input-field"
                    readOnly
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: '8px' }}>
                    Account Created
                  </label>
                  <input
                    type="text"
                    defaultValue="January 15, 2024"
                    className="input-field"
                    readOnly
                  />
                </div>

                <div style={{ paddingTop: '16px', borderTop: '0.5px solid #141414' }}>
                  <button style={{ color: '#ef4444', fontSize: '13px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'color 0.15s' }}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '32px' }}>
          <button style={{ padding: '12px 24px', border: '1px solid #1a1a1a', color: '#444', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px', transition: 'background 0.15s' }}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-gold"
          >
            Save Changes
          </button>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
