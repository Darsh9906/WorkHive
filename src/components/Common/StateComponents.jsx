import React, { createContext, useContext, useState, useCallback } from 'react'
import { AlertCircle, RefreshCw, X, CheckCircle2, Info, Inbox } from 'lucide-react'

// --- Toast Context & Provider ---
const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-lg text-xs font-medium transition-all transform translate-y-0 ${
              toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-700'
                : toast.type === 'info'
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-blue-500 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              <span className="truncate">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-md transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    return { showToast: () => {} }
  }
  return context
}

// --- Empty State ---
export const EmptyState = ({
  icon: Icon = Inbox,
  title = "No items found",
  description = "Items will appear here once created or assigned.",
  actionLabel,
  onAction,
  className = ""
}) => {
  return (
    <div className={`p-8 text-center bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col items-center justify-center ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      {description && (
        <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5 border border-slate-200"
        >
          <RefreshCw className="w-3 h-3 text-slate-500" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  )
}

// --- Loading Components ---
export const LoadingSpinner = ({ size = "sm", label, className = "" }) => {
  const sizeClasses = {
    xs: "w-3.5 h-3.5 border-2",
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3"
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div
        className={`${sizeClasses[size] || sizeClasses.sm} border-slate-300 border-t-blue-600 rounded-full animate-spin`}
      />
      {label && <span className="text-xs font-medium text-slate-600">{label}</span>}
    </div>
  )
}

export const SkeletonCard = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs animate-pulse flex flex-col justify-between min-h-[230px]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-16 h-5 bg-slate-200 rounded-md" />
          <div className="w-20 h-5 bg-slate-200 rounded-md" />
        </div>
        <div className="w-3/4 h-5 bg-slate-200 rounded-md mb-2" />
        <div className="w-full h-3 bg-slate-100 rounded-md mb-1.5" />
        <div className="w-5/6 h-3 bg-slate-100 rounded-md" />
      </div>
      <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
        <div className="w-24 h-4 bg-slate-100 rounded-md" />
        <div className="w-full h-8 bg-slate-200 rounded-lg" />
      </div>
    </div>
  )
}

export const SkeletonRow = () => {
  return (
    <tr className="animate-pulse">
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
          <div className="flex flex-col gap-1">
            <div className="w-24 h-4 bg-slate-200 rounded" />
            <div className="w-32 h-3 bg-slate-100 rounded" />
          </div>
        </div>
      </td>
      <td className="py-3.5 px-4"><div className="w-16 h-5 bg-slate-200 rounded-md" /></td>
      <td className="py-3.5 px-4"><div className="w-8 h-5 bg-slate-200 rounded-full" /></td>
      <td className="py-3.5 px-4"><div className="w-8 h-5 bg-slate-200 rounded-full" /></td>
      <td className="py-3.5 px-4"><div className="w-8 h-5 bg-slate-200 rounded-full" /></td>
      <td className="py-3.5 px-4"><div className="w-8 h-5 bg-slate-200 rounded-full" /></td>
    </tr>
  )
}

// --- Error State ---
export const ErrorState = ({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try Again",
  className = ""
}) => {
  return (
    <div className={`p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-3 ${className}`}>
      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-slate-900 mb-0.5">{title}</div>}
        {message && <div className="text-red-600 leading-relaxed">{message}</div>}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 px-2.5 py-1 bg-white hover:bg-red-100/50 border border-red-300 text-red-700 font-semibold rounded-lg text-[11px] transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3 text-red-600" />
            <span>{retryLabel}</span>
          </button>
        )}
      </div>
    </div>
  )
}
