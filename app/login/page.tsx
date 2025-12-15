"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthModalStore } from "@/stores/auth-modal-store"

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const router = useRouter()
  const openAuthModal = useAuthModalStore((state) => state.openModal)

  useEffect(() => {
    // Get returnUrl from query params if exists (client-side only)
    const params = new URLSearchParams(window.location.search)
    const returnUrl = params.get('returnUrl')
    // Redirect to home and open auth modal
    router.push("/")
    // Open modal with returnUrl if provided
    openAuthModal('login', returnUrl ? decodeURIComponent(returnUrl) : undefined)
  }, [router, openAuthModal])

  return null
}
