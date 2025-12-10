"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, Loader2, LogOut, X } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { transformBackendUser } from "@/lib/auth-utils"

export function EmailVerificationBlocker() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const login = useAuthStore((state) => state.login)
  const router = useRouter()
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const isEmailVerified = user?.email_verified_at !== null && user?.email_verified_at !== undefined
  // Don't show blocker if verified or if we're showing success message
  const showBlocker = user && !isEmailVerified && !isVerified

  const handleResendVerification = async () => {
    if (!user?.email) return

    setIsSending(true)
    setError("")
    setMessage("")

    try {
      const response = await api.post('/send-verification-email', { email: user.email })
      
      if (response.data.success) {
        setMessage("Verification email sent! Please check your inbox.")
      } else {
        setError(response.data.message || "Failed to send verification email")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send verification email. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const handleLogout = async () => {
    // Redirect immediately, then logout
    router.push("/")
    router.refresh()
    await logout()
  }

  const handleVerifyEmail = async (token: string, email: string) => {
    setIsVerifying(true)
    setError("")
    setMessage("")

    try {
      const response = await api.post('/verify-email', { token, email })
      
      if (response.data.success) {
        setIsVerified(true)
        setMessage("Email verified successfully!")
        setShowSuccessModal(true)
        
        // Fetch updated user data from backend to get verified status
        try {
          const userResponse = await api.get('/user')
          if (userResponse.data) {
            const transformedUser = transformBackendUser(userResponse.data)
            // Update auth store with verified user
            login(transformedUser)
          }
        } catch (err) {
          console.error('Error refreshing user:', err)
        }
        
        // Clean URL
        if (typeof window !== 'undefined') {
          window.history.replaceState({}, '', '/')
        }
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
          setShowSuccessModal(false)
          router.push("/")
          router.refresh()
        }, 10000)
      } else {
        setError(response.data.message || "Failed to verify email")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to verify email. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  // Check for verification token in URL - works on any page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')
      const emailParam = params.get('email')
      
      // If we have a token and email, and user is logged in with matching email
      if (token && emailParam && user && user.email === emailParam && !isVerifying && !isVerified) {
        handleVerifyEmail(token, emailParam)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email])

  const handleCloseSuccess = () => {
    setShowSuccessModal(false)
    router.push("/")
    router.refresh()
  }

  // Show success message separately (not blocked) when verified
  if (isVerified && isEmailVerified && showSuccessModal) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                alt="Yarvest"
                className="h-7"
              />
            </div>
            <button
              type="button"
              onClick={handleCloseSuccess}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Success Content */}
          <div className="px-6 py-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-gradient-to-br from-green-100 to-emerald-100 p-4 shadow-lg">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Email Verified!</h2>
            <p className="text-sm text-gray-600">Your email has been verified successfully</p>
          </div>
        </div>
      </div>
    )
  }

  if (!showBlocker) return null

  return (
    <>
      {/* Blocking overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]" />
      
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0"
          onClick={(e) => e.preventDefault()}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Header with Logo */}
          <div className="flex items-center justify-center pt-8 pb-6 px-6">
            <img
              src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
              alt="Yarvest"
              className="h-8"
            />
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            <div className="space-y-6 py-2">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="rounded-full bg-gradient-to-br from-[#0A8542]/10 to-[#0A8542]/5 p-5">
                    <Mail className="w-12 h-12 text-[#0A8542]" />
                  </div>
                </div>

                {/* Title and Description */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We've sent a verification link to<br />
                    <span className="font-medium text-gray-900">{user.email}</span>
                  </p>
                </div>

                {/* Messages */}
                {message && (
                  <div className="p-3.5 bg-green-50 border border-green-200/60 rounded-xl">
                    <p className="text-sm text-green-700 text-center font-medium">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="p-3.5 bg-red-50 border border-red-200/60 rounded-xl">
                    <p className="text-sm text-red-700 text-center font-medium">{error}</p>
                  </div>
                )}

                {isVerifying && (
                  <div className="flex items-center justify-center gap-2.5 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A8542]" />
                    <p className="text-sm text-gray-600 font-medium">Verifying your email...</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="space-y-3 pt-2">
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleResendVerification()
                    }}
                    disabled={isSending || isVerifying}
                    className="w-full h-12 text-base font-semibold bg-[#0A8542] hover:bg-[#097038] text-white rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:bg-[#075d2a]"
                  >
                    {isSending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Resend Verification Email
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full h-12 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-100 rounded-xl transition-all text-gray-700 hover:text-gray-900 active:bg-gray-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>

                {/* Help Text */}
                <p className="text-xs text-center text-gray-500 pt-2">
                  Didn't receive the email? Check your spam folder
                </p>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}



