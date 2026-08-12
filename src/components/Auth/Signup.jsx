import React, { useState } from 'react'
import { BriefcaseBusiness, Mail, Lock, User, UserCheck, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { ErrorState, LoadingSpinner, useToast } from '../Common/StateComponents'

const Signup = ({ onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('employee')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

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
      const msg = 'Account created successfully! Switching to Sign In...'
      setSuccessMsg(msg)
      showToast('Account created successfully!', 'success')
      setTimeout(() => {
        if (onSwitchToLogin) {
          onSwitchToLogin(email, password)
        }
      }, 1200)
    }, 500)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-8 shadow-sm transition-colors">
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-6">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="py-2 text-xs font-semibold rounded-lg transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
          >
            Sign In
          </button>
          <button
            type="button"
            className="py-2 text-xs font-semibold rounded-lg transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs cursor-default"
          >
            Create Account
          </button>
        </div>

        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Create Account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Get started with your WorkHive workspace.
          </p>
        </div>

        {error && (
          <ErrorState
            title="Registration Failed"
            message={error}
            className="mb-4"
          />
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full bg-slate-50/50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-slate-50/50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Role
            </label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all cursor-pointer appearance-none"
              >
                <option value="employee" className="bg-white dark:bg-slate-900">Employee</option>
                <option value="admin" className="bg-white dark:bg-slate-900">Administrator</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-50/50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 text-sm disabled:opacity-70"
          >
            {isSubmitting ? (
              <LoadingSpinner size="xs" label="Creating Account..." />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium cursor-pointer"
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
