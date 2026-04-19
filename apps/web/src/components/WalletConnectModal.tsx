'use client'

import { useState } from 'react'
import { walletConnector, WalletInfo, ConnectionResult } from '../utils/walletConnect'

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (wallet: WalletInfo) => void
}

export default function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  if (!isOpen) return null

  const availableWallets = walletConnector.detectAvailableWallets()

  const handleConnect = async (walletName: string, walletType: 'hardware' | 'software' | 'web') => {
    setIsConnecting(true)
    setConnectionError(null)
    setSelectedWallet(walletName)

    try {
      const result: ConnectionResult = await walletConnector.connectWallet(walletName, walletType)
      
      if (result.success && result.wallet) {
        onConnect(result.wallet)
        onClose()
      } else {
        setConnectionError(result.error || 'Connection failed')
      }
    } catch (error) {
      setConnectionError(error instanceof Error ? error.message : 'Connection failed')
    } finally {
      setIsConnecting(false)
      setSelectedWallet(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-white">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {connectionError && (
          <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-md mb-4">
            {connectionError}
          </div>
        )}

        <div className="space-y-3">
          {availableWallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name, wallet.type)}
              disabled={isConnecting}
              className={`w-full text-left px-4 py-3 rounded-md border transition-all ${
                isConnecting && selectedWallet === wallet.name
                  ? 'bg-yellow-500 bg-opacity-10 border-yellow-500 text-yellow-500'
                  : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:border-neutral-600 hover:text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{wallet.name}</div>
                  <div className="text-xs opacity-75 capitalize">{wallet.type} wallet</div>
                </div>
                {isConnecting && selectedWallet === wallet.name ? (
                  <div className="animate-spin w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
                ) : (
                  <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800">
          <p className="text-xs text-neutral-500 text-center">
            Don't have a wallet? 
            <a href="#" className="text-yellow-500 hover:text-yellow-400 ml-1">
              Get started with a software wallet
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
