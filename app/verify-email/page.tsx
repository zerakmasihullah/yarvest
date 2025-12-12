"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Just redirect to home - the EmailVerificationBlocker will handle the verification
    // when it detects the token in the URL
    const token = searchParams.get('token')
    const email = searchParams.get('email')
    
    if (token && email) {
      // Redirect to home with the token params - blocker will catch it
      router.replace(`/?token=${token}&email=${encodeURIComponent(email)}`)
    } else {
      // No token, just go home
      router.replace('/')
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Verifying your email...</p>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0A5D31] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}

