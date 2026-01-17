import React, { useState } from 'react'

export default function JoinFamilyForm({ onClose, onSwitchToSignIn }) {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    phone_no: '',
    referral_code: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, just log the data; integrate with backend later
    console.log('Join family form submitted:', formData)
    onClose?.()
  }

  return (
    <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden glass-card">
      {/* Header */}
      <div
        className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(135deg, #ffa500, #FE6F5E)',
          color: 'white'
        }}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold">Join Our Family</h2>
          <p className="text-[11px] sm:text-xs text-white/90 font-medium">
            Share your details and become part of our community.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-lg font-bold transition-all duration-200"
        >
          ×
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-4 sm:py-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              required
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
              placeholder="Enter first name"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Middle Name <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent text-sm"
              placeholder="Enter middle name"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              required
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone_no"
              required
              value={formData.phone_no}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Referral Code <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              name="referral_code"
              value={formData.referral_code}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent text-sm"
              placeholder="Have a referral code?"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[10px] sm:text-[11px] text-gray-500 max-w-xs">
              By joining, you agree to be contacted regarding community updates and opportunities.
            </p>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-white text-sm shadow-lg hover:shadow-xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #ffa500, #FE6F5E)'
              }}
            >
              Submit
            </button>
          </div>
          <div className="flex flex-col items-center gap-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Already have an account?
            </p>
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="w-full px-5 py-2.5 rounded-xl font-bold text-white text-sm shadow-md hover:shadow-lg transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #ffb84d, #ff8a7a)',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffa500, #FE6F5E)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffb84d, #ff8a7a)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

