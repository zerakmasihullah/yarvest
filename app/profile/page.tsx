"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"
import { useAuthModalStore } from "@/stores/auth-modal-store"

export default function ProfilePage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const openAuthModal = useAuthModalStore((state) => state.openModal)

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        openAuthModal('login', '/profile')
        router.push("/")
      } else {
        // Redirect to settings page
        router.push("/settings")
      }
    }
  }, [user, isLoading, router, openAuthModal])

  return null
}
