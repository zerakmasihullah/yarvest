"use client"

import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface ComingSoonProps {
  title: string
  icon: LucideIcon
  description?: string
  children?: ReactNode
}

export function ComingSoon({ title, icon: Icon, description, children }: ComingSoonProps) {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50/50 to-white min-h-screen flex items-center justify-center">
      <div className="text-center px-6 py-16 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-[#0A5D31]/10 rounded-full mb-8 animate-pulse">
          <Icon className="w-12 h-12 text-[#0A5D31]" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-2xl text-gray-600 mb-8">Coming Soon</p>
        {description && (
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

