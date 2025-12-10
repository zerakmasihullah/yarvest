"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { useAddressStore } from "@/stores/address-store"
import { transformBackendUser, mapBackendRoles, migrateLocalAddressesToBackend } from "@/lib/auth-utils"
import { getDashboardPath, storeAuthToken } from "@/lib/auth"
import api from "@/lib/axios"

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const login = useAuthStore((state) => state.login)
  const fetchAddresses = useAddressStore((state) => state.fetchAddresses)
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  })
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const urlToken = searchParams.get('token')
    const urlEmail = searchParams.get('email')

    if (!urlToken || !urlEmail) {
      setError("Invalid reset link. Please request a new password reset.")
      return
    }

    setToken(urlToken)
    setEmail(urlEmail)
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!token || !email) {
      setError("Invalid reset link. Please request a new password reset.")
      return
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords don't match!")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      const { getDashboardPath, storeAuthToken } = await import("@/lib/auth")
      
      const response = await api.post('/reset-password', {
        email: email,
        token: token,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      })

      if (response.data.success && response.data.data) {
        const { user, roles, token: authToken } = response.data.data
        
        storeAuthToken(authToken)
        const userData = transformBackendUser(user)
        const frontendRoles = mapBackendRoles(roles)
        const dashboardPath = frontendRoles.length > 0 
          ? getDashboardPath(frontendRoles)
          : '/'

        login(userData)
        
        // Migrate local addresses to backend and fetch addresses
        try {
          await migrateLocalAddressesToBackend()
          await fetchAddresses()
        } catch (migrationError) {
          console.error('Address migration error:', migrationError)
          // Don't block password reset if migration fails
        }
        
        router.push(dashboardPath)
      } else {
        setError(response.data.message || "Failed to reset password. Please try again.")
      }
    } catch (err: any) {
      if (err.response) {
        const errorMessage = err.response.data?.message || err.response.data?.errors || "Failed to reset password. Please try again."
        setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
      } else if (err.request) {
        setError("Unable to connect to server. Please check your internet connection.")
      } else {
        const errorMessage = err.message || "An error occurred. Please try again."
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <img
              src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
              alt="Yarvest"
              className="h-10 mx-auto"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#0A8542]/10 rounded-lg">
                <Lock className="w-6 h-6 text-[#0A8542]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            </div>
         
            {email && (
              <div className="mt-4 flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 text-center">{email}</span>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-4 pr-12 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A8542]/20 focus:border-[#0A8542] focus:outline-none bg-white hover:border-gray-300 transition-all"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && formData.password.length < 8 && (
                <p className="mt-1.5 text-xs text-amber-600">At least 8 characters required</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  placeholder="Confirm your password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="w-full pl-4 pr-12 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A8542]/20 focus:border-[#0A8542] focus:outline-none bg-white hover:border-gray-300 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password_confirmation && (
                <>
                  {formData.password !== formData.password_confirmation && (
                    <p className="mt-1.5 text-xs text-red-600">Passwords don't match</p>
                  )}
                  {formData.password === formData.password_confirmation && formData.password.length >= 8 && (
                    <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1">
                      <span>✓</span> Passwords match
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !token || !email}
              className="w-full py-3.5 text-base font-semibold bg-[#0A8542] hover:bg-[#097038] text-white rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <img
                src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                alt="Yarvest"
                className="h-10 mx-auto"
              />
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A8542]"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}
