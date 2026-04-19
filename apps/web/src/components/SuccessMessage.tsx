'use client'

import { useEffect, useState } from 'react'

interface SuccessMessageProps {
  message: string
  show: boolean
  duration?: number
  onComplete?: () => void
}

export default function SuccessMessage({ message, show, duration = 5000, onComplete }: SuccessMessageProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    setIsVisible(show)
    
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show, duration, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-pulse">
      <div className="bg-green-600 bg-opacity-90 border border-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            onComplete?.()
          }}
          className="flex-shrink-0 text-green-200 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
