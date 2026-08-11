import React, { useState } from 'react'
import { BriefcaseBusiness, Mail, Lock, User, UserCheck, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

const Signup = ({ onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('employee')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    if (password.length < 3) {
      setError('Password must be at least 3 characters long.')
      return
    }

    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccessMsg('Account created successfully! Switching to Sign In...')
      setTimeout(() => {
        if (onSwitchToLogin) {
          onSwitchToLogin(email, password)
        }
      }, 1200)
    }, 500)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 mb-3">
          <BriefcaseBusiness className="w-5 h-5 fill-white/20 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Work<span className="text-blue-600">Hive</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Simple & Smart Employee Management
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-6">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="py-2 text-xs font-semibold rounded-lg transition-all text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Sign In
          </button>
          <button
            type="button"
            className="py-2 text-xs font-semibold rounded-lg transition-all bg-white text-slate-900 shadow-xs cursor-default"
          >
            Create Account
          </button>
        </div>

        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">Create Account</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Get started with your WorkHive workspace.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full bg-slate-50/50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-slate-50/50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Role
            </label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all cursor-pointer appearance-none"
              >
                <option value="employee">Employee</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-50/50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 text-sm disabled:opacity-70"
          >
            {isSubmitting ? (
              <span>Creating...</span>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
