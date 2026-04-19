'use client'

import { useState, useEffect } from 'react'

export default function Heirs() {
  const [heirs, setHeirs] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Mock data for now
    setHeirs([])
  }, [])

  const handleAddHeir = async (heirData) => {
    setLoading(true)
    try {
      // Mock API call
      console.log('Adding heir:', heirData)
      alert('Heir added successfully!')
      setShowAddForm(false)
      // In real app, would fetch updated list
    } catch (error) {
      console.error('Error adding heir:', error)
      alert('Failed to add heir')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gold-500">Heir Management</h1>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-gold-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all"
          >
            Add Heir
          </button>
        </div>
        
        {/* Heirs Overview */}
        <div className="bg-black-800 border border-gold-500 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gold-400 mb-6">Configured Heirs</h2>
          
          {heirs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gold-400 text-6xl mb-4">Users</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Heirs Configured</h3>
              <p className="text-white-600 mb-6">Add heirs to ensure your Bitcoin can be inherited according to your wishes.</p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-gold-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all"
              >
                Add Your First Heir
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heirs.map((heir, index) => (
                <div key={index} className="bg-black-900 border border-black-600 p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{heir.name}</h3>
                      <p className="text-white-600">{heir.relationship}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      heir.kycStatus === 'PASSED' 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {heir.kycStatus}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white-600">Email:</span>
                      <span className="text-white">{heir.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white-600">Phone:</span>
                      <span className="text-white">{heir.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white-600">PGP Key:</span>
                      <span className="text-white">{heir.pgpPublicKey ? 'Configured' : 'Not configured'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Heir Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-black-800 border border-gold-500 p-8 rounded-lg max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-gold-400 mb-6">Add New Heir</h2>
              
              <AddHeirForm 
                onSubmit={handleAddHeir}
                onCancel={() => setShowAddForm(false)}
                loading={loading}
              />
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="bg-black-800 border border-gold-500 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gold-400 mb-6">How Inheritance Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Setup Process</h3>
              <div className="space-y-3 text-white-600">
                <div className="flex items-start">
                  <div className="text-gold-400 font-bold mr-3">1.</div>
                  <p>Add heir details and relationship</p>
                </div>
                <div className="flex items-start">
                  <div className="text-gold-400 font-bold mr-3">2.</div>
                  <p>Heir provides PGP public key for encryption</p>
                </div>
                <div className="flex items-start">
                  <div className="text-gold-400 font-bold mr-3">3.</div>
                  <p>Heir completes KYC verification</p>
                </div>
                <div className="flex items-start">
                  <div className="text-gold-400 font-bold mr-3">4.</div>
                  <p>Legacy package is encrypted and stored</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">When Triggered</h3>
              <div className="space-y-3 text-white-600">
                <div className="flex items-start">
                  <div className="text-gold-400 font-bold mr-3">1.</div>
                  <p>Dead Man's Switch triggers inheritance</p>
                </div>
                <div className="flex items-start">
                  <div className="text-gold-400 font-bold mr-3">2.</div>
                  <p>Heir receives encrypted legacy package</p>
                </div>
                <div className="flex items-start">
                  <div className="text-gold-400 font-bold mr-3">3.</div>
                  <p>Heir completes final KYC verification</p>
                </div>
                <div className="flex items-start">
                  <div className="text-gold-400 font-bold mr-3">4.</div>
                  <p>Custos co-signs PSBT for fund transfer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black-900 border border-black-600 p-4 rounded-lg mt-6">
            <p className="text-white-600 text-sm">
              <span className="text-gold-400 font-semibold">Security:</span> 
              All legacy packages are encrypted with the heir's PGP public key. Custos never has access to the unencrypted content. 
              The HSM key is only released after successful KYC verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddHeirForm({ onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    pgpPublicKey: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white-600 text-sm mb-2">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-black-900 border border-black-600 rounded-lg px-4 py-2 text-white focus:border-gold-400 focus:outline-none"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-white-600 text-sm mb-2">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-black-900 border border-black-600 rounded-lg px-4 py-2 text-white focus:border-gold-400 focus:outline-none"
          placeholder="heir@example.com"
        />
      </div>

      <div>
        <label className="block text-white-600 text-sm mb-2">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-black-900 border border-black-600 rounded-lg px-4 py-2 text-white focus:border-gold-400 focus:outline-none"
          placeholder="+1 555 123 4567"
        />
      </div>

      <div>
        <label className="block text-white-600 text-sm mb-2">Relationship *</label>
        <select
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
          required
          className="w-full bg-black-900 border border-black-600 rounded-lg px-4 py-2 text-white focus:border-gold-400 focus:outline-none"
        >
          <option value="">Select relationship</option>
          <option value="spouse">Spouse</option>
          <option value="child">Child</option>
          <option value="sibling">Sibling</option>
          <option value="parent">Parent</option>
          <option value="friend">Friend</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-white-600 text-sm mb-2">PGP Public Key</label>
        <textarea
          name="pgpPublicKey"
          value={formData.pgpPublicKey}
          onChange={handleChange}
          rows={4}
          className="w-full bg-black-900 border border-black-600 rounded-lg px-4 py-2 text-white focus:border-gold-400 focus:outline-none"
          placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gold-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Heir'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gold-500 text-gold-500 px-6 py-3 rounded-lg font-semibold hover:bg-gold-500 hover:text-black transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
