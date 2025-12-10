"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle2, Loader2 } from "lucide-react"
import api from "@/lib/axios"
import { useAuthStore } from "@/stores/auth-store"
import { transformBackendUser } from "@/lib/auth-utils"

interface EmailVerificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  onVerified?: () => void
}

export function EmailVerificationModal({ 
  open, 
  onOpenChange, 
  email,
  onVerified 
}: EmailVerificationModalProps) {
  const [isSending, setIsSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const refreshUser = useAuthStore((state) => state.refreshUser)

  useEffect(() => {
    if (open) {
      setMessage("")
      setError("")
      setIsVerified(false)
    }
  }, [open])

  const handleSendVerification = async () => {
    setIsSending(true)
    setError("")
    setMessage("")

    try {
      const response = await api.post('/send-verification-email', { email })
      
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

  const handleVerifyEmail = async (token: string, email: string) => {
    setIsVerifying(true)
    setError("")
    setMessage("")

    try {
      const response = await api.post('/verify-email', { token, email })
      
      if (response.data.success) {
        setIsVerified(true)
        setMessage("Email verified successfully!")
        
        // Refresh user data
        refreshUser()
        
        // Call onVerified callback after a short delay
        setTimeout(() => {
          if (onVerified) {
            onVerified()
          }
        }, 1500)
      } else {
        setError(response.data.message || "Failed to verify email")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to verify email. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  // Check for verification token in URL (only once when modal opens)
  useEffect(() => {
    if (open && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')
      const emailParam = params.get('email')
      
      if (token && emailParam && emailParam === email && !isVerifying && !isVerified) {
        handleVerifyEmail(token, emailParam)
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Verify Your Email</DialogTitle>
          <DialogDescription className="text-center pt-2">
            {isVerified 
              ? "Your email has been verified successfully!"
              : `We've sent a verification link to ${email}`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {isVerified ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <p className="text-green-600 font-medium">Email verified successfully!</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Mail className="w-12 h-12 text-primary" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Click the button below to resend the verification email
                </p>
              </div>

              {message && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">{message}</p>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button
                onClick={handleSendVerification}
                disabled={isSending || isVerifying}
                className="w-full bg-[#0A8542] hover:bg-[#097038] text-white"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Didn't receive the email? Check your spam folder or click resend above.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

