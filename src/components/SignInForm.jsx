import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

export default function SignInForm({ onClose, onSwitchToJoin }) {
  const [formData, setFormData] = useState({
    phone_no: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, just log the data; integrate with backend later
    console.log('Sign in form submitted:', formData)
    onClose?.()
  }

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden glass-card">
      {/* Header */}
      <div
        className="px-3 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)',
          color: 'white'
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 className="text-base sm:text-xl font-bold">Sign In</h2>
          <p className="text-[10px] sm:text-xs text-white/90 font-medium">
            Welcome back! Sign in to continue.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-lg font-bold transition-all duration-200 flex-shrink-0 ml-2"
        >
          ×
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-3 sm:px-6 py-3 sm:py-5 space-y-3 sm:space-y-4">
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
            className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-blue-600 hover:underline font-semibold"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full px-5 py-2.5 rounded-xl font-bold text-white text-sm shadow-lg hover:shadow-xl transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #2D68C4, #FE6F5E)'
          }}
        >
          Sign In
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 pt-2 border-t border-gray-200">
          <p className="text-[10px] sm:text-[11px] text-gray-500 text-center sm:text-left">
            Don't have an account?
          </p>
          <button
            type="button"
            onClick={onSwitchToJoin}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline text-center sm:text-right"
          >
            Join Our Family
          </button>
        </div>
      </form>
    </div>
  )
}
