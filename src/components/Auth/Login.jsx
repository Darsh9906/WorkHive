import React, { useState } from 'react'
import { BriefcaseBusiness, Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, UserCheck, KeyRound, AlertCircle, X, Sun, Moon } from 'lucide-react'
import Signup from './Signup'
import { ErrorState, LoadingSpinner } from '../Common/StateComponents'
import { useTheme } from '../../context/ThemeContext'

const Login = ({ handleLogin }) => {
  const { theme, toggleTheme } = useTheme()
  const [viewMode, setViewMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.')
      return
    }

    setIsSubmitting(true)
    try {
      handleLogin(email, password)
    } catch (err) {
      setErrorMsg('Invalid email or password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const autofillDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setErrorMsg('')
  }

  const handleSwitchToLogin = (signupEmail, signupPassword) => {
    if (signupEmail && signupPassword) {
      setEmail(signupEmail)
      setPassword(signupPassword)
    }
    setViewMode('login')
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center p-4 relative transition-colors">
      <button
        onClick={toggleTheme}
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className="absolute top-5 right-5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-xs transition-all cursor-pointer flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-600" />
        )}
      </button>

      <div className="w-full max-w-md">
        {viewMode === 'signup' ? (
          <Signup onSwitchToLogin={handleSwitchToLogin} />
        ) : (
          <div className="w-full">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors">
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-6">
                <button
                  type="button"
                  className="py-2 text-xs font-semibold rounded-lg transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs cursor-default"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('signup')}
                  className="py-2 text-xs font-semibold rounded-lg transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
                >
                  Create Account
                </button>
              </div>

              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Welcome Back</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Sign in to access your dashboard.
                </p>
              </div>

              {errorMsg && (
                <ErrorState
                  title="Authentication Failed"
                  message={errorMsg}
                  onRetry={() => {
                    setEmail('admin@example.com')
                    setPassword('123')
                    setErrorMsg('')
                  }}
                  retryLabel="Fill Admin demo credentials"
                  className="mb-5"
                />
              )}

              <div className="mb-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Demo Accounts (Click to Fill):
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => autofillDemo('admin@example.com', '123')}
                    className="p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-left transition-all cursor-pointer"
                  >
                    <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Admin
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 truncate mt-0.5">admin@example.com</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => autofillDemo('e@e.com', '123')}
                    className="p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-left transition-all cursor-pointer"
                  >
                    <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Employee
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 truncate mt-0.5">e@e.com</div>
                  </button>
                </div>
              </div>

              <form onSubmit={submitHandler} className="space-y-4">
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
                      placeholder="Enter your email"
                      className="w-full bg-slate-50/50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
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

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-slate-300 dark:border-slate-700 text-emerald-600 dark:text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <LoadingSpinner size="xs" label="Signing In..." />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setViewMode('signup')}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium cursor-pointer"
                  >
                    Create account
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-xl relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute right-4 top-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center mb-3">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Reset Password</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              If you have forgotten your password, please contact your workspace administrator to request a reset link.
            </p>
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
              Admin Email: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">admin@example.com</span>
            </div>
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="w-full mt-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium py-2 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login