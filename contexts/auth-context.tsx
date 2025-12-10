"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { getCurrentUser, logoutUser as logoutUserUtil, getAuthToken, type User } from "@/lib/auth"
import api from "@/lib/axios"

interface AuthContextType {
  user: Omit<User, "password"> | null
  isLoggedIn: boolean
  login: (user: Omit<User, "password">) => void
  logout: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null)

  useEffect(() => {
    // Initialize auth state from localStorage
    const currentUser = getCurrentUser()
    const token = getAuthToken()
    
    // If we have a token but no user, try to fetch user from backend
    if (token && !currentUser) {
      fetchUserFromBackend()
    } else {
    setUser(currentUser)
    }
  }, [])

  const fetchUserFromBackend = async () => {
    try {
      const response = await api.get('/user')
      if (response.data) {
        const userData = response.data
        // Transform backend user to frontend format
        const transformedUser = {
          id: userData.id.toString(),
          unique_id: userData.unique_id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          phone: userData.phone || '',
          email_verified_at: userData.email_verified_at,
          phone_verified_at: userData.phone_verified_at,
          image: userData.image,
          status: userData.status,
          user_vehicle_id: userData.user_vehicle_id,
          referral_code: userData.refferal_code || userData.referral_code || '',
          createdAt: userData.created_at || new Date().toISOString(),
        }
        setUser(transformedUser)
        // Store in localStorage for consistency
        localStorage.setItem("yarvest_current_user", JSON.stringify(transformedUser))
      }
    } catch (error) {
      // If fetch fails, clear auth data
      logoutUserUtil()
      setUser(null)
    }
  }

  const login = (userData: Omit<User, "password">) => {
    setUser(userData)
    // Store user in localStorage
    localStorage.setItem("yarvest_current_user", JSON.stringify(userData))
  }

  const logout = async () => {
    try {
      // Call backend API to logout
      await api.post('/logout')
    } catch (error) {
      // Even if API call fails, clear local auth data
      console.error('Logout API error:', error)
    } finally {
      // Always clear local auth data
    logoutUserUtil()
    setUser(null)
    }
  }

  const refreshUser = () => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

