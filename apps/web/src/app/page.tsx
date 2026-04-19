'use client'

import Link from 'next/link'
import { useState } from 'react'
import WalletConnectModal from '../components/WalletConnectModal'
import SuccessMessage from '../components/SuccessMessage'
import { WalletInfo } from '../utils/walletConnect'

export default function Home() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<WalletInfo | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleWalletConnect = (wallet: WalletInfo) => {
    setConnectedWallet(wallet)
    setSuccessMessage(`Successfully connected to ${wallet.name} wallet!`)
    setShowSuccessMessage(true)
  }

  const handleConnectButtonClick = () => {
    if (connectedWallet) {
      // If already connected, go to dashboard
      window.location.href = '/dashboard'
    } else {
      // Open wallet connection modal
      setIsWalletModalOpen(true)
    }
  }
  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* Hero */}
      <section className="border-b border-neutral-900 px-6 sm:px-10 py-20 sm:py-28 text-center">
        <span className="inline-block bg-yellow-500 text-black text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
          Bitcoin Inheritance Platform
        </span>
        <h1 className="text-5xl sm:text-7xl font-medium text-yellow-500 leading-tight tracking-tight mb-5">
          Your bitcoin,<br />secured forever.
        </h1>
        <p className="text-lg sm:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed mb-10">
          Most bitcoin is lost when its owner dies. Custos ensures your digital
          wealth reaches the people you love — automatically, securely, without compromise.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
          <button
            onClick={handleConnectButtonClick}
            className="bg-yellow-500 text-black px-8 py-3.5 rounded-md text-sm font-medium tracking-wide hover:bg-yellow-400 transition-colors"
          >
            {connectedWallet ? 'Go to Dashboard' : 'Connect Wallet & Protect Bitcoin'}
          </button>
          <Link
            href="/vault"
            className="border border-yellow-500 text-yellow-500 px-8 py-3.5 rounded-md text-sm font-medium tracking-wide hover:bg-yellow-500 hover:text-black transition-colors"
          >
            See how it works
          </Link>
        </div>

        {connectedWallet && (
          <div className="bg-neutral-900 border border-yellow-500 text-yellow-400 px-4 py-3 rounded-lg mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                Connected to {connectedWallet.name} ({connectedWallet.type})
              </span>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 max-w-sm mx-auto border border-neutral-800 rounded-lg overflow-hidden divide-x divide-neutral-800">
          {[
            { num: '$10B+', label: 'Protected' },
            { num: '50K+', label: 'Users' },
            { num: '100%', label: 'Uptime' },
          ].map((s) => (
            <div key={s.label} className="bg-neutral-950 py-4 px-2 text-center">
              <div className="text-2xl font-medium text-yellow-500">{s.num}</div>
              <div className="text-xs text-neutral-600 tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="border-b border-neutral-900 px-6 sm:px-10 py-20">
        <p className="text-xs tracking-widest uppercase text-neutral-600 mb-3">The problem</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium text-white leading-snug tracking-tight mb-6">
              What happens to your bitcoin<br />
              <span className="text-yellow-500">when you're gone?</span>
            </h2>
            <div className="space-y-4 text-neutral-500 text-base leading-relaxed">
              <p>
                Bitcoin's greatest strength, that only you control it, becomes a liability
                the moment you're no longer here. Without a plan, your holdings vanish with
                your private keys.
              </p>
              <p>
                Traditional wills and estate lawyers can't handle digital assets.
                Your family deserves better.
              </p>
            </div>
          </div>

          <div className="border border-neutral-800 rounded-lg p-7 bg-neutral-950">
            <p className="text-xs tracking-widest uppercase text-yellow-500 mb-5">The Custos answer</p>
            <ul className="space-y-4">
              {[
                '2-of-3 multisig protection',
                'Automated dead man\'s switch',
                'Hardware security module (HSM) key storage',
                'Legal inheritance documentation',
                '24/7 monitoring and instant alerts',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-yellow-500" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M5 9.5l2.5 2.5 5.5-5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-neutral-900 px-6 sm:px-10 py-20">
        <p className="text-xs tracking-widest uppercase text-neutral-600 mb-3">Security</p>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mb-10">
          Built for threats that don't{' '}
          <span className="text-yellow-500">sleep</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 divide-neutral-800 border border-neutral-800 rounded-lg overflow-hidden">
          {[
            {
              title: 'Multisig vault',
              desc: 'Your bitcoin requires two of three keys to move — your hardware wallet, the web app, and our HSM. No single point of failure.',
              icon: (
                <svg className="w-7 h-7 text-yellow-500" viewBox="0 0 36 36" fill="none">
                  <rect x="6" y="14" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M12 14V10a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="18" cy="23" r="2" fill="currentColor" />
                </svg>
              ),
            },
            {
              title: 'Smart switch',
              desc: 'Set a check-in schedule. If you go silent beyond your grace period, Custos notifies heirs and initiates the inheritance process.',
              icon: (
                <svg className="w-7 h-7 text-yellow-500" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="11" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M18 11v7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              title: 'HSM security',
              desc: 'Your third key never touches a general-purpose server. It lives inside tamper-proof hardware used by central banks and governments.',
              icon: (
                <svg className="w-7 h-7 text-yellow-500" viewBox="0 0 36 36" fill="none">
                  <path d="M18 4l12 5v9c0 7-5 13-12 15C11 31 6 25 6 18V9l12-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M13 18l3 3 7-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              title: 'Live monitoring',
              desc: 'Round-the-clock transaction tracking and threat detection, with alerts the moment anything unusual occurs.',
              icon: (
                <svg className="w-7 h-7 text-yellow-500" viewBox="0 0 36 36" fill="none">
                  <path d="M10 28V20M18 28V12M26 28V16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              title: 'Heir management',
              desc: 'Add multiple heirs with PGP-encrypted messages, adjustable shares, and KYC verification to prevent unauthorized claims.',
              icon: (
                <svg className="w-7 h-7 text-yellow-500" viewBox="0 0 36 36" fill="none">
                  <circle cx="14" cy="13" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="23" cy="13" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M6 28c0-5 3.6-8 8-8M22 20c4.4 0 8 3 8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              title: 'Lightning ready',
              desc: 'Full Lightning Network integration. Protect long-term savings on-chain while keeping a spending wallet available day to day.',
              icon: (
                <svg className="w-7 h-7 text-yellow-500" viewBox="0 0 36 36" fill="none">
                  <path d="M6 26l8-8 5 5 11-13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className={`bg-neutral-950 hover:bg-neutral-900 transition-colors p-7 ${i % 3 !== 2 ? 'sm:border-r border-neutral-800' : ''
                } ${i < 3 ? 'sm:border-b border-neutral-800' : ''}`}
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-base font-medium text-white mb-2">{f.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-neutral-900 px-6 sm:px-10 py-20">
        <p className="text-xs tracking-widest uppercase text-neutral-600 mb-3">Setup</p>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mb-10">
          Up and running in{' '}
          <span className="text-yellow-500">four steps</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 border border-neutral-800 rounded-lg overflow-hidden divide-x divide-y divide-neutral-800">
          {[
            { num: '01', title: 'Create vault', desc: 'Connect your hardware wallet and configure your multisig setup in minutes.' },
            { num: '02', title: 'Add heirs', desc: 'Designate your beneficiaries and complete the secure verification process.' },
            { num: '03', title: 'Set your switch', desc: 'Choose your check-in frequency, grace period, and notification preferences.' },
            { num: '04', title: 'Done', desc: 'Your bitcoin is protected. Check in periodically — Custos handles the rest.' },
          ].map((s) => (
            <div key={s.num} className="bg-neutral-950 p-7 text-center">
              <div className="text-3xl font-medium text-yellow-500 mb-3 tabular-nums">{s.num}</div>
              <h3 className="text-sm font-medium text-white mb-2">{s.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 py-24 text-center">
        <h2 className="text-4xl sm:text-5xl font-medium text-yellow-500 leading-tight tracking-tight mb-5">
          Don't leave your bitcoin<br />to chance.
        </h2>
        <p className="text-lg text-neutral-500 max-w-sm mx-auto leading-relaxed mb-10">
          Join thousands of bitcoin holders who've already secured their digital legacy with Custos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleConnectButtonClick}
            className="bg-yellow-500 text-black px-10 py-3.5 rounded-md text-sm font-medium tracking-wide hover:bg-yellow-400 transition-colors"
          >
            {connectedWallet ? 'Go to Dashboard' : 'Start protecting now'}
          </button>
          <Link
            href="/vault"
            className="border border-yellow-500 text-yellow-500 px-10 py-3.5 rounded-md text-sm font-medium tracking-wide hover:bg-yellow-500 hover:text-black transition-colors"
          >
            Schedule a demo
          </Link>
        </div>
      </section>

      {/* Wallet Connection Modal */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />

      {/* Success Message */}
      <SuccessMessage
        message={successMessage}
        show={showSuccessMessage}
        onComplete={() => setShowSuccessMessage(false)}
      />

    </div>
  )
}