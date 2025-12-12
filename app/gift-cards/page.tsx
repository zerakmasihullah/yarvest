"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { ComingSoon } from "@/components/coming-soon"
import { Gift } from "lucide-react"
import { useState } from "react"

export default function GiftCardsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <ComingSoon
          title="Gift Cards"
          icon={Gift}
          description="Give the gift of fresh, local produce! We're working on bringing you digital gift cards that can be used to purchase any products from our platform. Perfect for any occasion!"
        />
        <Footer />
      </main>
    </div>
  )
}
